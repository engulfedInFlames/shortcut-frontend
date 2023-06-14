## 명령어

- `npm init` => venv + [requirements.txt]
- `npm init -y`
- `npm install` - node_modules = venv
- `npm i`

- 패키지 설치
  - `pip install package-name` => `npm i package-name`

## 패키지 설명

- babel
  : 최신 JS 문법 컴파일러
- nodemon
  : 프로젝트 변경 사항 감지
- morgan
  : request log 출력

## 기술

- CI/CD
- 캐싱: Redis
- 비동기 처리: Celery Worker / Redis 메세지 브로커 설정 <= 콜백으로 처리하기
- 웹소켓(django-channels) : daphne(with K8s) or uvicorn <= 뭘 사용할지 고민

# 깃 컨벤션

- prefix
  - add: 파일 추가
  - update: 파일 수정
  - refact: 리팩토링
  - fix: 버그 수정
  - feat: 기능 추가
  - enhan: 기능 강화
  - art: 코드 클린업
- 커밋 이력 관리
  - `revert`, `reset` 사용하기
  - 신중하게 커밋•푸쉬하기
