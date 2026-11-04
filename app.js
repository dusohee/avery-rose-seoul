/* Avery의 서울 — 화면 렌더링 (해시 라우팅: #/ · #/area/:id · #/taxi · #/info) */
(function () {
  const D = window.DATA;
  const app = document.getElementById('app');

  /* ---------- 언어 ---------- */
  let lang = 'ko';
  try { lang = localStorage.getItem('lang') || 'en'; } catch (e) {} // 기본은 영어, 한/EN 버튼으로 바꾼 언어는 기억

  const UI = {
    ko: {
      city: '서울, 대한민국',
      whereTo: '어디 갈까?',
      details: '자세히 보기',
      showTaxi: '택시 기사에게 보여주기',
      back: '뒤로',
      areaGuide: '지역 안내',
      intro: '소개',
      howToGet: '호텔에서 가는 법',
      picks: '소희의 추천 장소',
      mapTitle: '추천 장소 지도',
      mapHint: '핀을 누르면 구글·네이버 지도로 열 수 있어요',
      all: '전체',
      eat: '먹기',
      see: '구경',
      walk: '걷기',
      empty: '아직 추천 장소가 없어요. 곧 채울게요!',
      google: 'Google 지도',
      naver: '네이버 지도',
      must: '강력 추천',
      ours: '우리 동네',
      together: '토요일 함께',
      info: '필수 정보',
      taxi: '택시 카드',
      home: '홈',
      callHotel: '호텔에 전화하기',
      contact: '소희에게 연락하기',
      whatsapp: 'WhatsApp으로 메시지 보내기',
      waPending: 'WhatsApp 링크 준비 중',
      emergency: '긴급 번호',
      airport: '공항 → 호텔 (인천공항 1터미널)',
      tips: '서울 이동 꿀팁',
      apps: '설치할 앱',
      switchLang: 'Switch to English',
      snacks: '길거리 음식 도감',
      fx: '환율',
      fxTitle: '환율 계산기',
      fxSwap: '통화 바꾸기',
      fxQuick: '자주 쓰는 금액',
      fxExamples: '이 정도 해요',
      fxLive: '기준',
      fxApprox: '대략 환율 (인터넷 연결 시 자동 갱신)',
      korean: 'Simple Korean',
      koreanLead: '발음이 어려우면 화면을 그대로 보여줘도 돼요. 🔊를 누르면 한국어로 읽어줘요.',
      listen: '듣기',
    },
    en: {
      city: 'Seoul, South Korea',
      whereTo: 'Where to?',
      details: 'See details',
      showTaxi: 'Show the taxi driver',
      back: 'Back',
      areaGuide: 'Area Guide',
      intro: 'About',
      howToGet: 'From the hotel',
      picks: "Sohee's picks",
      mapTitle: 'Picks on the map',
      mapHint: 'Tap a pin to open it in Google Maps or Naver Map',
      all: 'All',
      eat: 'Eat',
      see: 'See',
      walk: 'Walk',
      empty: 'No picks yet — coming soon!',
      google: 'Google Maps',
      naver: 'Naver Map',
      must: 'Must go',
      ours: 'Our hood',
      together: 'Together on Sat',
      info: 'Essentials',
      taxi: 'Taxi Card',
      home: 'Home',
      callHotel: 'Call the hotel',
      contact: 'Contact Sohee',
      whatsapp: 'Message on WhatsApp',
      waPending: 'WhatsApp link coming soon',
      emergency: 'Emergency numbers',
      airport: 'Airport → Hotel (Incheon T1)',
      tips: 'Getting around Seoul',
      apps: 'Apps to install',
      switchLang: '한국어로 보기',
      snacks: 'Street food to try',
      fx: 'Currency',
      fxTitle: 'Currency Converter',
      fxSwap: 'Swap currencies',
      fxQuick: 'Handy amounts',
      fxExamples: 'What things cost',
      fxLive: 'as of',
      fxApprox: 'Approximate rate (updates when online)',
      korean: 'Simple Korean',
      koreanLead: "If it's hard to pronounce, just show the screen. Tap 🔊 to hear it in Korean.",
      listen: 'Listen',
    },
  };

  const t = (key) => UI[lang][key] ?? UI.ko[key];
  const L = (obj) => (obj ? obj[lang] || obj.ko || '' : '');

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- 아이콘 (단색 SVG, currentColor) ---------- */
  const svg = (d, extra = '') => `<svg viewBox="0 0 24 24" aria-hidden="true" ${extra}>${d}</svg>`;
  const stroke = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const ICON = {
    back: svg(`<path d="M14.5 6 8.5 12l6 6" ${stroke}/>`),
    arrow: svg(`<path d="M9.5 6l6 6-6 6" ${stroke}/>`),
    pin: svg('<path fill-rule="evenodd" d="M12 2.5a7 7 0 0 1 7 7c0 5-7 12-7 12s-7-7-7-12a7 7 0 0 1 7-7zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>'),
    home: svg('<path d="M4 11.2 12 4.5l8 6.7V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z"/>'),
    taxi: svg('<path fill-rule="evenodd" d="M5.5 10.4 7.2 6.6A2 2 0 0 1 9 5.5h6a2 2 0 0 1 1.8 1.1l1.7 3.8A2 2 0 0 1 20 12.3V17a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4.7a2 2 0 0 1 1.5-1.9zM7.6 10h8.8l-1.2-2.7a.5.5 0 0 0-.5-.3H9.3a.5.5 0 0 0-.5.3zM7.5 14a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm9 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"/>'),
    info: svg('<path fill-rule="evenodd" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 7.5a1 1 0 0 0-1 1V16a1 1 0 0 0 2 0v-4.5a1 1 0 0 0-1-1zM12 7a1.2 1.2 0 1 0 0 2.4A1.2 1.2 0 0 0 12 7z"/>'),
    phone: svg('<path d="M6.6 3.5h2.6l1.3 4-2 1.4a12 12 0 0 0 6.6 6.6l1.4-2 4 1.3v2.6a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/>'),
    fx: svg(`<path d="M5 8.5h13.5M15 5l3.5 3.5L15 12M19 15.5H5.5M9 12l-3.5 3.5L9 19" ${stroke}/>`),
    chat: svg('<path d="M12 4c4.97 0 9 3.13 9 7s-4.03 7-9 7c-.9 0-1.77-.1-2.6-.3L5 19.5l1.2-3.4C4.2 14.8 3 13 3 11c0-3.87 4.03-7 9-7z"/>'),
    sound: svg(`<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" ${stroke}/>`),
    train: svg('<path fill-rule="evenodd" d="M8 3h8a3 3 0 0 1 3 3v9a3 3 0 0 1-2.2 2.9L18.5 21h-2.3l-1.4-3h-5.6l-1.4 3H5.5l1.7-3.1A3 3 0 0 1 5 15V6a3 3 0 0 1 3-3zm-1 4v4h10V7zm1.5 6.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm7 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/>'),
  };

  /* ---------- 지도 링크 ---------- */
  function mapLinks(place, area) {
    const q = place.query || `${place.name.ko} ${area.searchHint || ''}`.trim();
    return {
      naver: place.naverUrl || 'https://map.naver.com/p/search/' + encodeURIComponent(q),
      google: place.googleUrl || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q),
    };
  }

  function mapButtons(links) {
    return `
      <div class="map-btns">
        <a class="pill pill-soft" href="${esc(links.google)}" target="_blank" rel="noopener"><i class="dot dot-google"></i>${t('google')}</a>
        <a class="pill pill-soft" href="${esc(links.naver)}" target="_blank" rel="noopener"><i class="dot dot-naver"></i>${t('naver')}</a>
      </div>`;
  }

  /* ---------- 공통 조각 ---------- */
  function photo(area, cls) {
    // 사진이 없으면 이모지로 대신 보여줌
    return `
      <div class="photo ${cls || ''}" style="background:${area.cardBg}">
        <img src="${esc(area.image)}" alt="" loading="lazy" onerror="this.remove()" />
        <span class="photo-emoji" aria-hidden="true">${area.emoji || '📍'}</span>
      </div>`;
  }

  function header(title, withBack) {
    const left = withBack
      ? `<a class="icon-btn" href="#/" aria-label="${t('back')}">${ICON.back}</a>`
      : `<span class="icon-btn" aria-hidden="true">${ICON.pin}</span>`;
    return `
      <header class="topbar">
        ${left}
        <p class="topbar-title">${esc(title)}</p>
        <button class="icon-btn lang-btn" data-action="lang" aria-label="${t('switchLang')}">${lang === 'ko' ? 'EN' : '한'}</button>
      </header>`;
  }

  const tags = (list) =>
    list && list.length ? `<div class="outline-tags">${list.map((x) => `<span>${esc(x)}</span>`).join('')}</div>` : '';

  const badge = (b) => (b ? `<span class="badge badge-${b}">${t(b)}</span>` : '');

  function tabbar(page) {
    const tab = (href, key, icon, on) => `
      <a class="tab ${on ? 'on' : ''}" href="${href}" ${on ? 'aria-current="page"' : ''} aria-label="${t(key)}">
        ${icon}<span>${t(key)}</span>
      </a>`;
    return `
      <nav class="tabbar">
        ${tab('#/', 'home', ICON.home, !['info', 'korean', 'fx'].includes(page))}
        ${tab('#/korean', 'korean', ICON.chat, page === 'korean')}
        ${tab('#/fx', 'fx', ICON.fx, page === 'fx')}
        ${tab('#/info', 'info', ICON.info, page === 'info')}
      </nav>`;
  }

  /* ---------- 3-1. 홈 ---------- */
  let hotelOpen = false; // 호텔 카드: 평소엔 이름만, 누르면 펼침

  function renderHome() {
    const h = D.hotel;
    const w = D.welcome;
    const areaCards = D.areas
      .map(
        (a) => `
        <a class="card area-card" href="#/area/${a.id}">
          <div class="card-head">
            <div class="card-head-text">
              <h3>${esc(L(a.name))}</h3>
              <p>${esc(L(a.tagline))}</p>
            </div>
            ${badge(a.badge)}
          </div>
          ${tags(L(a.tags))}
          <div class="area-photo">
            ${photo(a)}
            <span class="details-pill">${t('details')}<span class="details-arrow">${ICON.arrow}</span></span>
          </div>
        </a>`
      )
      .join('');

    return `
      ${header(t('city'), false)}

      <section class="greet">
        <h1>${esc(L(w.hi))} <em>${esc(w.name)},</em><br />${esc(L(w.title)).replace(/서울|Seoul/, '$&<img class="greet-flag" src="favicon.svg" alt="" />')}</h1>
        <p class="lead">${esc(L(w.message))}</p>
        <p class="from">— ${esc(w.from)}</p>
      </section>

      <section class="card hotel-card ${hotelOpen ? 'open' : ''}">
        <button class="card-head hotel-toggle" data-action="hotel" aria-expanded="${hotelOpen}">
          <div class="card-head-text">
            <h3>${esc(L(h.name))}</h3>
          </div>
          <span class="chevron" aria-hidden="true">${ICON.arrow}</span>
        </button>
        ${
          hotelOpen
            ? `<div class="hotel-more">
                <p class="hotel-address">${esc(L(h.address))}</p>
                ${tags([L(h.station), h.phone])}
                <a class="btn btn-dark" href="#/taxi">${ICON.taxi}${t('showTaxi')}</a>
                ${mapButtons({ google: h.googleUrl, naver: h.naverUrl })}
              </div>`
            : ''
        }
      </section>

      <h2 class="section-title">${t('whereTo')}</h2>
      <section class="stack">${areaCards}</section>
    `;
  }

  /* ---------- 3-2. 지역 상세 ---------- */
  let filter = 'all';

  function renderArea(id) {
    const a = D.areas.find((x) => x.id === id);
    if (!a) return renderHome();

    const places = D.places.filter((p) => p.area === id);
    const count = (k) => (k === 'all' ? places.length : places.filter((p) => p.kind === k).length);
    const chips = ['all', 'eat', 'see', 'walk']
      .map(
        (k) => `
        <button class="chip ${filter === k ? 'on' : ''}" data-action="filter" data-kind="${k}" aria-pressed="${filter === k}">
          ${t(k)}<span class="cnt">${count(k)}</span>
        </button>`
      )
      .join('');

    const shown = filter === 'all' ? places : places.filter((p) => p.kind === filter);
    const list = shown.length
      ? shown.map((p) => placeCard(p, a)).join('')
      : `<p class="empty">${t('empty')}</p>`;

    // 좌표(ll)가 있는 장소만 지도에. 핀은 아래 필터 칩을 따라감
    const located = places.filter((p) => p.ll);
    pendingMap = located.length ? { area: a, pins: shown.filter((p) => p.ll), all: located } : null;
    const mapBlock = located.length
      ? `
      <section class="block">
        <h2 class="block-title">${t('mapTitle')}</h2>
        <div class="map-card"><div id="area-map" class="map"></div></div>
        <p class="map-hint">${t('mapHint')}</p>
      </section>`
      : '';

    return `
      ${header(t('areaGuide'), true)}

      <div class="hero">
        ${photo(a, 'photo-hero')}
        <span class="hero-icon" aria-hidden="true">${a.emoji || '📍'}</span>
        <span class="hero-pill">${esc(L(a.tagline))}</span>
      </div>

      <div class="title-row">
        <h1 class="page-title">${esc(L(a.name))}</h1>
        ${badge(a.badge)}
      </div>
      ${tags(L(a.tags))}

      <section class="block">
        <h2 class="block-title">${t('intro')}</h2>
        <p class="body-text">${esc(L(a.intro))}</p>
        ${a.notice ? `<p class="notice">${esc(L(a.notice))}</p>` : ''}
      </section>

      ${snackBlock(a)}

      <section class="block">
        <h2 class="block-title">${t('howToGet')}</h2>
        <div class="route">
          <span class="icon-circle icon-circle-accent">${ICON.train}</span>
          <p>${esc(L(a.howToGet))}</p>
        </div>
      </section>

      ${mapBlock}

      <section class="block">
        <h2 class="block-title">${t('picks')}</h2>
        <div class="chips">${chips}</div>
        <div class="stack">${list}</div>
      </section>
    `;
  }

  // 길거리 음식 도감: 옆으로 넘기는 작은 카드
  function snackBlock(a) {
    if (!a.snacks || !a.snacks.length) return '';
    const card = (s) => {
      const { main, sub } = placeName(s);
      return `
        <div class="snack">
          <div class="snack-photo" style="background:${a.cardBg}">
            ${s.photo ? `<img src="${esc(s.photo)}" alt="" loading="lazy" onerror="this.remove()" />` : ''}
            <span class="snack-emoji" aria-hidden="true">${s.emoji || '🍡'}</span>
          </div>
          <h3>${esc(main)}</h3>
          ${sub ? `<p class="snack-sub">${esc(sub)}</p>` : ''}
          <p class="snack-desc">${esc(L(s.desc))}</p>
        </div>`;
    };
    return `
      <section class="block">
        <h2 class="block-title">${t('snacks')}</h2>
        <div class="snack-row">${a.snacks.map(card).join('')}</div>
      </section>`;
  }

  // 한글 모드: 한글 크게 + 영어 작게 / 영어 모드: 반대
  function placeName(p) {
    return {
      main: lang === 'en' ? p.name.en || p.name.ko : p.name.ko,
      sub: lang === 'en' ? (p.name.en ? p.name.ko : '') : p.name.en,
    };
  }

  /* ---------- 추천 장소 지도 (MapLibre + OpenFreeMap, API 키 없음) ---------- */
  const KIND_EMOJI = { eat: '🍜', see: '📷', walk: '👟' };
  const MAP_STYLE = 'https://tiles.openfreemap.org/styles/positron';
  // 지도 색: 베이지 바탕 + 초록 도로 + 주황 철도
  const MAP_COLORS = {
    land: '#f3ebdb', residential: '#efe4cf', water: '#c6dbe5', park: '#cfe2bd', building: '#e7dbc4',
    road: '#8cc488', roadCasing: '#76b273', roadMinor: '#bcdab0', rail: '#e2a46c', label: '#5e5444', halo: '#f3ebdb',
  };

  function recolorMap(m) {
    const C = MAP_COLORS;
    const set = (id, prop, val) => { try { m.setPaintProperty(id, prop, val); } catch (e) {} };
    for (const { id, type } of m.getStyle().layers) {
      if (type === 'background') set(id, 'background-color', C.land);
      else if (type === 'fill') {
        if (/water/.test(id)) set(id, 'fill-color', C.water);
        else if (/park|wood|grass/.test(id)) set(id, 'fill-color', C.park);
        else if (/building/.test(id)) set(id, 'fill-color', C.building);
        else if (/residential/.test(id)) set(id, 'fill-color', C.residential);
      } else if (type === 'line') {
        if (/boundary/.test(id)) m.setLayoutProperty(id, 'visibility', 'none');
        else if (/waterway/.test(id)) set(id, 'line-color', C.water);
        else if (/rail/.test(id)) set(id, 'line-color', C.rail);
        else if (/casing/.test(id)) set(id, 'line-color', C.roadCasing);
        else if (/motorway|major/.test(id)) set(id, 'line-color', C.road);
        else if (/minor|path|pier/.test(id)) set(id, 'line-color', C.roadMinor);
      } else if (type === 'symbol') {
        set(id, 'text-color', C.label);
        set(id, 'text-halo-color', C.halo);
      }
    }
  }
  let map = null;
  let pendingMap = null;

  function pinHtml(p) {
    const inner = p.photo ? `<img src="${esc(p.photo)}" alt="" />` : KIND_EMOJI[p.kind] || '📍';
    return `<div class="pin pin-${p.kind}"><div class="pin-badge">${inner}</div><i class="pin-dot"></i></div>`;
  }

  function popupHtml(p, area) {
    const { main, sub } = placeName(p);
    const links = mapLinks(p, area);
    return `
      <div class="pop">
        <span class="kind"><i class="dot dot-${p.kind}"></i>${t(p.kind)}</span>
        <h3>${esc(main)}</h3>
        ${sub ? `<p class="pop-sub">${esc(sub)}</p>` : ''}
        <div class="pop-links">
          <a href="${esc(links.google)}" target="_blank" rel="noopener"><i class="dot dot-google"></i>Google</a>
          <a href="${esc(links.naver)}" target="_blank" rel="noopener"><i class="dot dot-naver"></i>${lang === 'en' ? 'Naver' : '네이버'}</a>
        </div>
      </div>`;
  }

  function initMap() {
    if (map) { map.remove(); map = null; }
    const el = document.getElementById('area-map');
    if (!el || !pendingMap) return;
    const ML = window.maplibregl;
    if (!ML) { el.innerHTML = `<p class="map-fallback">${t('mapHint')}</p>`; return; } // 오프라인 등

    const { area, pins, all } = pendingMap;
    const toLngLat = (p) => [p.ll[1], p.ll[0]]; // 데이터는 [위도, 경도], MapLibre는 [경도, 위도]

    // 필터로 핀이 0개여도 지역 전체 범위는 보여줌
    const pts = (pins.length ? pins : all).map(toLngLat);
    const view = pts.length === 1
      ? { center: pts[0], zoom: 15 }
      : { bounds: pts.reduce((b, pt) => b.extend(pt), new ML.LngLatBounds(pts[0], pts[0])), fitBoundsOptions: { padding: 56, maxZoom: 16 } };

    map = new ML.Map({
      container: el,
      style: MAP_STYLE,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      ...view,
    });
    map.scrollZoom.disable();
    map.touchZoomRotate.disableRotation();
    map.addControl(new ML.AttributionControl({ compact: true }));
    map.on('style.load', () => recolorMap(map));

    pins.forEach((p) => {
      const pinEl = document.createElement('div');
      pinEl.className = 'pin-wrap';
      pinEl.title = p.name.ko;
      pinEl.innerHTML = pinHtml(p);
      new ML.Marker({ element: pinEl, anchor: 'bottom' })
        .setLngLat(toLngLat(p))
        .setPopup(new ML.Popup({ closeButton: false, offset: [0, -58], className: 'pin-popup', maxWidth: '240px' }).setHTML(popupHtml(p, area)))
        .addTo(map);
    });
  }

  function placeCard(p, area) {
    const { main, sub } = placeName(p);
    const note = L(p.note);
    return `
      <article class="card place">
        <div class="place-row">
          <div class="place-thumb" style="background:${area.cardBg}">
            ${p.photo ? `<img src="${esc(p.photo)}" alt="" loading="lazy" onerror="this.remove()" />` : ''}
            <span class="place-thumb-emoji" aria-hidden="true">${area.emoji || '📍'}</span>
          </div>
          <div class="place-body">
            <div class="place-head">
              <div>
                <h3>${esc(main)}</h3>
                ${sub ? `<p class="place-sub">${esc(sub)}</p>` : ''}
              </div>
              <span class="kind"><i class="dot dot-${p.kind}"></i>${t(p.kind)}</span>
            </div>
            ${note ? `<p class="place-note">${esc(note)}</p>` : ''}
          </div>
        </div>
        ${mapButtons(mapLinks(p, area))}
      </article>`;
  }

  /* ---------- 3-3. 택시 카드 (언어와 상관없이 한글 크게) ---------- */
  function renderTaxi() {
    const h = D.hotel;
    const rows = [
      ['기사님, 여기로 가주세요.', 'Driver, please take me here.'],
      [h.name.ko, h.name.en],
      [h.address.ko, h.address.en],
      ['을지로3가역 1번 출구 근처', 'Near Euljiro 3-ga Station, Exit 1'],
    ];
    return `
      ${header(t('taxi'), true)}
      <section class="card taxi">
        ${rows
          .map(
            ([ko, en], i) => `
          <div class="taxi-row ${i === 1 ? 'taxi-name' : ''}">
            <p class="taxi-ko">${esc(ko)}</p>
            <p class="taxi-en">${esc(en)}</p>
          </div>`
          )
          .join('')}
      </section>
      <a class="btn btn-accent" href="tel:${h.phoneIntl}">${ICON.phone}${t('callHotel')} · ${h.phone}</a>
    `;
  }

  /* ---------- 서울 이동 꿀팁 일러스트 ----------
   * 선 없는 플랫 손그림 스타일: 진한 원색 면 + 크레용처럼 거친 가장자리(feTurbulence) */
  const PAL = { green: '#1db46a', red: '#f2552c', pink: '#f4a3c0', blue: '#4f7fc6', yellow: '#f7c934', black: '#262626' };
  const TIP_ART = {
    // 에스컬레이터 + 오른쪽에 서 있는 사람
    escalator: `
      <path d="M4 40h11l23-26h20" stroke="${PAL.black}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 46h13l23-26h20v9H44L21 55H4z" fill="${PAL.green}"/>
      <path d="M22 47l4 4M29 39l4 4M36 31l4 4" stroke="#8fe0b1" stroke-width="2.2" stroke-linecap="round"/>
      <rect x="25.5" y="19" width="9" height="13" rx="3.5" fill="${PAL.red}"/>
      <circle cx="30" cy="14" r="4.6" fill="${PAL.pink}"/>
      <path d="M46 8h9M51.5 4.5 55 8l-3.5 3.5" stroke="${PAL.yellow}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    // 꽉 찬 지하철 + 시계
    rush: `
      <rect x="8" y="15" width="42" height="5" rx="1.5" fill="${PAL.yellow}"/>
      <rect x="5" y="19" width="48" height="27" rx="5" fill="${PAL.red}"/>
      <rect x="10" y="24" width="38" height="11" rx="2" fill="${PAL.green}"/>
      ${[15, 21.5, 28, 34.5, 41].map((x) => `<circle cx="${x}" cy="31" r="3.2" fill="${PAL.pink}"/>`).join('')}
      ${[15, 29, 43].map((x) => `<circle cx="${x}" cy="48" r="5" fill="${PAL.blue}"/><circle cx="${x}" cy="48" r="2" fill="${PAL.black}"/>`).join('')}
      <circle cx="53" cy="13" r="8.5" fill="${PAL.yellow}"/>
      <path d="M53 13V8.5M53 13l3.5 2" stroke="${PAL.black}" stroke-width="2.4" stroke-linecap="round"/>`,
    // 분홍 버스 + 카드 찍기 (삑!)
    bus: `
      <path d="M4 22h36c4 0 6 2 8 6l4 8v9H4z" fill="${PAL.pink}"/>
      <path d="M7 25h33l5 9H7z" fill="${PAL.blue}"/>
      <path d="M16 25v9M25 25v9M34 25v9" stroke="${PAL.black}" stroke-width="2"/>
      <path d="M30 37v7" stroke="${PAL.red}" stroke-width="2" stroke-linecap="round"/>
      <rect x="49" y="38" width="3.5" height="4" rx="1" fill="${PAL.yellow}"/>
      ${[14, 40].map((x) => `<circle cx="${x}" cy="46" r="5.5" fill="${PAL.green}"/><circle cx="${x}" cy="46" r="2.2" fill="${PAL.black}"/>`).join('')}
      <g transform="rotate(-12 53 13)"><rect x="45" y="8" width="16" height="10.5" rx="2" fill="${PAL.yellow}"/><rect x="45" y="11" width="16" height="2.5" fill="${PAL.blue}"/></g>
      <path d="M42 9l-2.5-3M45.5 5l-.5-3.5" stroke="${PAL.red}" stroke-width="2.4" stroke-linecap="round"/>`,
    // 돌고 도는 환승 화살표 + 30분
    transfer: `
      <path d="M12 29a20 20 0 0 1 31-13" stroke="${PAL.red}" stroke-width="6" stroke-linecap="round"/>
      <path d="M37 9l13 5-8 10z" fill="${PAL.red}"/>
      <path d="M52 35a20 20 0 0 1-31 13" stroke="${PAL.blue}" stroke-width="6" stroke-linecap="round"/>
      <path d="M27 55l-13-5 8-10z" fill="${PAL.blue}"/>
      <circle cx="32" cy="32" r="10.5" fill="${PAL.yellow}"/>
      <text x="32" y="36" text-anchor="middle" font-size="11" font-weight="800" fill="${PAL.black}" font-family="Pretendard Variable, sans-serif">30</text>`,
    // 지하철 앞모습 (환율 화면 예시용)
    subway: `
      <rect x="15" y="7" width="34" height="42" rx="10" fill="${PAL.blue}"/>
      <rect x="20" y="13" width="24" height="14" rx="3" fill="#fff"/>
      <rect x="15" y="40" width="34" height="4" fill="${PAL.red}"/>
      <circle cx="23" cy="34" r="3" fill="${PAL.yellow}"/><circle cx="41" cy="34" r="3" fill="${PAL.yellow}"/>
      <path d="M21 50l-5 8M43 50l5 8M10 58h44" stroke="${PAL.black}" stroke-width="3" stroke-linecap="round"/>`,
    // 비행기 + 해
    plane: `
      <circle cx="16" cy="16" r="8" fill="${PAL.yellow}"/>
      <g transform="rotate(-18 34 36)">
        <rect x="8" y="31" width="50" height="11" rx="5.5" fill="${PAL.pink}"/>
        <path d="M28 33l9-16h7l-4 16z" fill="${PAL.blue}"/>
        <path d="M28 40l9 16h7l-4-16z" fill="${PAL.blue}"/>
        <path d="M9 33l2-9h6l2 9z" fill="${PAL.red}"/>
        <circle cx="50" cy="36.5" r="2" fill="#fff"/><circle cx="43" cy="36.5" r="2" fill="#fff"/>
      </g>`,
    // 초록 교통카드 + 동전
    fare: `
      <rect x="4" y="16" width="40" height="27" rx="4" fill="${PAL.green}"/>
      <rect x="9" y="22" width="9" height="7" rx="1.5" fill="${PAL.pink}"/>
      <rect x="9" y="34" width="20" height="3.2" rx="1.6" fill="${PAL.blue}"/>
      <circle cx="46" cy="42" r="12" fill="${PAL.yellow}"/>
      <text x="46" y="47" text-anchor="middle" font-size="14" font-weight="800" fill="${PAL.red}" font-family="Pretendard Variable, sans-serif">₩</text>
      <path d="M54 7v8M50 11h8" stroke="${PAL.red}" stroke-width="2.6" stroke-linecap="round"/>`,
  };

  function tipArt(name) {
    if (!TIP_ART[name]) return '';
    const id = `rough-${name}`;
    return `
      <span class="tip-art tip-art-${name}" aria-hidden="true">
        <svg viewBox="0 0 64 64">
          <filter id="${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="7"/><feDisplacementMap in="SourceGraphic" scale="1.6" xChannelSelector="R" yChannelSelector="G"/></filter>
          <g filter="url(#${id})">${TIP_ART[name]}</g>
        </svg>
      </span>`;
  }


  /* ---------- 3-4. 필수 정보 ---------- */
  function renderInfo() {
    const wa = D.whatsapp
      ? `<a class="btn btn-dark" href="https://wa.me/${esc(D.whatsapp)}" target="_blank" rel="noopener">${t('whatsapp')}</a>`
      : `<p class="muted">${t('waPending')}</p>`;

    const items = (rows, withMeta) =>
      rows
        .map(
          (r) => `
        <div class="info-item ${r.art ? 'tip' : ''}">
          ${r.art ? tipArt(r.art) : ''}
          <div class="tip-text">
            <h3>${esc(L(r.title))}</h3>
            ${withMeta ? `<p class="meta">${esc(L(r.meta))}</p>` : ''}
            <p>${esc(L(r.desc))}</p>
          </div>
        </div>`
        )
        .join('');

    return `
      ${header(t('info'), true)}
      <h1 class="page-title page-title-solo">${t('info')}</h1>

      <section class="card">
        <h2 class="card-title">${t('contact')}</h2>
        ${wa}
      </section>

      <section class="card">
        <h2 class="card-title">${t('emergency')}</h2>
        <ul class="plain">
          ${D.emergency
            .map((e) => `<li><a class="tel" href="tel:${e.num}">${e.num}</a><span>${esc(L(e.label))}</span></li>`)
            .join('')}
        </ul>
      </section>

      <section class="card">
        <h2 class="card-title">${t('airport')}</h2>
        ${items(D.airport, true)}
      </section>

      <section class="card">
        <h2 class="card-title">${t('tips')}</h2>
        ${items(D.tips, false)}
      </section>

      <section class="card">
        <h2 class="card-title">${t('apps')}</h2>
        <ul class="plain">
          ${D.apps.map((a) => `<li><strong>${esc(L(a.name))}</strong><span>${esc(L(a.desc))}</span></li>`).join('')}
        </ul>
      </section>
    `;
  }

  /* ---------- Simple Korean ---------- */
  function renderKorean() {
    const canSpeak = 'speechSynthesis' in window;
    const row = (p) => {
      const canPlay = canSpeak || VOICES[p.ko];
      return `
      <li class="phrase">
        <div class="phrase-text">
          <p class="phrase-ko" lang="ko">${esc(p.ko)}</p>
          <p class="phrase-rom">${esc(p.rom)}</p>
          <p class="phrase-en">${esc(p.en)}</p>
        </div>
        ${canPlay ? `<button class="icon-btn speak-btn" data-action="speak" data-text="${esc(p.ko)}" aria-label="${t('listen')}: ${esc(p.ko)}">${ICON.sound}</button>` : ''}
      </li>`;
    };

    return `
      ${header(t('korean'), true)}
      <h1 class="page-title page-title-solo">${t('korean')}</h1>
      <p class="page-lead">${t('koreanLead')}</p>
      ${(D.phrases || [])
        .map(
          (g) => `
        <section class="card">
          <h2 class="card-title">${esc(L(g.title))}</h2>
          <ul class="phrases">${g.items.map(row).join('')}</ul>
        </section>`
        )
        .join('')}
    `;
  }

  // 소희가 admin에서 녹음한 문장은 녹음 파일을, 없으면 휴대폰 목소리로 읽어줘요
  const VOICES = window.VOICES || {};
  let voiceAudio = null;
  function speak(text) {
    if (voiceAudio) voiceAudio.pause();
    if (VOICES[text]) {
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      voiceAudio = new Audio(VOICES[text]);
      voiceAudio.play().catch(() => speakTTS(text));
      return;
    }
    speakTTS(text);
  }

  function speakTTS(text) {
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/\s*\/\s*/g, ', '));
      u.lang = 'ko-KR';
      u.rate = 0.85;
      const ko = speechSynthesis.getVoices().find((v) => v.lang && v.lang.startsWith('ko'));
      if (ko) u.voice = ko;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ---------- 환율 계산기 (USD ↔ KRW) ---------- */
  const FX = D.fx || { fallbackRate: 1344, quick: [], examples: [] };
  let fxRate = { value: FX.fallbackRate, date: FX.fallbackDate, live: false };
  try {
    const saved = JSON.parse(localStorage.getItem('fxRate') || 'null');
    if (saved && saved.value) fxRate = saved;
  } catch (e) {}
  let fxFrom = 'USD';
  let fxAmount = '10';
  let fxFetched = false;

  const parseAmount = (s) => parseFloat(String(s).replace(/[^0-9.]/g, '')) || 0;
  const fxConvert = (n) => (fxFrom === 'USD' ? n * fxRate.value : n / fxRate.value);
  const fmtKRW = (n) => Math.round(n).toLocaleString('ko-KR') + (lang === 'en' ? ' won' : '원');
  const fmtUSD = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtTo = (n) => (fxFrom === 'USD' ? fmtKRW(n) : fmtUSD(n));

  const FLAG = {
    USD: '<img class="flag" src="images/flags/us.svg" alt="" />',
    KRW: '<img class="flag" src="favicon.svg" alt="" />',
  };

  function fxDateText() {
    const d = new Date(fxRate.date + 'T00:00:00');
    if (isNaN(d)) return fxRate.date || '';
    return lang === 'en'
      ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : `${d.getMonth() + 1}월 ${d.getDate()}일`;
  }

  function fxRateHtml() {
    const krw = Math.round(fxRate.value).toLocaleString('ko-KR') + (lang === 'en' ? ' won' : '원');
    const rate = `${FLAG.USD}<b>1 USD</b> = ${FLAG.KRW}<b>${krw}</b>`;
    return fxRate.live
      ? `<span class="fx-dot fx-dot-live"></span>Live · ${rate} · ${fxDateText()}`
      : `<span class="fx-dot"></span>${rate} · ${t('fxApprox')}`;
  }

  function updateFxOutput() {
    const out = document.getElementById('fx-output');
    if (out) out.textContent = fmtTo(fxConvert(parseAmount(fxAmount)));
    const rate = document.getElementById('fx-rate');
    if (rate) rate.innerHTML = fxRateHtml();
  }

  // 최신 환율은 환율 화면을 처음 열 때 한 번만 받아옴 (키 필요 없는 무료 API)
  function fetchFxRate() {
    if (fxFetched || !window.fetch) return;
    fxFetched = true;
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((j) => {
        const krw = j && j.rates && j.rates.KRW;
        if (!krw) return;
        const d = new Date((j.time_last_update_unix || Date.now() / 1000) * 1000);
        fxRate = { value: krw, date: d.toISOString().slice(0, 10), live: true };
        try { localStorage.setItem('fxRate', JSON.stringify(fxRate)); } catch (e) {}
        updateFxOutput();
        document.querySelectorAll('[data-fx-krw]').forEach((el) => {
          el.textContent = '≈ ' + fmtUSD(+el.dataset.fxKrw / fxRate.value);
        });
      })
      .catch(() => {});
  }

  function renderFx() {
    const from = fxFrom;
    const to = fxFrom === 'USD' ? 'KRW' : 'USD';
    const usd = (krw) => `<span data-fx-krw="${krw}">≈ ${fmtUSD(krw / fxRate.value)}</span>`;

    const chips = FX.quick
      .map((k) => `
        <button class="fx-qchip" data-action="fx-set" data-krw="${k}">
          <b>₩${k.toLocaleString('ko-KR')}</b>${usd(k)}
        </button>`)
      .join('');

    const rows = FX.examples
      .map((x) => `
        <button class="fx-row" data-action="fx-set" data-krw="${x.krw}">
          ${x.art ? tipArt(x.art) : ''}
          <span class="fx-row-name">${esc(L(x.name))}</span>
          <span class="fx-row-price"><b>${fmtKRW(x.krw)}</b>${usd(x.krw)}</span>
        </button>`)
      .join('');

    return `
      ${header(t('fxTitle'), true)}
      <h1 class="page-title page-title-solo">${t('fxTitle')}</h1>

      <section class="card fx-card">
        <label class="fx-side">
          <span class="fx-chip">${FLAG[from]}${from}</span>
          <input id="fx-input" class="fx-input" type="text" inputmode="decimal" autocomplete="off"
                 value="${esc(fxAmount)}" placeholder="0" aria-label="${from}" />
        </label>
        <div class="fx-divider">
          <button class="fx-swap" data-action="fx-swap" aria-label="${t('fxSwap')}">${ICON.fx}</button>
        </div>
        <div class="fx-side">
          <span class="fx-chip">${FLAG[to]}${to}</span>
          <output id="fx-output" class="fx-output">${fmtTo(fxConvert(parseAmount(fxAmount)))}</output>
        </div>
      </section>
      <p id="fx-rate" class="fx-rate">${fxRateHtml()}</p>

      <section class="block">
        <h2 class="block-title">${t('fxQuick')}</h2>
        <div class="fx-chips">${chips}</div>
      </section>

      <section class="block">
        <h2 class="block-title">${t('fxExamples')}</h2>
        <div class="card fx-list">${rows}</div>
      </section>
    `;
  }

  /* ---------- 라우터 ---------- */
  let lastRoute = '';

  function render() {
    const hash = location.hash.replace(/^#/, '') || '/';
    const [, page, id] = hash.split('/');

    if (hash !== lastRoute) filter = 'all'; // 다른 화면으로 가면 필터 초기화
    pendingMap = null;

    let html;
    if (page === 'area') html = renderArea(id);
    else if (page === 'taxi') html = renderTaxi();
    else if (page === 'info') html = renderInfo();
    else if (page === 'korean') html = renderKorean();
    else if (page === 'fx') html = renderFx();
    else html = renderHome();

    if (map) { map.remove(); map = null; } // 화면을 다시 그리기 전에 이전 지도 정리
    app.innerHTML = html + tabbar(page);
    initMap();
    if (page === 'fx') fetchFxRate();
    document.documentElement.lang = lang;

    if (hash !== lastRoute) window.scrollTo(0, 0);
    lastRoute = hash;
  }

  app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.dataset.action === 'lang') {
      lang = lang === 'ko' ? 'en' : 'ko';
      try { localStorage.setItem('lang', lang); } catch (err) {}
      render();
    } else if (el.dataset.action === 'hotel') {
      hotelOpen = !hotelOpen;
      render();
    } else if (el.dataset.action === 'filter') {
      filter = el.dataset.kind;
      render();
    } else if (el.dataset.action === 'speak') {
      speak(el.dataset.text);
    } else if (el.dataset.action === 'fx-swap') {
      const out = fxConvert(parseAmount(fxAmount));
      fxFrom = fxFrom === 'USD' ? 'KRW' : 'USD';
      fxAmount = out ? String(fxFrom === 'USD' ? +out.toFixed(2) : Math.round(out)) : '';
      render();
    } else if (el.dataset.action === 'fx-set') {
      fxFrom = 'KRW';
      fxAmount = el.dataset.krw;
      render();
    }
  });

  // 환율 입력: 다시 그리지 않고 결과만 바꿔서 키보드 포커스 유지
  app.addEventListener('input', (e) => {
    if (e.target.id !== 'fx-input') return;
    fxAmount = e.target.value;
    updateFxOutput();
  });

  window.addEventListener('hashchange', render);
  render();
})();
