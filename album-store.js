/* =========================================================
 * 앨범 사진 저장소 (Supabase) — 화면은 app.js, 여기는 뒤에서 하는 일만 모아뒀어요.
 * 1) 사진에서 찍은 날짜·GPS 읽기 (EXIF)
 * 2) 크게 보기용(긴 변 2048px) + 그리드용(짧은 변 480px) JPEG로 줄이기
 * 3) GPS → 장소 이름 (소희 추천 장소 근처면 그 이름, 아니면 OpenStreetMap 주소)
 * 4) Supabase: 사진 파일은 Storage 'album' 버킷, 날짜·장소는 'photos' 테이블
 *
 * 처음 설정: supabase-setup.sql을 Supabase SQL Editor에서 한 번 실행하고,
 * 아래 두 칸에 프로젝트 주소와 공개 키(Project Settings → API Keys)를 넣어주세요.
 * 공개 키는 사이트에 그대로 보여도 되는 키예요.
 * ========================================================= */
(function () {
  const SUPABASE_URL = 'https://gtnlesbujefowzkecebn.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_3ikwkw0FvAwc7thktVe9Dw_Y8XUiL9T'; // 공개(publishable) 키: 사이트에 보여도 되는 키

  const BUCKET = 'album';
  const TABLE = 'photos';
  const FULL_MAX = 2048; // 크게 보기·다운로드용 긴 변
  const THUMB_MIN = 480; // 그리드용 짧은 변 (정사각형으로 잘라 보여줘요)
  const NEAR_PICK_M = 150; // 이 거리 안에 추천 장소가 있으면 그 이름으로

  const configured = !!(SUPABASE_URL && SUPABASE_KEY);
  const db = configured && window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false, autoRefreshToken: false } })
    : null;

  /* ---------------- EXIF 읽기: 찍은 날짜 + GPS ---------------- */
  async function readExif(file) {
    const out = {};
    try {
      const v = new DataView(await file.slice(0, 256 * 1024).arrayBuffer());
      if (v.getUint16(0) !== 0xffd8) return out; // JPEG만
      let p = 2;
      while (p + 10 <= v.byteLength) {
        const marker = v.getUint16(p);
        if ((marker & 0xff00) !== 0xff00 || marker === 0xffda) break;
        if (marker === 0xffe1 && v.getUint32(p + 4) === 0x45786966) { parseTiff(v, p + 10, out); break; } // "Exif"
        p += 2 + v.getUint16(p + 2);
      }
    } catch (e) {} // 이상한 파일이면 날짜·위치 없이
    return out;
  }

  function parseTiff(v, t, out) {
    const le = v.getUint16(t) === 0x4949;
    const u16 = (o) => v.getUint16(t + o, le);
    const u32 = (o) => v.getUint32(t + o, le);
    const SIZE = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };
    const ifd = (o) => {
      const tags = {};
      for (let i = 0, n = u16(o); i < n; i++) {
        const e = o + 2 + i * 12;
        tags[u16(e)] = { type: u16(e + 2), count: u32(e + 4), at: e + 8 };
      }
      return tags;
    };
    const dataAt = (tag) => ((SIZE[tag.type] || 1) * tag.count > 4 ? u32(tag.at) : tag.at);
    const str = (tag) => {
      let s = '';
      for (let i = 0, o = dataAt(tag); i < tag.count - 1; i++) s += String.fromCharCode(v.getUint8(t + o + i));
      return s;
    };
    const rat = (o) => u32(o) / u32(o + 4);

    const ifd0 = ifd(u32(4));
    if (ifd0[0x8769]) {
      const ex = ifd(u32(ifd0[0x8769].at));
      const d = ex[0x9003] || ex[0x9004]; // DateTimeOriginal → DateTimeDigitized
      if (d) out.date = str(d);
    }
    if (!out.date && ifd0[0x0132]) out.date = str(ifd0[0x0132]);
    // "2026:11:08 14:23:11" → "2026-11-08T14:23"
    const m = out.date && out.date.match(/^(\d{4}):(\d\d):(\d\d) (\d\d):(\d\d)/);
    out.date = m ? `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}` : undefined;

    if (ifd0[0x8825]) {
      const g = ifd(u32(ifd0[0x8825].at));
      const deg = (tag) => { const o = dataAt(tag); return rat(o) + rat(o + 8) / 60 + rat(o + 16) / 3600; };
      if (g[2] && g[4]) {
        let lat = deg(g[2]);
        let lng = deg(g[4]);
        if (g[1] && str(g[1]) === 'S') lat = -lat;
        if (g[3] && str(g[3]) === 'W') lng = -lng;
        if (isFinite(lat) && isFinite(lng) && (lat || lng)) out.ll = [+lat.toFixed(6), +lng.toFixed(6)];
      }
    }
  }

  // 날짜가 EXIF에 없으면 파일 수정 시각으로
  function fallbackDate(file) {
    const d = new Date(file.lastModified || Date.now());
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  /* ---------------- 사진 줄이기 ---------------- */
  async function shrink(file, date) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error('decode'));
        i.src = url;
      });
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const draw = (scale, quality) => {
        const c = document.createElement('canvas');
        c.width = Math.round(w * scale);
        c.height = Math.round(h * scale);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        return new Promise((resolve) => c.toBlob(resolve, 'image/jpeg', quality));
      };
      const fullScale = Math.min(1, FULL_MAX / Math.max(w, h));
      const full = await withExifDate(await draw(fullScale, 0.85), date);
      const thumb = await draw(Math.min(1, THUMB_MIN / Math.min(w, h)), 0.8);
      return { full, thumb, w: Math.round(w * fullScale), h: Math.round(h * fullScale) };
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // 줄이면 EXIF가 사라져서, 사진 앱에 저장했을 때 찍은 날짜로 정렬되도록 날짜만 다시 넣어요.
  // (GPS 같은 나머지 정보는 사진 파일에서는 빼요)
  async function withExifDate(blob, date) {
    if (!date) return blob;
    const dt = date.replace('T', ' ').replace(/-/g, ':').slice(0, 16) + ':00\0'; // "YYYY:MM:DD HH:MM:SS\0" (20바이트)
    const tiff = new DataView(new ArrayBuffer(64));
    tiff.setUint32(0, 0x4d4d002a); // 빅엔디언 TIFF
    tiff.setUint32(4, 8); // IFD0 위치
    tiff.setUint16(8, 1); // IFD0: 항목 1개
    tiff.setUint16(10, 0x8769); tiff.setUint16(12, 4); tiff.setUint32(14, 1); tiff.setUint32(18, 26); // Exif IFD 위치
    tiff.setUint32(22, 0);
    tiff.setUint16(26, 1); // Exif IFD: 항목 1개
    tiff.setUint16(28, 0x9003); tiff.setUint16(30, 2); tiff.setUint32(32, 20); tiff.setUint32(36, 44); // DateTimeOriginal
    tiff.setUint32(40, 0);
    for (let i = 0; i < 20; i++) tiff.setUint8(44 + i, dt.charCodeAt(i));
    const head = new Uint8Array([0xff, 0xe1, 0x00, 0x48, 0x45, 0x78, 0x69, 0x66, 0x00, 0x00]); // APP1, 길이 72, "Exif\0\0"
    const buf = new Uint8Array(await blob.arrayBuffer());
    return new Blob([buf.subarray(0, 2), head, tiff, buf.subarray(2)], { type: 'image/jpeg' });
  }

  /* ---------------- GPS → 장소 이름 ---------------- */
  function distM(a, b) {
    const R = 6371000;
    const rad = Math.PI / 180;
    const dLat = (b[0] - a[0]) * rad;
    const dLng = (b[1] - a[1]) * rad;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }

  async function guessPlace(ll, lang, picks) {
    let best = null;
    let bestD = NEAR_PICK_M;
    for (const p of picks || []) {
      if (!p.ll) continue;
      const d = distM(ll, p.ll);
      if (d < bestD) { best = p; bestD = d; }
    }
    if (best) return lang === 'en' ? best.name.en || best.name.ko : best.name.ko;

    // OpenStreetMap 주소 찾기 (키 없음, 1초에 한 번까지)
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${ll[0]}&lon=${ll[1]}&zoom=18&accept-language=${lang === 'en' ? 'en' : 'ko'}`);
    if (!r.ok) return '';
    const j = await r.json();
    const a = j.address || {};
    const spot = j.name && !['highway', 'place', 'boundary', 'building'].includes(j.category) ? j.name : '';
    return spot || [a.quarter || a.neighbourhood || a.suburb, a.borough || a.city_district || a.city].filter(Boolean).join(', ');
  }

  /* ---------------- Supabase ---------------- */
  const publicUrl = (path, download) =>
    db.storage.from(BUCKET).getPublicUrl(path, download ? { download } : undefined).data.publicUrl;

  const toItem = (r) => ({
    id: r.id,
    date: r.taken_at,
    place: r.place || '',
    path: r.src,
    src: publicUrl(r.src),
    thumb: publicUrl(r.thumb),
    w: r.w,
    h: r.h,
    ll: r.lat != null && r.lng != null ? [r.lat, r.lng] : null,
  });

  // 최신 사진 목록 (찍은 날짜 최신순)
  async function list() {
    const { data, error } = await db.from(TABLE).select('*').order('taken_at', { ascending: false }).order('id', { ascending: false });
    if (error) throw error;
    return data.map(toItem);
  }

  // items: [{ file, date, place, ll }] → 사진을 Storage에 올리고, 다 올라가면 목록에 한꺼번에 추가
  async function upload(items, onProgress) {
    const rows = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      onProgress(i, items.length);
      const { full, thumb, w, h } = await shrink(it.file, it.date);
      const name = `${(it.date || '').replace(/[-:]/g, '').replace('T', '-')}-${Math.random().toString(36).slice(2, 8)}.jpg`;
      const src = `photos/${name}`;
      const thumbPath = `thumbs/${name}`;
      for (const [path, blob] of [[src, full], [thumbPath, thumb]]) {
        const { error } = await db.storage.from(BUCKET).upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false });
        if (error) throw error;
      }
      rows.push({
        taken_at: it.date,
        place: (it.place || '').trim(),
        src,
        thumb: thumbPath,
        w,
        h,
        lat: it.ll ? it.ll[0] : null,
        lng: it.ll ? it.ll[1] : null,
      });
    }
    onProgress(items.length, items.length);
    const { error } = await db.from(TABLE).insert(rows);
    if (error) throw error;
  }

  window.AlbumStore = {
    configured,
    ready: !!db,
    readExif,
    fallbackDate,
    guessPlace,
    list,
    upload,
    downloadUrl: (item, name) => publicUrl(item.path, name),
  };
})();
