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

&ensp; 프론트앱의 디자인 작업이 거의 완료됐습니다. 이제 백과의 데이터 통신만을 남겨두고 있는 상태입니다. 거기까지는 아직 시간이 걸릴 것 같으니, 시험 삼아 배포만이라도 해볼까 합니다. S3, EBS, EC2 중에 무엇으로 앱을 배포할지 고민이 됩니다. 각 서비의 특징을 간략하게 정리한 뒤에 결정하도록 하겠습니다.
(실제 서비스 런칭시에는 ECR에 도커 이미지를 등록하고, ECS에 컨테이너를 적재할 예정입니다.)

---

## ✅ Not S3

- S3는 정적 콘텐츠 처리를 위한 서비스
- S3는 정적 웹사이트를 배포할 때에 적합하며, EC2로 배포할 때에 비해 서버 비용을 절감할 수 있음
- Express는 SSR이며, 퍼그 템플릿 엔진 역시 서버 사이드로 HTML을 동적 처리
- 즉, Express + Pug 앱은 동적 웹사이트이며, S3로 배포하려면 이를 정적으로 변환할 필요가 있음
- **But Why?**

<br/>

## ✅ EC2 vs EBS

- 동적 웹사이트를 배포할 때는 EC2나 EBS 둘 중 하나를 선택
- EC2
  - 클라우드 컴퓨터를 제공
  - 개발자는 제공된 컴퓨터가 가진 리소스 내에서 원하는 대로 설정을 변경하고, 스케일링할 수 있음
  - **앱 구조가 복잡하거나, 커스터마이징 인프라를 구축해야 할 때**
- EBS
  - PaaS
  - 프로비저닝, 로드 밸런싱, 헬스 체크 등을 자동 수행
  - **설정이나 인프라 구축을 간소화하고 모듈이나 앱의 개발•운영에 집중하고 싶을 때**
- 요약
  - 앱의 런타임에 대한 보다 많은 권한이 필요하다면 EC2를, 배포 과정을 간소화하고 싶다면 EBS를 사용

&ensp; 간단히 웹 호스팅만 해볼 생각이므로, **EBS**를 사용하여 앱을 배포해보겠습니다.

<br/>

## ✅ PM2 셋업

### PM2란?

&ensp; 프론트 앱 배포에 앞서 PM2를 설치하겠습니다. PM은 패키지 매니저의 약어로, 패키지는 기능을 갖는 일련의 코드 모음이며, 앱 역시 패키지라 할 수 있습니다. PM2는 Node.js 앱을 무중단 서비스로 제공할 수 있습니다. 혹여 오류가 발생하여 앱이 다운되더라도, PM2가 곧바로 이를 감지하여 앱을 재실행시킵니다.

### PM2 셋업

&ensp; Node.js 앱은 JS 파일을 수정할 때마다 앱을 재실행해야 합니다. 개발할 때에 이런 번거로움을 노드몬이 해결해줬었는데, 실제 배포할 때는 PM2의 감시 기능을 사용할 것이 권장된다고 합니다. PM2에 파일시스템 모니터링 기능이 있는 이상, 노드몬을 사용할 필요가 없게 되는 것이다.

&ensp; PM2의 모니터링 기능을 사용하기 위해 다음과 같이 *package.json*의 `script`에 실행 명령어를 작성했습니다.

```js
  "scripts": {
    "babel-node": "babel-node --presets='@babel/preset-env' --ignore='foo|bar|bas'",
    "dev": "nodemon --exec babel-node app.js",
    "start": "pm2 start ./bin/www --interpreter babel-node --watch ",
    "stop": "pm2 stop ./bin/www",
    "delete": "pm2 delete ./bin/www",
  },
```

- `babel-node` - ES6 문법을 사용하고 있으므로, 컴파일러 옵션에 `babel-node`를 지정하여 앱을 실행
- `dev` - 개발 단계에서는 노드몬에 파일 시스템 모니터링을 일임
- `start` - 배포 단계에서는 PM2에 입 실행 및 파일 시스템 모니터링을 일임
  - `script`가 아닌, 터미널에서 PM2를 통해 앱을 실행시키고자 할 때는 `babel-node`의 설치 경로를 명시해야 합니다.
  - ex) `pm2 start ./bin/www --interpreter ./node_modules/@babel/node/bin/babel-node.js`

&ensp; 현재는 PM2를 로컬에서 전역으로 설치했기 때문에 `pm2`로 PM2를 실행할 수 있습니다. 하지만 EBS에서는 전역으로 설치하지 않을 예정이므로, `pm2`를 `./node_modules/pm2/bin/pm2-runtime`으로 변경해야 합니다.

### PM2로 실행하기

&ensp; 셋업을 완료했으니, `npm run start` 명령어를 입력하여 PM2로 앱을 실행하고, 로그를 확인하겠습니다.

```zsh
npm run start
pm2 logs
```

&ensp; 로그 출력 결과는 다음과 같습니다.

```zsh
/home/recona97/.pm2/logs/www-out.log last 15 lines:
0|www      | Server listening on http://127.0.0.1:4000 ✅
0|www      | GET / 200 190.206 ms - 12556
```

&ensp; 앱이 잘 실행됐음을 확인할 수 있습니다.

### PM2 기본 명령어

