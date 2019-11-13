# PBADA-SPA 제작의도 
1. 손쉬운 SPA(게시판, 회원가입, UI/UX, 자동화테스트, 가이드) 기본적 세팅하기 위함.

## FrontEnd 구성
[Node.js](https://nodejs.org/)와 
[React](https://reactjs.org/) 리액트 라이브러리를 이용하고 JSX문법을 사용하여 HTML을 그려주며, CSS는 [Sass(SCSS)](https://sass-lang.com/) 전처리 도구를 이용합니다.
자바스크립트는(ES6)를 [Babel](https://www.npmjs.com/package/@babel/core)사용 하여 트랜스파일링 합니다.

## BackEnd 구성
[mgdb atlas](https://www.mongodb.com/cloud/atlas)를 사용하여 스키마 및 간단한 데이터 Update, Modify, Delete, Remove 처리를 합니다.
서버리스(JSON) NOSQL의 장점을 최대한 활용.
Cloud.

## 사용 방법

spa, frontend, backend 해당 폴더에 들어가 $ npm install을 진행하여 필요한 페키지를 다운받습니다.

다운이 완료된후 $ cd spa 부모페이지로 돌아와 
$ npm start 서버를 실행합니다.

```bash
$ npm install # 디펜던시 인스톨
$ npm start #개발모드 웹 서버 실행
```

## Directory Structure
* **backend** - 스키마 및 mgdb atlas 계정정보, 데이터 Update, Modify, Delete, Remove 소스
    * node_moddules - backend에서 사용되는 모듈
* **frontend** - UI/UX 개발 소스
    * node_moddules - frontend에서 사용되는 모듈
    * src - 소스 파일
        * images - UI 이미지
        * styles - CSS Preprocessor(SCSS) 소스
        * views - 뷰 소스
 * **node_moddules** - 웹서버에 사용되는 모듈