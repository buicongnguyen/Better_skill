## 먼저 수정할 매개변수
PROJECT_FOLDER: 현재 선택한 게임 폴더
AGENT: Codex
MODEL: GPT-6 Astra
GITHUB_OWNER: [YOUR_ACCOUNT]
REPOSITORY: signal-garden
PUBLISH: YES
VERCEL_SCOPE: [YOUR_VERCEL_SCOPE]

## 선택지와 일관성
- AGENT: Codex 또는 Claude Code를 선택하세요.
  전송 전에 해당 앱에서 MODEL을 선택하고 Claude Code에는 사용 가능한 Claude 모델을 쓰세요.
  이 줄은 실제 모델을 바꾸거나 도구 권한을 부여하지 않습니다.
- PROJECT_FOLDER에서만 작업하세요.
  실제 도구와 관련 프로젝트 지침을 확인하고 중요한 불일치는 의존 작업 전에 해결하세요.
- PUBLISH: YES는 아래 설명한 공개 저장소/소스와 배포를 승인하고, NO는 로컬 출시 준비만 뜻합니다.
  공개 전에 모든 대상 자리표시자를 해결하세요.
  GITHUB_OWNER와 REPOSITORY는 소스 저장소에 사용하세요.
  게임 URL과 기준 경로에는 선택한 Vercel 프로젝트의 실제 도메인과 배포 경로를 사용하세요.

## 목표
PUBLISH에 따라 이 게임을 Vercel Hobby 출시용으로 준비하거나 공개하세요.

## 작업과 제약
- 위 GITHUB_OWNER와 REPOSITORY 값을 사용하고 외부 공개 전에 자리표시자를 해결하세요.
- 실제 저장소, 브랜치, 원격, 의도한 diff, 비밀 제외, 에셋 라이선스를 확인하세요.
  무관한 작업을 보존하고 충돌하는 원격을 교체하거나 강제 푸시하지 마세요.
- 기존 엔진을 유지하세요.
  Vite/Three.js는 설치·빌드 명령과 dist 출력을 확인하세요.
  Godot는 설치 버전, 웹 내보내기 지원, 실제 출력 디렉터리를 확인하고 생성된 파일명을 유지하세요.
  공개 전에 정적 빌드가 작동하는지 검증하세요.
- 프로젝트 연결 전에 VERCEL_SCOPE를 해결하세요.
  기존 Vercel 연결을 확인하고 대상 충돌은 덮어쓰지 말고 보고하세요.
- 이 개인·비상업 게임이 현재 제한에서 Hobby에 적합한지 확인하고 서비스 구매나 업그레이드는 하지 마세요.
- 도메인 루트의 Vite 배포에는 base / 를 쓰세요.
  선택한 엔진의 실제 빌드 명령과 출력 디렉터리를 확인하고 모든 엔진이 dist를 쓴다고 가정하지 마세요.
  Vercel 구성을 준비하세요.
- PUBLISH가 YES이면 명시한 공개 GitHub 저장소가 없을 때 생성하고, 검토한 게임의 의도한 파일을 커밋·푸시하며 선택한 호스트에 공개 배포하도록 승인합니다.
  PUBLISH가 NO이면 로컬 준비 후 멈추고 남은 출시 단계를 보고하세요.
- YES이면 VERCEL_SCOPE에서 인증된 Vercel CLI 또는 Git 가져오기를 쓰세요.
  필요하면 브라우저 로그인이나 저장소 접근을 안내하되 채팅으로 비밀을 요청하지 마세요.
- 배포 리비전과 로그인 없는 공개 플레이를 확인하세요.
  실제 할당된 프로덕션 URL과 실행하지 못한 검사를 보고하세요.

## 완료 조건
PUBLISH=NO: 검증한 로컬 출시 패키지와 남은 단계.

PUBLISH=YES: 검토한 커밋, 일치하는 성공 배포, 공개 URL, 실제 검증 기록.

완료할 수 없으면 구체적인 차단 요인을 보고하세요.