```zsh
pm2 start app.js --name myApp # 프로세스 명명

pm2 list # PM2가 관리하는 프로세스 목록 출력
pm2 prettylist # 프로세스 목록을 Beautified JSON 형식으로 출력
pm2 monit # 콘솔에서 모니터링 대시보드 실행

pm2 logs # 모든 프로세스의 로그를 출력
pm2 flush # 모든 로그 파일들을 제거

pm2 restart processName # 해당 프로세스 재실행; processName 대신 all을 입력하면 모든 프로세스를 재실행
pm2 stop processName
pm2 delete processName
```

<br/>

## ✅ EB CLI 셋업

### EB CLI 실행을 위한 필수 조건

&ensp; 로컬 터미널에서 EB CLI를 실행하기 위해서는 몇 가지 필수 조건들이 있습니다. 다음의 문서를 참조하세요.

- [Prerequisites for deploying an express application to Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html)

### EB 환경 실행

1. `eb init` - 로컬 저장소에 EB 실행 환경 조성

- ex) `eb init --platform node.js --region ap-northeast-2`
- 옵션으로 플랫폼과 지역을 지정
- 실행하고 나면 루트 경로에 _.elasticbeanstalk_ 폴더가 생성되며, 폴더 안에는 _config.yaml_ 파일이 있음

&ensp; `eb init --platform node.js --region ap-northeast-2` 실행 결과 &rarr;

```zsh
Application yourfan-frontend has been created.
```

2. `eb create` - 로드 밸런싱된 EB 클라우드 환경 실행

- ex) `eb create --sample yourfan-frontend`
- 구체적으로 EC2 인스턴스, 보안 그룹, 로드 밸런서, 오토 스켈링 등 앱 배포에 필요한 클라우드 환경을 자동 조성
- `--sample` - 실제 앱을 배포하지 않고, AWS에서 제공하는 샘플 앱을 배포하여 EB 환경을 테스트할 수 있음

&ensp; `eb create --sample yourfan-frontend` 실행 결과 &rarr;

```zsh
...
2023-06-12 08:58:31    INFO    Instance deployment: You didn't specify a Node.js version in the 'package.json' file in your source bundle. The deployment didn't install a specific Node.js version.
2023-06-12 08:58:35    INFO    Instance deployment completed successfully.
2023-06-12 08:58:50    INFO    Application available at yourfan-frontend.eba-pmv45qms.ap-northeast-2.elasticbeanstalk.com.
2023-06-12 08:58:50    INFO    Successfully launched environment: yourfan-frontend
```

&ensp; 성공적으로 EB 환경이 런칭된 것을 확인할 수 있습니다. 하지만 *package.json*에 Node.js 버전을 명시하지 않은 것이 마음에 걸립니다. 버전을 명시하고 다시 EB 환경을 런치하겠습니다. *package.json*에 `engines`를 추가하고, `npm`과 `node`의 버전을 명시합니다.

```js
// package.json
{
  ...
  "engines": {
    "npm": "9.6.7", //"npm":">=8.0.0 < 9.0.0",
    "node": "18.16.0" //"node": ">=18.0.0 <18.16.0"
  },
  ...
}
```

&ensp; 버전을 범위로 명시하면, 명시하지 않았을 때와 마찬가지로 노드 버전이 명시되지 않았다는 문구가 출력됩니다. 그래서 구체적으로 명시하여 진행하겠습니다.

3. `eb terminate` - `eb init`으로 생성 및 실행된 환경을 종료시킴

- ex) `eb terminate yourfan-frontend`

&ensp; `eb terminate yourfan-frontend` 실행 결과 &rarr;

```zsh
2023-06-12 09:34:25    INFO    terminateEnvironment completed successfully.
```

&ensp; 다시 `eb create`로 EB 환경을 실행합니다.

### EB 환경에 자기 앱 배포

&ensp; 현재는 EB 환경에 AWS에 제공하는 샘플 애플리케이션이 실행되고 있는 상태입니다. 이제 자기 앱이 실행되게끔 업데이트해야 합니다.

1. `npm install --save pm2` - npm 모듈로 `pm2` 설치하기

- [공식 문서](https://pm2.keymetrics.io/docs/tutorials/use-pm2-with-aws-elastic-beanstalk/)는 npm 모듈로 `pm2`를 설치할 것을 권장
- npm 모듈로 설치하게 되면 *package.json*의 `script`에 모듈의 설치 경로를 명시해야 함

```js
"scripts": {
  "babel-node": "babel-node --presets='@babel/preset-env' --ignore='foo|bar|bas'",
  "dev": "nodemon --exec babel-node app.js",
  "start": "./node_modules/pm2/bin/pm2 start ./bin/www --interpreter babel-node --watch ", // 변경 전 | "start": "pm2 start ./bin/www --interpreter babel-node --watch ",
  "stop": "./node_modules/pm2/bin/pm2 stop ./bin/www",  // 변경 전 | "stop": "pm2 stop ./bin/www",
  "delete": "./node_modules/pm2/bin/pm2 delete ./bin/www", // 변경 전 | "delete": "pm2 delete ./bin/www",
  "list": "./node_modules/pm2/bin/pm2 list",
},
```

**출처**

[Deploying an Express application to Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html)

[PM2 IN ELASTICBEANSTALK](https://pm2.keymetrics.io/docs/tutorials/use-pm2-with-aws-elastic-beanstalk/)
