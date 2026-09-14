## 먼저 수정할 매개변수
PROJECT_FOLDER: 현재 선택한 게임 폴더
AGENT: Codex
MODEL: GPT-6 Astra
ENGINE: AUTO
OS: AUTO (Windows / macOS / Linux)
SHELL: AUTO (PowerShell / bash / zsh)

## 선택지와 일관성
- AGENT: Codex 또는 Claude Code를 선택하세요.
  전송 전에 해당 앱에서 MODEL을 선택하고 Claude Code에는 사용 가능한 Claude 모델을 쓰세요.
  이 줄은 실제 모델을 바꾸거나 도구 권한을 부여하지 않습니다.
- PROJECT_FOLDER에서만 작업하세요.
  실제 도구와 관련 프로젝트 지침을 확인하고 중요한 불일치는 의존 작업 전에 해결하세요.
- ENGINE: AUTO는 기존 엔진을 유지하고, 없으면 THREE(TypeScript/Vite/Three.js)와 GODOT(Godot/GDScript 웹 내보내기) 선택지를 보고합니다.
  하나만 선택하세요.
  값 변경이 기존 프로젝트 이식을 승인하지는 않습니다.

## 목표
선택한 프로젝트 폴더를 수정 없이 점검하세요.

## 작업과 제약
- ENGINE=THREE이면 Node.js/npm을, GODOT이면 편집기와 웹 내보내기 템플릿을 확인하세요.
  AUTO는 기존 엔진이나 사용 가능한 선택지를 보고하며 설치하지 않습니다.
  OS/SHELL이 AUTO이면 실제 환경을 사용하고 모든 설정 단계는 선택한 엔진에 맞추세요.
- 절대 경로, 기존 파일, Git 루트/브랜치/상태, 민감 정보를 제거한 원격 URL, Git·GitHub CLI·Node.js·npm 사용 가능 여부를 보고하세요.
- 런타임을 프로젝트 요구 사항과 대조하세요.
- 토큰, 개인 키, 환경 변수 값을 표시하지 않고 GitHub 인증 상태를 확인하세요.
- 도구 누락, 로그인 누락, 권한 오류를 구분하세요.
- 빈 폴더라면 명시하고 package 스크립트를 지어내지 마세요.
- 선택한 엔진으로 로컬 게임 개발을 준비하는 가장 짧은 OS별 절차를 제시하세요.
- 이번 점검에서는 설치, Git 초기화, 커밋, 푸시, 배포를 하지 마세요.

## 완료 조건
정확한 환경 보고와 남은 최소 설정 단계이며 파일이나 계정 설정은 바뀌지 않습니다.
