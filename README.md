# 우리집 비상 비축 — 배포 가이드

Google 로그인으로 각자 자기 기록(체크, 보유 수량, 구매 링크·가격)을 저장하는 앱입니다.
화면은 GitHub Pages, 로그인과 데이터는 Firebase를 씁니다.

## 파일 구성

| 파일 | 역할 |
|---|---|
| `index.html` | 앱 전체 (화면 + 물품 데이터 + 로그인·저장 코드) |
| `manifest.json` | 휴대폰 홈 화면에 앱으로 설치할 때 쓰는 정보 |
| `sw.js` | 오프라인에서도 앱 화면이 열리게 해 주는 파일 |
| `icon.svg` | 앱 아이콘 |
| `firestore.rules` | Firestore 보안 규칙 (GitHub에는 안 올려도 됨, Firebase 콘솔에 붙여넣기) |

## 1. Firebase 프로젝트 만들기 (처음 한 번)

학교 데이터(daniel-amatz)와 섞이지 않도록 **새 프로젝트**를 만드는 것을 권장합니다.

1. https://console.firebase.google.com → **프로젝트 추가** → 이름 예: `emergency-stock`
2. **빌드 → Authentication → 시작하기 → 로그인 방법 → Google** 사용 설정 → 지원 이메일 선택 → 저장
3. **빌드 → Firestore Database → 데이터베이스 만들기** → 위치 `asia-northeast3 (서울)` → **프로덕션 모드**
4. Firestore **규칙** 탭 → 내용을 전부 지우고 `firestore.rules` 내용을 붙여넣기 → **게시**
5. **프로젝트 설정(톱니바퀴) → 일반 → 내 앱 → 웹(</>)** → 앱 이름 입력 → 등록
6. 화면에 나오는 `firebaseConfig` 값을 복사

## 2. index.html에 설정값 넣기

emergency-stock 프로젝트 설정값이 이미 들어 있습니다. 다른 프로젝트로 옮길 때만 `firebaseConfig`를 바꾸세요.
(이 값은 공개되어도 괜찮은 값입니다. 데이터 보호는 보안 규칙이 합니다.)

## 3. GitHub Pages에 올리기

1. GitHub에서 새 저장소 생성 (예: `emergency-stock`, Public)
2. **Add file → Upload files** → `index.html`, `manifest.json`, `sw.js`, `icon.svg` 끌어다 놓기 → Commit
3. **Settings → Pages → Branch: main / (root)** → Save
4. 몇 분 뒤 `https://artist4rhythm-hub.github.io/emergency-stock/` 주소가 생깁니다

## 4. 로그인 허용 도메인 추가 (안 하면 로그인 실패)

Firebase 콘솔 → **Authentication → 설정 → 승인된 도메인 → 도메인 추가** → `artist4rhythm-hub.github.io`

## 5. 수정할 때

- `index.html`을 고쳐 다시 올린 뒤, `sw.js`의 `const CACHE = 'ebx-v1'` 숫자를 `v2`, `v3`…로 올려서 같이 올리세요.
  그래야 이미 설치한 사람들 기기에도 새 화면이 반영됩니다.

## 출시 전 체크

- [ ] 개인정보처리방침 페이지 (Google 로그인으로 이름·이메일·프로필 사진을 받음)
- [ ] 이용약관·면책 문구 (일반 참고용, 실제 상황에서는 정부 안내 우선)
- [ ] Firebase 요금제: 무료(Spark)로 시작, 사용자가 늘면 사용량 확인
- [ ] 여러 기기·브라우저(아이폰 사파리, 안드로이드 크롬, PC)에서 로그인 테스트
