# Nature Front-end
React   
Redux / Toolkit   
Webpack + Babel  
Netlify
## Available Scripts
`
    "start": "react-scripts start",  
    "start:prod": "env-cmd -f .env.production react-scripts start",  
    "build": "env-cmd -f .env.production react-scripts build",  
    "build:dev": "env-cmd -f .env.local react-scripts build",  
    "test": "react-scripts test",  
    "eject": "react-scripts eject",  
    "dev": "webpack serve --mode=development",  
    "prod": "webpack serve --mode=production",  
    "dev:build": "webpack --mode=development",  
    "prod:build": "webpack --mode=production"  
`
### 서버 구동  ( 버그 확인 필요할때 )
로컬 API : `npm start`  
production API test : `npm run start:prod`
### 웹 서버 배포를 위한 빌드 ( 버그 확인 필요할때 )
production API 빌드 : `npm run build`  
로컬 API 빌드 : `npm run build:dev`
### webpack 서버 구동
development : `npm run dev`  
production : `npm run prod`
### 웹 서버 배포를 위한 webpack 빌드
development : `npm run dev:build`  
production : `npm run prod:build`  

## documentation
### Axios documentation
https://axios-http.com/kr/docs/intro

### webpack documentation
https://webpack.kr/configuration