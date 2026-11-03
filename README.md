# Avery의 서울

Avery를 위한 서울 여행 가이드. 빌드 없는 정적 사이트(HTML/CSS/JS)예요.

## 열어보기
`index.html`을 더블클릭하면 브라우저에서 열려요.
휴대폰 크기로 보려면 크롬 개발자도구(F12) → 기기 툴바(Ctrl+Shift+M)에서 390px로 맞추면 돼요.

## 내용 고치기 — `data.js`만 수정
- **장소 추가**: `places` 배열에 한 줄씩 추가
  ```js
  { area: 'namdaemun', kind: 'eat', name: { ko: '가게 이름', en: '' }, note: { ko: '한 줄 추천', en: '' },
    naverUrl: 'https://naver.me/...', googleUrl: 'https://maps.app.goo.gl/...' },
  ```
  - `kind`: `eat`(먹기) / `see`(구경) / `walk`(걷기)
  - 지도 링크를 비워두면 "한글 이름 + 지역 검색어"로 검색 링크가 자동으로 만들어져요.
    검색이 엉뚱하게 나오면 `query: '토속촌 삼계탕 서촌'`처럼 검색어를 직접 넣어주세요.
  - 사진은 `images/places/` 에 넣고 `photo: 'images/places/파일이름.jpg'` → 카드 왼쪽에 정사각형으로 보여요.
    비워두면 지역 이모지가 대신 보여요. (지금 사진은 Wikimedia Commons 예시)
  - **지도 핀**: `ll: [위도, 경도]`를 넣으면 지역 화면의 "추천 장소 지도"에 핀이 꽂혀요. 없으면 핀만 빠져요.
    구글 지도에서 장소를 꾹 누르면 위에 `37.57975, 126.97668` 같은 숫자가 나오니 그대로 복사하세요.
    (지도: MapLibre + OpenFreeMap — API 키 없음. 색은 `app.js`의 `MAP_COLORS`에서 바꿔요)
- **지역 대표 사진**: `images/areas/{지역id}.jpg` (지금은 Wikimedia Commons 사진). 바꾸려면 같은 이름으로 덮어쓰거나 `data.js`의 `image` 경로를 수정하세요. 파일이 없으면 이모지가 대신 보여요.
- **영어**: 각 `en` 칸을 채우면 우측 상단 `한/EN` 버튼으로 바꿔 볼 수 있어요. 비어 있으면 한글이 보여요.

## 남은 TODO (`data.js`에서 `TODO` 검색)
- 웰컴 한 줄 메시지, WhatsApp 번호, 공릉동 가는 법
- `(예시)`로 표시된 장소들을 소희의 장소로 교체

## 배포
폴더 통째로 GitHub Pages / Vercel / Netlify Drop에 올리면 끝.
