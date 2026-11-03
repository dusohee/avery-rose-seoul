/* =========================================================
 * Avery의 서울 — 데이터
 * 이 파일만 고치면 앱 내용이 바뀝니다.
 *
 * - 문구는 모두 { ko, en } 로 적어요. en 이 비어 있으면 ko 가 대신 보여요.
 * - 장소 지도 링크: naverUrl / googleUrl 에 공유 링크를 넣으면 그걸 쓰고,
 *   비워두면 "한글 이름 + 지역 검색어(searchHint)"로 검색 링크를 자동으로 만들어요.
 * - 지도 핀: ll: [위도, 경도] 를 넣으면 지역 화면 지도에 핀이 꽂혀요. 없으면 핀만 안 보여요.
 *   좌표 구하는 법: 구글 지도에서 장소를 꾹 누르면 맨 위에 "37.57975, 126.97668" 같은 숫자가 나와요.
 * ========================================================= */

window.DATA = {
  welcome: {
    // 화면에는 "안녕 Avery & Rose," + 줄바꿈 + "서울에 온 걸 환영해" 로 보여요 (이름은 이탤릭)
    hi: { ko: '안녕', en: 'Hey' },
    name: 'Avery & Rose',
    title: { ko: '서울에 온 걸 환영해', en: 'Welcome to Seoul' },
    // TODO(소희): 한 줄 메시지
    message: { ko: '우리가 좋아하는 곳들을 모아봤어. 천천히 즐겨!', en: 'We put together our favorite spots. Enjoy it slowly!' },
    from: 'Sohee & Evan',
  },

  hotel: {
    name: { ko: '롯데시티호텔 명동', en: 'LOTTE City Hotel Myeongdong' },
    address: { ko: '서울 중구 삼일대로 362', en: '362 Samil-daero, Jung-gu, Seoul' },
    station: { ko: '을지로3가역 1번 출구 도보 3분', en: '3 min walk from Euljiro 3-ga Stn. Exit 1' },
    phone: '02-6112-1000',
    phoneIntl: '+82261121000',
    naverUrl: 'https://map.naver.com/p/search/' + encodeURIComponent('롯데시티호텔 명동'),
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('LOTTE City Hotel Myeongdong'),
  },

  // TODO(소희): WhatsApp 번호 (국가번호 포함, + 와 - 없이) 예: 821012345678
  whatsapp: '',

  /* ---------------- 지역 ---------------- */
  areas: [
    {
      id: 'myeongdong',
      emoji: '🍢',
      image: 'images/areas/myeongdong.jpg',
      cardBg: '#FFE6D6',
      searchHint: '명동',
      name: { ko: '명동', en: 'Myeongdong' },
      tagline: { ko: '호텔 바로 옆 · 길거리 음식', en: 'Right by the hotel · Street food' },
      intro: {
        ko: '호텔에서 걸어갈 수 있는 서울 대표 번화가. 저녁이 되면 길 한가운데 노점이 쭉 들어서서 계란빵, 어묵, 호떡 같은 길거리 음식을 골라 먹는 재미가 있어.',
        en: "Seoul's best-known shopping street, walkable from the hotel. In the evening, food stalls line the middle of the street — perfect for grazing on egg bread, fish cakes and hotteok.",
      },
      tags: { ko: ['길거리 음식', '쇼핑', '성당'], en: ['Street food', 'Shopping', 'Cathedral'] },
      notice: {
        ko: '노점은 오후 늦게(4~5시쯤)부터 많이 열려요. 현금을 조금 챙기면 편해요.',
        en: 'Most stalls open in the late afternoon (around 4–5 pm). Bring a little cash.',
      },
      howToGet: { ko: '호텔에서 걸어서 약 10분', en: 'About a 10-minute walk from the hotel' },
      // 길거리 음식 도감 (지역 화면에 옆으로 넘기는 카드로 보여요)
      snacks: [
        { emoji: '🥚', photo: 'images/snacks/gyeranppang.jpg', name: { ko: '계란빵', en: 'Gyeran-ppang' }, desc: { ko: '폭신한 빵 위에 계란이 통째로', en: 'Fluffy bread baked with a whole egg on top' } },
        { emoji: '🍢', photo: 'images/snacks/eomuk.jpg', name: { ko: '어묵 (오뎅)', en: 'Eomuk' }, desc: { ko: '꼬치 하나씩 집어 먹고, 국물은 셀프', en: 'Fish cake skewers — the warm broth is free' } },
        { emoji: '🥞', photo: 'images/snacks/hotteok.jpg', name: { ko: '호떡', en: 'Hotteok' }, desc: { ko: '흑설탕 시럽이 쏙. 뜨거우니 조심!', en: "Sweet pancake with brown-sugar syrup. It's hot!" } },
        { emoji: '🌶️', name: { ko: '떡볶이', en: 'Tteokbokki' }, desc: { ko: '매콤달콤한 떡. 어묵 국물이랑 같이', en: 'Chewy rice cakes in a sweet-spicy sauce' } },
        { emoji: '🥔', name: { ko: '회오리감자', en: 'Tornado potato' }, desc: { ko: '꼬치에 돌돌 말아 튀긴 감자', en: 'A whole potato spiral-cut and fried on a stick' } },
      ],
    },
    {
      id: 'namdaemun',
      emoji: '🏮',
      image: 'images/areas/namdaemun.jpg',
      cardBg: '#FCE1DC',
      badge: 'must',
      searchHint: '남대문시장',
      name: { ko: '남대문시장', en: 'Namdaemun Market' },
      tagline: { ko: '호텔에서 걸어서 20분', en: '20 min walk from the hotel' },
      intro: {
        ko: '600년 넘은 서울에서 가장 오래된 전통시장. 길거리 음식, 갈치조림 골목, 온갖 잡화까지 구경거리가 끝이 없어.',
        en: "Seoul's oldest traditional market, over 600 years old. Street food, a braised-fish alley, and endless stalls.",
      },
      tags: { ko: ['시장', '길거리 음식'], en: ['Market', 'Street food'] },
      notice: { ko: '저녁엔 일찍 닫고 일요일은 대부분 휴무', en: 'Closes early in the evening, mostly closed Sundays' },
      howToGet: { ko: '명동을 지나 도보 약 20분 (1.3km)', en: 'Walk through Myeongdong, ~20 min (1.3 km)' },
    },
    {
      id: 'gyeongbokgung',
      emoji: '🏯',
      image: 'images/areas/gyeongbokgung.jpg',
      cardBg: '#FDEBD3',
      searchHint: '종로',
      name: { ko: '경복궁 주변', en: 'Gyeongbokgung' },
      tagline: { ko: '궁궐 · 한옥 골목', en: 'Palace · Hanok alleys' },
      intro: {
        ko: '조선의 가장 큰 궁궐과 그 옆 서촌·삼청동 한옥 골목. 궁 구경하고 골목 따라 걷다가 맛있는 거 먹기 딱 좋은 동네야.',
        en: 'The grandest palace of the Joseon dynasty, plus the hanok alleys of Seochon and Samcheong-dong right next to it.',
      },
      tags: { ko: ['궁궐', '한옥', '산책'], en: ['Palace', 'Hanok', 'Strolling'] },
      notice: { ko: '화요일 휴궁. 한복 입으면 무료 입장!', en: 'Closed Tuesdays. Free entry if you wear hanbok!' },
      howToGet: {
        ko: '3호선 을지로3가 → 경복궁 (3정거장, 약 8분), 5번 출구',
        en: 'Line 3 Euljiro 3-ga → Gyeongbokgung (3 stops, ~8 min), Exit 5',
      },
    },
    {
      id: 'naksan',
      emoji: '🌇',
      image: 'images/areas/naksan.jpg',
      cardBg: '#FFE8CC',
      searchHint: '혜화',
      name: { ko: '낙산공원', en: 'Naksan Park' }, photo: 'images/areas/naksan.jpg',
      tagline: { ko: '성곽길 · 노을과 야경', en: 'Fortress wall · Sunset & night view' },
      intro: {
        ko: '옛 서울 성곽을 따라 걷는 언덕 공원. 노을 지고 불 켜지는 서울을 한눈에 볼 수 있어.',
        en: "A hilltop park along Seoul's old fortress wall. Watch the sunset and the city lights come on.",
      },
      tags: { ko: ['성곽', '야경', '산책'], en: ['Fortress wall', 'Night view', 'Walk'] },
      notice: { ko: '내려올 땐 성곽 따라 동대문 방향으로', en: 'Walk down along the wall toward Dongdaemun' },
      howToGet: {
        ko: '2호선 동대문역사문화공원 → 4호선 혜화 2번 출구 → 오르막 도보 15분',
        en: 'Line 2 to Dongdaemun History & Culture Park → Line 4 to Hyehwa, Exit 2 → 15 min uphill walk',
      },
    },
    {
      id: 'inwangsan',
      emoji: '⛰️',
      image: 'images/areas/inwangsan.jpg',
      cardBg: '#E2F0D9',
      badge: 'together',
      searchHint: '인왕산',
      name: { ko: '인왕산 등산', en: 'Inwangsan Hike' },
      tagline: { ko: '쉬움~보통 · 약 2시간', en: 'Easy–moderate · ~2 hours' },
      intro: {
        ko: '도심 한가운데 있는 바위산. 정상에 오르면 경복궁과 서울 시내가 발 아래로 펼쳐져. 토요일에 우리랑 같이 올라갈 예정이야!',
        en: 'A rocky mountain right in the middle of the city. From the top, Gyeongbokgung and downtown Seoul spread out below you. We will hike it together on Saturday!',
      },
      tags: { ko: ['등산', '전망'], en: ['Hiking', 'Views'] },
      notice: { ko: '대부분 계단. 운동화와 물 챙기기', en: 'Mostly stairs. Wear sneakers and bring water' },
      howToGet: {
        ko: '3호선 을지로3가 → 경복궁 1번 출구 → 사직공원 지나 등산로 입구',
        en: 'Line 3 Euljiro 3-ga → Gyeongbokgung Exit 1 → past Sajik Park to the trailhead',
      },
    },
    {
      id: 'museum',
      emoji: '🏛️',
      image: 'images/areas/museum.jpg',
      cardBg: '#E4ECF7',
      searchHint: '용산',
      name: { ko: '이촌 국립중앙박물관', en: 'National Museum of Korea' },
      tagline: { ko: '한국 역사 한눈에 · 무료', en: 'Korean history in one place · Free' },
      intro: {
        ko: '한국에서 가장 큰 박물관. 선사시대부터 조선까지 한국 역사를 한 번에 볼 수 있고, 박물관 앞 연못과 정원도 산책하기 좋아.',
        en: "Korea's largest museum — Korean history from prehistoric times to the Joseon dynasty, plus a lovely pond and garden out front.",
      },
      tags: { ko: ['박물관', '실내', '무료'], en: ['Museum', 'Indoors', 'Free'] },
      notice: { ko: '상설전시는 무료. 1월 1일·설날·추석 당일은 휴관', en: 'Permanent exhibits are free. Closed Jan 1, Seollal and Chuseok' },
      howToGet: {
        ko: '3호선 을지로3가 → 충무로에서 4호선 환승 → 이촌 2번 출구, 지하 "박물관 나들길"로 연결 (약 25분)',
        en: 'Line 3 Euljiro 3-ga → transfer to Line 4 at Chungmuro → Ichon Exit 2, then the underground walkway to the museum (~25 min)',
      },
    },
    {
      id: 'hongdae',
      emoji: '🎸',
      image: 'images/areas/hongdae.jpg',
      cardBg: '#F6E3F0',
      searchHint: '홍대',
      name: { ko: '홍대', en: 'Hongdae' },
      tagline: { ko: '버스킹 · 젊음의 거리', en: 'Busking · Youthful streets' },
      intro: {
        ko: '대학가라 늘 젊고 활기찬 동네. 거리 공연, 개성 있는 가게, 카페가 가득하고 옆 연남동 경의선숲길은 산책하기 좋아.',
        en: 'A lively university neighborhood full of street performers, quirky shops and cafés. The Gyeongui Line Forest Park in next-door Yeonnam-dong is great for a stroll.',
      },
      tags: { ko: ['버스킹', '쇼핑', '카페'], en: ['Busking', 'Shopping', 'Cafés'] },
      notice: { ko: '홍대입구역 9번 출구 = 홍대 거리, 3번 출구 = 경의선숲길(연남동)', en: 'Hongik Univ. Stn. Exit 9 = Hongdae streets, Exit 3 = Gyeongui Line Forest Park' },
      howToGet: { ko: '2호선 을지로3가 → 홍대입구 (환승 없이 약 15분)', en: 'Line 2 Euljiro 3-ga → Hongik Univ. (no transfer, ~15 min)' },
    },
    {
      id: 'ttukseom',
      emoji: '🌊',
      image: 'images/areas/ttukseom.jpg',
      cardBg: '#DDEFF5',
      searchHint: '뚝섬한강공원',
      name: { ko: '자양 뚝섬한강공원', en: 'Ttukseom Hangang Park' },
      tagline: { ko: '한강 피크닉 · 노을', en: 'Han River picnic · Sunset' },
      intro: {
        ko: '한강 바로 옆 넓은 공원. 잔디밭에 앉아 강 보면서 쉬고, 편의점 라면도 먹고, 해 지면 다리에 불 켜지는 야경까지 보기 좋아.',
        en: 'A big park right on the Han River. Sit on the grass by the water, try convenience-store ramen, and stay for the bridges lighting up at night.',
      },
      tags: { ko: ['한강', '피크닉', '야경'], en: ['Han River', 'Picnic', 'Night view'] },
      notice: { ko: '해 질 무렵이 제일 예뻐요. 돗자리 챙기면 좋아요', en: 'Best around sunset. Bring a picnic mat if you can' },
      howToGet: {
        ko: '2호선 을지로3가 → 건대입구에서 7호선 환승 → 자양(뚝섬한강공원)역, 출구 나가면 바로 공원 (약 30분)',
        en: 'Line 2 Euljiro 3-ga → transfer to Line 7 at Konkuk Univ. → Jayang (Ttukseom Hangang Park) Stn., the park is right outside (~30 min)',
      },
    },
    {
      id: 'gangnam',
      emoji: '🛍️',
      image: 'images/areas/gangnam.png',
      cardBg: '#E3EEF9',
      searchHint: '강남',
      name: { ko: '강남', en: 'Gangnam' },
      tagline: { ko: '번화가 · 쇼핑', en: 'Downtown buzz · Shopping' },
      intro: {
        ko: '서울에서 제일 북적이는 번화가. 큰길 따라 가게, 카페, 식당이 줄지어 있어.',
        en: 'The busiest district in Seoul, lined with shops, cafés and restaurants.',
      },
      tags: { ko: ['쇼핑', '카페'], en: ['Shopping', 'Cafés'] },
      notice: { ko: '2호선은 순환선이라 방향 확인!', en: 'Line 2 is a loop — check the direction!' },
      howToGet: { ko: '2호선 을지로3가 → 강남 (약 30분)', en: 'Line 2 Euljiro 3-ga → Gangnam (~30 min)' },
    },
    {
      id: 'coex',
      emoji: '📚',
      image: 'images/areas/coex.png',
      cardBg: '#EDE6F7',
      searchHint: '삼성동',
      name: { ko: '삼성 코엑스', en: 'Samseong COEX' },
      tagline: { ko: '별마당도서관 · 봉은사', en: 'Starfield Library · Bongeunsa' },
      intro: {
        ko: '거대한 책장이 있는 별마당도서관과 길 건너 천년 고찰 봉은사. 현대와 전통이 바로 붙어 있는 곳.',
        en: 'The giant bookshelves of Starfield Library, and the thousand-year-old Bongeunsa Temple across the street.',
      },
      tags: { ko: ['도서관', '사찰', '실내'], en: ['Library', 'Temple', 'Indoors'] },
      notice: { ko: '별마당도서관은 무료!', en: 'Starfield Library is free!' },
      howToGet: { ko: '2호선 을지로3가 → 삼성 (약 35분), 5·6번 출구', en: 'Line 2 Euljiro 3-ga → Samseong (~35 min), Exit 5 or 6' },
    },
    {
      id: 'jamsil',
      emoji: '🗼',
      image: 'images/areas/jamsil.jpg',
      cardBg: '#DDF0E3',
      searchHint: '잠실',
      name: { ko: '잠실', en: 'Jamsil' },
      tagline: { ko: '롯데월드타워 · 석촌호수', en: 'Lotte World Tower · Seokchon Lake' },
      intro: {
        ko: '한국에서 제일 높은 롯데월드타워와 그 옆 석촌호수 산책길.',
        en: "Korea's tallest building, Lotte World Tower, and the walking path around Seokchon Lake.",
      },
      tags: { ko: ['전망대', '호수', '쇼핑'], en: ['Observatory', 'Lake', 'Shopping'] },
      notice: { ko: '해 질 무렵 타워 추천', en: 'Go up the tower around sunset' },
      howToGet: { ko: '2호선 을지로3가 → 잠실 (약 40분)', en: 'Line 2 Euljiro 3-ga → Jamsil (~40 min)' },
    },
    {
      id: 'gongneung',
      emoji: '🏡',
      image: 'images/areas/gongneung.png',
      cardBg: '#FFF3C4',
      badge: 'ours',
      searchHint: '공릉동',
      name: { ko: '소희 & Evan 동네', en: "Sohee & Evan's Neighborhood" },
      tagline: { ko: '공릉동 · 현지인처럼 하루', en: 'Gongneung-dong · A day like a local' },
      intro: {
        ko: '우리가 사는 동네! 관광지는 아니지만 진짜 서울 사람들의 하루를 볼 수 있어.',
        en: "Where we live! Not a tourist spot, but you'll see what an everyday Seoul day looks like.",
      },
      tags: { ko: ['동네', '현지'], en: ['Neighborhood', 'Local'] },
      // TODO(소희): 공릉동 가는 법 확정
      howToGet: {
        ko: '[확인 필요] 2호선 → 건대입구 → 7호선 공릉',
        en: '[TBD] Line 2 → Konkuk Univ. → Line 7 to Gongneung',
      },
    },
  ],

  /* ---------------- 소희의 추천 장소 ----------------
   * kind: 'eat'(먹기) | 'see'(구경) | 'walk'(걷기)
   * 아래는 화면 확인용 예시예요. 소희의 장소로 바꿔주세요!
   * ------------------------------------------------- */
  places: [
    // 명동
    { area: 'myeongdong', kind: 'eat', ll: [37.56384, 126.98505], name: { ko: '명동 길거리 노점', en: 'Myeongdong Street Food Stalls' }, photo: 'images/areas/myeongdong.jpg', note: { ko: '계란빵 · 어묵 · 호떡 · 떡볶이. 저녁에 명동길 따라 쭉 열려요', en: 'Egg bread, fish cakes, hotteok, tteokbokki — stalls line the main street in the evening' }, query: '명동길' },
    { area: 'myeongdong', kind: 'see', ll: [37.56316, 126.98716], name: { ko: '명동성당', en: 'Myeongdong Cathedral' }, photo: 'images/places/myeongdong-cathedral.jpg', note: { ko: '언덕 위 붉은 벽돌 고딕 성당. 잠깐 들러 조용히 쉬어가기', en: 'A red-brick Gothic cathedral on a small hill — a quiet break from the crowds' } },
    { area: 'myeongdong', kind: 'eat', ll: [37.56256, 126.9856], name: { ko: '명동교자 본점', en: 'Myeongdong Kyoja (Main)' }, photo: 'images/places/myeongdong-kyoja.jpg', note: { ko: '대표 메뉴: 칼국수 + 만두. 마늘 듬뿍 김치가 유명해요', en: 'Get the kalguksu (noodle soup) and dumplings. Famous for its garlicky kimchi' }, query: '명동교자 본점' },
    { area: 'myeongdong', kind: 'eat', ll: [37.56098, 126.98115], name: { ko: '신세계백화점 본점 지하 푸드홀', en: 'Shinsegae Dept. Store (Main) – B1 Food Hall' }, photo: 'images/places/shinsegae.jpg', note: { ko: '지하 1층 푸드홀. 비 오거나 추운 날 실내에서 이것저것 먹기 좋아요', en: 'Basement food hall — great for trying lots of things indoors on a rainy or cold day' }, query: '신세계백화점 본점' },
    { area: 'myeongdong', kind: 'eat', ll: [37.56468, 126.98085], name: { ko: '롯데백화점 본점 지하 푸드코트', en: 'Lotte Dept. Store (Main) – B1 Food Court' }, photo: 'images/places/lotte.jpg', note: { ko: '지하 1층 식품관 푸드코트. 한식부터 디저트까지 골고루', en: 'Basement food court — everything from Korean dishes to desserts' }, query: '롯데백화점 본점' },
    { area: 'myeongdong', kind: 'eat', ll: [37.55534, 126.98516], name: { ko: '목멱산방', en: 'Mokmyeoksanbang' }, photo: 'images/places/mokmyeoksanbang.jpg', note: { ko: '남산 아래 비빔밥 맛집. 깔끔한 한식 한 그릇', en: 'Bibimbap spot at the foot of Namsan — a clean, simple Korean meal' }, query: '목멱산방' },
    { area: 'myeongdong', kind: 'eat', ll: [37.55931, 126.98575], name: { ko: '벤자민 포케 엔 샐러드', en: 'Benjamin Poke & Salad' }, photo: 'images/places/benjamin-poke.jpg', note: { ko: '가볍게 먹고 싶은 날엔 포케 한 그릇', en: 'A poke bowl for when you want something light' }, query: '벤자민포케' },

    // 이촌 국립중앙박물관
    { area: 'museum', kind: 'see', ll: [37.52395, 126.98032], name: { ko: '국립중앙박물관', en: 'National Museum of Korea' }, photo: 'images/places/national-museum.jpg', note: { ko: '상설전시 무료. 반가사유상 두 점이 있는 "사유의 방"은 꼭 보기', en: 'Free permanent exhibits. Don’t miss the "Room of Quiet Contemplation" with the two pensive Buddha statues' } },
    { area: 'museum', kind: 'walk', ll: [37.52261, 126.97956], name: { ko: '거울못', en: 'Mirror Pond' }, photo: 'images/areas/museum.jpg', note: { ko: '박물관 앞 연못과 정자. 산책하며 사진 찍기 좋아요', en: 'The pond and pavilion in front of the museum — a nice photo stroll' }, query: '국립중앙박물관 거울못' },
    { area: 'museum', kind: 'walk', ll: [37.52269, 126.98353], name: { ko: '용산가족공원', en: 'Yongsan Family Park' }, note: { ko: '박물관 바로 옆 넓은 잔디 공원', en: 'A wide grassy park right next to the museum' } },

    // 홍대
    { area: 'hongdae', kind: 'walk', ll: [37.555, 126.9226], name: { ko: '홍대 걷고싶은거리', en: 'Hongdae Street' }, photo: 'images/places/hongdae-street.jpg', note: { ko: '저녁·주말이면 거리 공연(버스킹)이 열려요', en: 'Street performers (busking) in the evenings and on weekends' }, query: '홍대 걷고싶은거리' },
    { area: 'hongdae', kind: 'walk', ll: [37.56, 126.9245], name: { ko: '경의선숲길 (연남동)', en: 'Gyeongui Line Forest Park (Yeonnam)' }, note: { ko: '옛 기찻길이 공원이 된 산책로. 주변에 카페가 많아요', en: 'An old railway turned into a park, lined with cafés' }, query: '경의선숲길 연남동' },

    // 자양 뚝섬한강공원
    { area: 'ttukseom', kind: 'walk', ll: [37.52983, 127.06811], name: { ko: '뚝섬한강공원', en: 'Ttukseom Hangang Park' }, photo: 'images/areas/ttukseom.jpg', note: { ko: '강가 잔디밭에 앉아 쉬기. 해 지면 다리 야경이 예뻐요', en: 'Relax on the riverside grass; the bridges glow after sunset' } },
    { area: 'ttukseom', kind: 'eat', name: { ko: '한강 편의점 라면', en: 'Han River convenience-store ramen' }, note: { ko: '공원 편의점에서 즉석 라면 끓여서 강 보면서 먹기!', en: 'Cook instant ramen at the park convenience store and eat it by the river!' }, query: '뚝섬한강공원 편의점' },

    // 경복궁 주변
    { area: 'gyeongbokgung', kind: 'see', ll: [37.57975, 126.97668], name: { ko: '경복궁', en: 'Gyeongbokgung Palace' }, photo: 'images/places/gyeongbokgung.jpg', note: { ko: '(예시) 근정전 앞에서 사진 꼭!', en: 'Take a photo in front of Geunjeongjeon, the main throne hall!' } },
    { area: 'gyeongbokgung', kind: 'eat', ll: [37.57768, 126.97153], name: { ko: '토속촌 삼계탕', en: 'Tosokchon Samgyetang' }, photo: 'images/places/tosokchon.jpg', note: { ko: '(예시) 대표 메뉴: 삼계탕', en: 'Signature dish: samgyetang (ginseng chicken soup)' }, query: '토속촌 삼계탕 서촌' },
    { area: 'gyeongbokgung', kind: 'eat', ll: [37.58076, 126.97], name: { ko: '통인시장', en: 'Tongin Market' }, photo: 'images/places/tongin-market.jpg', note: { ko: '(예시) 엽전 도시락으로 반찬 골라 먹기', en: 'Buy old-style coins and use them to fill a lunchbox with side dishes' } },
    { area: 'gyeongbokgung', kind: 'walk', ll: [37.583, 126.9815], name: { ko: '삼청동길', en: 'Samcheong-dong Street' }, photo: 'images/places/samcheong-dong.jpg', note: { ko: '(예시) 국립현대미술관에서 북쪽으로 쭉', en: 'Walk north from the National Museum of Modern and Contemporary Art' } },

    // 남대문시장
    { area: 'namdaemun', kind: 'eat', ll: [37.55939, 126.97767], name: { ko: '남대문시장 갈치조림골목', en: 'Braised Cutlassfish Alley' }, photo: 'images/places/galchi-jorim.jpg', note: { ko: '(예시) 매콤한 갈치조림', en: 'Spicy braised cutlassfish' } },
    { area: 'namdaemun', kind: 'see', ll: [37.55999, 126.97536], name: { ko: '숭례문', en: 'Sungnyemun Gate' }, photo: 'images/places/sungnyemun.jpg', note: { ko: '(예시) 시장 가는 길에 들르기', en: 'Stop by on your way to the market' } },

    // 삼성 코엑스
    { area: 'coex', kind: 'see', ll: [37.51006, 127.06016], name: { ko: '별마당도서관', en: 'Starfield Library' }, photo: 'images/areas/coex.png', note: { ko: '(예시) 거대한 책장 앞에서 사진', en: 'Take a photo in front of the giant bookshelves' } },
    { area: 'coex', kind: 'walk', ll: [37.5147, 127.0575], name: { ko: '봉은사', en: 'Bongeunsa Temple' }, photo: 'images/places/bongeunsa.jpg', note: { ko: '(예시) 조용히 한 바퀴', en: 'Take a quiet walk around the temple' } },

    // 잠실
    { area: 'jamsil', kind: 'see', ll: [37.51255, 127.10268], name: { ko: '서울스카이', en: 'Seoul Sky' }, photo: 'images/places/seoul-sky.jpg', note: { ko: '(예시) 해 질 녘 예약 추천', en: 'Book a sunset time slot' }, query: '서울스카이 롯데월드타워' },
    { area: 'jamsil', kind: 'walk', ll: [37.51009, 127.10408], name: { ko: '석촌호수', en: 'Seokchon Lake' }, photo: 'images/places/seokchon-lake.jpg', note: { ko: '(예시) 호수 한 바퀴 약 40분', en: 'About 40 minutes to walk around the lake' } },

    // 낙산공원
    { area: 'naksan', kind: 'walk', ll: [37.58053, 127.00761], name: { ko: '낙산공원', en: 'Naksan Park' }, photo: 'images/areas/naksan.jpg', note: { ko: '(예시) 성곽 따라 노을 보기', en: 'Watch the sunset along the fortress wall' } },
    { area: 'naksan', kind: 'see', ll: [37.5786, 127.0063], name: { ko: '이화벽화마을', en: 'Ihwa Mural Village' }, photo: 'images/places/ihwa-mural-village.jpg', note: { ko: '(예시) 주민들이 사는 곳이니 조용히', en: 'People live here, so please keep it quiet' } },
    { area: 'naksan', kind: 'walk', ll: [37.58051, 127.00284], name: { ko: '마로니에공원', en: 'Marronnier Park' }, note: { ko: '대학로 한가운데 공원. 거리 공연과 소극장 구경하기 좋아요', en: 'A park in the heart of Daehangno — street performances and small theaters all around' }, query: '마로니에공원 대학로' },
    { area: 'naksan', kind: 'eat', ll: [37.5818701, 127.0001999], name: { ko: '오이지 대학로', en: 'Oiji Daehangno' }, note: { ko: '한식. 명란 치즈 순두부, 차돌 들기름 국수', en: 'Korean food — pollock-roe cheese soft tofu stew, brisket perilla-oil noodles' }, naverUrl: 'https://naver.me/F42Mv52Z', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%EC%98%A4%EC%9D%B4%EC%A7%80%20%EB%8C%80%ED%95%99%EB%A1%9C%20%EC%84%9C%EC%9A%B8%20%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EB%8C%80%ED%95%99%EB%A1%9C9%EA%B8%B8%2033' },
    { area: 'naksan', kind: 'eat', ll: [37.5927768, 126.9982112], name: { ko: '문화식당', en: 'Munhwa Sikdang' }, note: { ko: '혜화역 근처 양식 레스토랑 (2·3층)', en: 'Western-style restaurant near Hyehwa Station (2nd–3rd floor)' }, naverUrl: 'https://naver.me/FjbnBNtA', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%EB%AC%B8%ED%99%94%EC%8B%9D%EB%8B%B9%20%EC%84%9C%EC%9A%B8%20%EC%84%B1%EB%B6%81%EA%B5%AC%20%ED%98%9C%ED%99%94%EB%A1%9C%2088' },
    { area: 'naksan', kind: 'see', ll: [37.5889418, 127.00645], name: { ko: '성북동 엽서가게', en: 'Seongbuk-dong Postcard Shop' }, note: { ko: '예쁜 엽서 구경하고 기념으로 하나씩 사기 좋은 작은 가게', en: 'A tiny shop full of pretty postcards — perfect for a souvenir' }, naverUrl: 'https://naver.me/FFGMSkKM', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%EC%84%B1%EB%B6%81%EB%8F%99%20%EC%97%BD%EC%84%9C%EA%B0%80%EA%B2%8C%20%EC%84%9C%EC%9A%B8%20%EC%84%B1%EB%B6%81%EA%B5%AC%20%EB%8F%99%EC%86%8C%EB%AC%B8%EB%A1%9C3%EA%B8%B8%203' },
    { area: 'naksan', kind: 'eat', ll: [37.6437493, 127.0038848], name: { ko: '몽브루', en: 'Mongbru' }, note: { ko: '카페 · 디저트 (강북구 4.19로, 낙산공원에서는 조금 멀어요)', en: 'Café & desserts (in Gangbuk-gu, a bit far from Naksan Park)' }, naverUrl: 'https://naver.me/GoD7q633', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%EB%AA%BD%EB%B8%8C%EB%A3%A8%20%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%B6%81%EA%B5%AC%204.19%EB%A1%9C%20105' },

    // 인왕산
    { area: 'inwangsan', kind: 'walk', ll: [37.585, 126.95788], name: { ko: '인왕산 정상', en: 'Inwangsan Summit' }, photo: 'images/areas/inwangsan.jpg', note: { ko: '(예시) 정상에서 경복궁 내려다보기', en: 'Look down on Gyeongbokgung from the summit' } },

    // 공릉동
    { area: 'gongneung', kind: 'walk', ll: [37.62389, 127.09118], name: { ko: '경춘선숲길', en: 'Gyeongchun Line Forest Trail' }, photo: 'images/areas/gongneung.png', note: { ko: '(예시) 옛 기찻길 따라 산책', en: 'Stroll along the old railway line' } },
    { area: 'gongneung', kind: 'walk', ll: [37.6317305, 127.0686996], name: { ko: '경춘숲공원', en: 'Gyeongchun Forest Park' }, note: { ko: '경춘선숲길 옆 동네 공원. 가볍게 산책하기 좋아요', en: 'A neighborhood park by the Gyeongchun Line Forest Trail — nice for an easy walk' }, naverUrl: 'https://naver.me/G38uM6BG', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%EA%B2%BD%EC%B6%98%EC%88%B2%EA%B3%B5%EC%9B%90%20%EC%84%9C%EC%9A%B8%20%EB%85%B8%EC%9B%90%EA%B5%AC' },
    { area: 'gongneung', kind: 'see', ll: [37.6375707, 127.0596673], name: { ko: '노원두물마루', en: 'Nowon Dumulmaru Observatory' }, note: { ko: '중랑천 옆 전망대. 강과 동네 풍경을 한눈에', en: 'An observation deck by Jungnangcheon stream, with views over the water and neighborhood' }, naverUrl: 'https://naver.me/5LHCrFrq', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%EB%85%B8%EC%9B%90%EB%91%90%EB%AC%BC%EB%A7%88%EB%A3%A8%20%EC%84%9C%EC%9A%B8%20%EB%85%B8%EC%9B%90%EA%B5%AC' },
    { area: 'gongneung', kind: 'eat', ll: [37.6264779, 127.0764035], name: { ko: '마카모예 브레드바', en: 'Macamoye Bread Bar' }, photo: 'images/places/macamoye.jpg', note: { ko: '베이커리 카페. 잠봉뵈르, 어니언 대파 크림치즈 베이글', en: 'Bakery café — jambon-beurre, onion & scallion cream-cheese bagel' }, naverUrl: 'https://naver.me/FafyFmUu', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%EB%A7%88%EC%B9%B4%EB%AA%A8%EC%98%88%20%EB%B8%8C%EB%A0%88%EB%93%9C%EB%B0%94%20%EC%84%9C%EC%9A%B8%20%EB%85%B8%EC%9B%90%EA%B5%AC%20%EB%8F%99%EC%9D%BC%EB%A1%9C190%EA%B8%B8%2061' },
    { area: 'gongneung', kind: 'eat', ll: [37.6258014, 127.0770655], name: { ko: '무이로 커피', en: 'Muiro Coffee' }, note: { ko: '카페 · 디저트. 자몽 파블로바, 제철 과일 디저트', en: 'Café & desserts — grapefruit pavlova, seasonal fruit desserts' }, naverUrl: 'https://naver.me/FXwGhUSk', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%EB%AC%B4%EC%9D%B4%EB%A1%9C%20%EC%BB%A4%ED%94%BC%20%EC%84%9C%EC%9A%B8%20%EB%85%B8%EC%9B%90%EA%B5%AC%20%EB%8F%99%EC%9D%BC%EB%A1%9C186%EA%B8%B8%2077-7' },
    { area: 'gongneung', kind: 'eat', ll: [37.6246588, 127.0769436], name: { ko: '나이브', en: 'Naive' }, note: { ko: '양식. 핑거 텐더(치킨 텐더)', en: 'Western food — chicken finger tenders' }, naverUrl: 'https://naver.me/FzSZoqdk', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%EB%82%98%EC%9D%B4%EB%B8%8C%20NAIVE%20%EC%84%9C%EC%9A%B8%20%EB%85%B8%EC%9B%90%EA%B5%AC%20%EB%8F%99%EC%9D%BC%EB%A1%9C184%EA%B8%B8%2061' },
    { area: 'gongneung', kind: 'eat', ll: [37.6252595, 127.0716898], name: { ko: '휴돈정', en: 'Hyudonjeong' }, note: { ko: '돈가스. 상로스카츠, 로스카츠, 히레카츠', en: 'Tonkatsu — premium pork loin, loin and tenderloin cutlets' }, naverUrl: 'https://naver.me/GYC9USbw', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%ED%9C%B4%EB%8F%88%EC%A0%95%20%EC%84%9C%EC%9A%B8%20%EB%85%B8%EC%9B%90%EA%B5%AC%20%EB%8F%99%EC%9D%BC%EB%A1%9C191%EA%B0%80%EA%B8%B8%206' },
    { area: 'gongneung', kind: 'eat', ll: [37.655494, 127.0810204], name: { ko: '카페포레스트', en: 'Cafe Forest' }, note: { ko: '카페. 아메리카노, 카페라떼, 아인슈페너 (중계동 쪽, 공릉역에서 조금 멀어요)', en: 'Café — americano, latte, einspänner (in Junggye-dong, a bit north of Gongneung)' }, naverUrl: 'https://naver.me/51386Frw', googleUrl: 'https://www.google.com/maps/search/?api=1&query=%EC%B9%B4%ED%8E%98%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8%20%EC%84%9C%EC%9A%B8%20%EB%85%B8%EC%9B%90%EA%B5%AC%20%ED%95%9C%EA%B8%80%EB%B9%84%EC%84%9D%EB%A1%9C12%EA%B8%B8%2051-49' },
  ],

  /* ---------------- 필수 정보 ---------------- */
  emergency: [
    { num: '112', label: { ko: '경찰', en: 'Police' } },
    { num: '119', label: { ko: '구급차 · 화재', en: 'Ambulance · Fire' } },
    { num: '1330', label: { ko: '관광통역 안내 (영어, 24시간)', en: 'Tourist hotline (English, 24h)' } },
  ],

  airport: [
    {
      title: { ko: '공항버스 6015 (짐 많을 때 추천)', en: 'Airport Bus 6015 (best with luggage)' },
      meta: { ko: '약 70~80분 · 17,000원', en: '~70–80 min · ₩17,000' },
      desc: {
        ko: '1층 승차장 5B 부근 → 을지로2가 하차 → 도보. T1 막차 약 23시. 현장 안내판으로 승차 위치 확인!',
        en: 'Near stop 5B on 1F → get off at Euljiro 2-ga → walk. Last bus from T1 ~11 pm. Check the signs on site!',
      },
    },
    {
      title: { ko: '공항철도 + 지하철 (가장 저렴)', en: 'AREX + Subway (cheapest)' },
      meta: { ko: '약 90분 · 수천 원', en: '~90 min · a few thousand won' },
      desc: {
        ko: 'T-money 구입 → 공항철도 일반열차 → 홍대입구 → 2호선 → 을지로3가 1번 출구',
        en: 'Buy a T-money card → AREX All-stop train → Hongik Univ. → Line 2 → Euljiro 3-ga Exit 1',
      },
    },
    {
      title: { ko: '택시', en: 'Taxi' },
      meta: { ko: '약 70분 · 가장 비쌈', en: '~70 min · most expensive' },
      desc: {
        ko: '공식 택시 승차장 또는 Kakao T. 택시 카드 보여주기',
        en: 'Official taxi stand or Kakao T. Show the taxi card',
      },
    },
  ],

  tips: [
    {
      art: 'escalator', // 손그림 일러스트 (app.js의 TIP_ART)
      title: { ko: '에스컬레이터', en: 'Escalators' },
      desc: { ko: '오른쪽은 서는 줄, 왼쪽은 걷는 줄. (공식 권장은 두 줄 서기지만 실제로는 대부분 오른쪽에 섬)', en: 'Stand on the right, walk on the left. (Officially you should stand on both sides, but most people stand on the right.)' },
    },
    {
      art: 'rush',
      title: { ko: '붐비는 시간', en: 'Rush hour' },
      desc: { ko: '오전 8~9시, 오후 6~7시 전후 지하철은 매우 붐벼요. 그래도 이때는 버스·택시가 더 느려요.', en: 'Around 8–9 am and 6–7 pm the subway is packed — but buses and taxis are even slower then.' },
    },
    {
      art: 'bus',
      title: { ko: '버스', en: 'Buses' },
      desc: { ko: '탈 때도, 내릴 때도 카드 찍기. 안 찍으면 환승 할인 없음.', en: "Tap your card when getting on AND off, or you won't get the transfer discount." },
    },
    {
      art: 'transfer',
      title: { ko: '환승', en: 'Transfers' },
      desc: { ko: '내린 뒤 30분 안에 타면 환승 할인, 최대 4번 갈아타기. 밤 9시~아침 7시는 60분.', en: 'Transfer within 30 min for a discount, up to 4 times. 60 min between 9 pm and 7 am.' },
    },
    {
      art: 'fare',
      title: { ko: '요금', en: 'Fares' },
      desc: { ko: '교통카드 기준 지하철 1,550원, 버스 1,500원. 거리가 길면 100원씩 추가. 1~8호선 발매기에서 해외 Visa·Mastercard 결제 가능 (수수료 3.7%).', en: 'With a transit card: subway ₩1,550, bus ₩1,500, +₩100 for longer rides. Ticket machines on Lines 1–8 accept foreign Visa/Mastercard (3.7% fee).' },
    },
  ],

  apps: [
    { name: { ko: '네이버 지도', en: 'Naver Map' }, desc: { ko: '설정에서 영어로 바꾸기', en: 'Switch to English in settings' } },
    { name: { ko: 'Kakao T', en: 'Kakao T' }, desc: { ko: '택시 부르기', en: 'Call a taxi' } },
    { name: { ko: 'Papago', en: 'Papago' }, desc: { ko: '번역', en: 'Translation' } },
  ],

  /* ---------------- 환율 계산기 (하단 탭) ----------------
   * 열 때마다 open.er-api.com 에서 최신 환율을 받아오고, 인터넷이 안 되면 fallbackRate 를 써요.
   * ------------------------------------------------------ */
  fx: {
    fallbackRate: 1344, // 1 USD = ? KRW (2026-11-03 기준)
    fallbackDate: '2026-11-03',
    quick: [1000, 5000, 10000, 50000],
    examples: [
      { art: 'subway', name: { ko: '지하철 1회', en: 'Subway ride' }, krw: 1550 },
      { art: 'bus', name: { ko: '버스 1회', en: 'Bus ride' }, krw: 1500 },
      { art: 'plane', name: { ko: '공항버스 6015', en: 'Airport bus 6015' }, krw: 17000 },
    ],
  },

  /* ---------------- Simple Korean (하단 탭) ----------------
   * ko: 한글 / rom: 영어식 발음 / en: 뜻. 🔊 버튼을 누르면 휴대폰이 한국어로 읽어줘요.
   * -------------------------------------------------------- */
  phrases: [
    {
      title: { ko: '기본 인사', en: 'Basics' },
      items: [
        { ko: '안녕하세요', rom: 'annyeong-haseyo', en: 'Hello' },
        { ko: '감사합니다', rom: 'gamsa-hamnida', en: 'Thank you' },
        { ko: '네 / 아니요', rom: 'ne / aniyo', en: 'Yes / No' },
        { ko: '죄송합니다', rom: 'joesong-hamnida', en: "I'm sorry" },
        { ko: '저기요', rom: 'jeogiyo', en: 'Excuse me (to get attention)' },
        { ko: '괜찮아요', rom: 'gwaenchanayo', en: "It's okay / I'm fine" },
      ],
    },
    {
      title: { ko: '식당에서', en: 'At a restaurant' },
      items: [
        { ko: '이거 주세요', rom: 'igeo juseyo', en: 'This one, please' },
        { ko: '두 개 주세요', rom: 'du gae juseyo', en: 'Two, please' },
        { ko: '물 주세요', rom: 'mul juseyo', en: 'Water, please' },
        { ko: '안 맵게 해 주세요', rom: 'an maepge hae juseyo', en: 'Not spicy, please' },
        { ko: '맛있어요!', rom: 'masisseoyo', en: "It's delicious!" },
        { ko: '계산해 주세요', rom: 'gyesanhae juseyo', en: 'The bill, please' },
      ],
    },
    {
      title: { ko: '쇼핑할 때', en: 'Shopping' },
      items: [
        { ko: '얼마예요?', rom: 'eolma-yeyo?', en: 'How much is it?' },
        { ko: '카드 돼요?', rom: 'kadeu dwaeyo?', en: 'Can I pay by card?' },
        { ko: '봉투 주세요', rom: 'bongtu juseyo', en: 'A bag, please' },
        { ko: '그냥 볼게요', rom: 'geunyang bolgeyo', en: "I'm just looking" },
      ],
    },
    {
      title: { ko: '이동할 때', en: 'Getting around' },
      items: [
        { ko: '화장실 어디예요?', rom: 'hwajangsil eodi-yeyo?', en: 'Where is the restroom?' },
        { ko: '여기서 세워 주세요', rom: 'yeogiseo sewo juseyo', en: 'Please stop here (taxi)' },
        { ko: '영어 하세요?', rom: 'yeong-eo haseyo?', en: 'Do you speak English?' },
        { ko: '도와주세요', rom: 'dowa-juseyo', en: 'Please help me' },
      ],
    },
  ],

  /* ---------------- 지역 사진 출처 (Wikimedia Commons) ----------------
   * 화면에는 표시하지 않는 기록용 목록. 사진을 바꾸면 여기서도 지워주세요.
   * ------------------------------------------------------------------ */
  photoCredits: [
    { area: 'gyeongbokgung', artist: 'Brady Bellini', license: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Gyeongbokgung(palace)_Geunjeongjeon(hall).jpg' },
    { area: 'namdaemun', artist: 'Sgroey', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Namdaemun_shopping_street_2.jpg' },
    { area: 'jamsil', artist: 'kallerna', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Lotte_World_morning_view_8.jpg' },
    { area: 'naksan', artist: 'Marsilar', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:02025_Park_Naksan,_Seoul.jpg' },
    { area: 'inwangsan', artist: 'Rtflakfizer', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Seoul_Fortress_Wall,_Inwangsan.3.jpg' },
    { area: 'gongneung', artist: 'Integral', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Korail_Hwarangdae_Station.jpg' },
    { file: 'areas/myeongdong.jpg', artist: 'Sgroey', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Myeongdong_night_market_seoul_4.jpg' },
    { file: 'places/myeongdong-cathedral.jpg', artist: 'kallerna', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Myeongdong_Cathedral_6.jpg' },
    { file: 'places/myeongdong-kyoja.jpg', artist: 'Mobius6', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Kalguksu_20230430_002.jpg' },
    { file: 'places/mokmyeoksanbang.jpg', artist: 'Chloe Lim', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Bibimbap_7.jpg' },
    { file: 'snacks/gyeranppang.jpg', artist: 'tragrpx', license: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Gyeranppang_(egg_bread)_(Seoul_street_food).jpg' },
    { file: 'snacks/hotteok.jpg', artist: 'Sandra Vallaure', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Hotteok_2.jpg' },
    { file: 'snacks/eomuk.jpg', artist: '최광모 (Choe Kwangmo)', license: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Eomuk-kkochi.jpg' },
    // 아래 3장은 임시 사진. 같은 파일 이름으로 덮어쓰면 교체돼요
    { file: 'places/shinsegae.jpg', artist: 'Abasaa', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Shinsegae_Department_Store_Main_Store_at_night_01.JPG' },
    { file: 'places/lotte.jpg', artist: '서울연구원', license: 'CC BY 4.0', url: 'https://commons.wikimedia.org/wiki/File:Night_view_of_Euljiro_1-ga_intersection_and_the_Sogong-dong_Lotte_town.jpg' },
    { file: 'places/benjamin-poke.jpg', artist: 'Andy Li', license: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Salmon_Poke_Bowl_(S)_with_Spicy_mayo_sauce_-_Kitokito.jpg' },
    { file: 'areas/ttukseom.jpg', artist: 'Real rism', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:NIght_view_at_Ttukseom_Hangang_Park.jpg' },
    { file: 'areas/museum.jpg', artist: 'Jinah78', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Front_view_of_national_museum_of_korea.jpg' },
    { file: 'places/national-museum.jpg', artist: 'Ethan Doyle White', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Exterior_of_the_National_Museum_of_Korea_in_Seoul.jpg' },
    { file: 'areas/hongdae.jpg', artist: 'lumoplank', license: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Hongdae,_Seoul-_Part_II_-_Hongdae2237.jpg' },
    { file: 'places/hongdae-street.jpg', artist: 'Minseong Kim', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Hongdae_Street.jpg' },
  ],
};
