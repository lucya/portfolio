const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RemoveConsolePlugin = require('remove-console-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


const config = ({ isDev }) => ({
  // name: 'nature-web',
  mode: isDev ? 'development' : 'production',
  devtool: 'eval', //속도 빠르게
  target: 'web',// Webpack v5 버그(Live Reload 문제) 해결
  resolve: {// 번들링 할 파일 확장자
    extensions: ['.js', '.jsx'],
  },
  entry: { //여러 개의 모듈로 연결된 파일의 시작점 (ex. ./src/index.js)                                                                                                                                                  
    main: './src/index',
    // app: ['./client'], 
    // 입력, 파일을 입력하는 곳이라고 보면 된다. 배열로 입력
  },
  output: {
    path: path.join(__dirname, 'dist'), // __dirname은 현재폴더라는 뜻
    publicPath: '/',
    filename: '[name].js', //[name].js로 설정할 시, entry에서 설정한 key 값이 파일명으로 설정된다.main.js
    // filename: 'app.js',//app.js 한개의 파일로 여러개 파일을 하나로 합친다
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif|ico)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          // limit: 5000,
          mimetype: 'image/png',
        },

        // use: ["file-loader"],
        // use: [
        //   {
        //     loader: "file-loader",
        //   },
        // ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules',  // loader를 배제시킬 파일 명시
        loader: "babel-loader",   // 사용할 loader es6 > es5 변환 (transpiler),webpack과 babel 을 이어주는 녀석
        options: {
          presets: [
            ['@babel/preset-env', { targets: { esmodules: true, browsers: ['> 5% in KR', 'last 2 chrome versions'] } }],
            ['@babel/preset-react', { "runtime": "automatic" }].filter(Boolean),
          ],
          plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
        },
      },
      {
        test: /\.css$/,
        exclude: '/node_modules',
        // css-loader: css를 js처럼 사용할 수 있도록 처리, style-loader : js로 처리된 스타일시트 코드를 html에 적용
        // use에 선언된 가장 오른쪽의 로더가 먼저 실행 (오른쪽에서 왼쪽 순으로)
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.html$/i,
      //   loader: "html-loader",
      //   options: {
      //     sources: {
      //       list: [
      //         {
      //           tag: "link",
      //           attribute: "href",
      //           type: "src",
      //         },
      //       ],
      //     },
      //   },
      // },
    ],
  },
  // webpack 서버 설정
  devServer: {
    static: path.join(__dirname, "dist"), // 빌드 결과물의 path
    // publicPath: '/',				// 브라우저에서 접근하는 path. (기본값: '/')
    port: 3000, 				// 개발서버 포트 (기본값: 8080)
    historyApiFallback: true,			// 404 응답 시 index.html로 리다이렉트
    open: true,
    hot: true, // 핫 모듈 교체(HMR) 활성화설정
    liveReload: true,

    proxy: {
      '/': isDev ? 'http://localhost:8080' : 'https://port-0-node-express-3zspi2nlgczjhds.sel3.cloudtype.app',		// 프론트 단에서 CORS 에러 해결하는 방법
    },
  },
  watchOptions: {
    poll: true,
    ignored: '/node_modules/',
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('v0.1.0'),
    }),
    new CleanWebpackPlugin(),// output.path 디렉토리에 있는 이전에 빌드된 결과물 삭제
    new Dotenv({
      path: isDev ? './.env.local' : './.env.production', // Path to .env file (this is the default)
      safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
    // 분리된 css, js 파일들을 각각 html에 link 자동화
    new HtmlWebpackPlugin({
      template: `./public/index.html`,
      hash: true,
      favicon: "public/favicon.ico",
    }),
    isDev && new ReactRefreshWebpackPlugin(),
    // new RemoveConsolePlugin({ include: ['log', 'warn'] }),
  ].filter(Boolean),
});

module.exports = (env, argv) => config({ isDev: argv.mode === 'development' });