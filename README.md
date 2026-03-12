# 도미노피자 재고·발주 자동화

팀 비밀번호로 보호되는 재고 입력·분석·발주 이메일 생성 웹 앱입니다.

## 배포 (Vercel)

1. [Vercel](https://vercel.com)에 로그인 후 **Import** → GitHub 저장소 `liszzmword/20260312` 선택
2. **Environment Variables**에 추가:
   - `TEAM_PASSWORD` = 팀에서 사용할 비밀번호
3. **Deploy** 실행

배포된 URL에 접속하면 비밀번호 입력 화면이 나오고, 올바른 비밀번호 입력 시 재고 입력 화면이 열립니다.

## 사용 방법

1. 팀 비밀번호 입력 후 **입장**
2. 재고 입력 (현재재고, 안전재고, MOQ, 거래처, 이메일 등)
3. **분석 실행** → 부족 품목·발주 권장 수량 확인
4. **이메일 보내기** 클릭 → 메일 프로그램에서 발송

## 로컬에서 확인

- Vercel CLI: `npx vercel` 후 `TEAM_PASSWORD`를 Vercel 대시보드 또는 `vercel env add TEAM_PASSWORD`로 설정
- 또는 `index.html`을 브라우저에서 직접 열면 비밀번호 없이 사용 가능 (API 미연동 시 로그인은 실패하므로, 로그인 화면에서 입장만 테스트하려면 개발자도구에서 `sessionStorage.setItem('domino_inventory_auth','ok')` 후 새로고침)

## 저장소

- GitHub: https://github.com/liszzmword/20260312
