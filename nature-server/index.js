const express = require('express')
const app = express()
const http = require("http"); // node 기본모듈
const cors = require('cors')
const bodyParser = require("body-parser");
const multer = require('multer');
const fileupload = require('express-fileupload');
/* const socketIO = require("socket.io"); */
const indexRouter = require('./routes');
const server = http.createServer(app);
const PORT = process.env.PORT || 8081

process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development';

if (process.env.NODE_ENV == 'production') {
  process.env.WEB_DOMAIM = process.env.WEB_DOMAIM_PRODUCTION;
}
console.log('process.env.WEB_DOMAIM', process.env.WEB_DOMAIM);
const corsOptions = {
  origin: [process.env.WEB_DOMAIM, 'https://api.openai.com', 'https://api.openai.com:443'], // '*'
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(bodyParser.json()); // for parsing application/json responses
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded responses

// built-in middleware for json
app.use(express.json());

// server static files
/* app.use(express.static('uploads'));
 *//* app.use(fileupload({
debug: true,
}));  */// file upload formData
/**
 * Multer 미들웨어는 파일 업로드를 위해 사용되는 multipart/form-data에서 사용된다.
 * 다른 폼으로 데이터를 전송하면 적용이 안된다.
 * Header의 명시해서 보내주는게 좋다.
 * */
//파일 업로드 미들웨어
/* app.use(multer({
  dest: __dirname + '/uploads/', // 이미지 업로드 경로
}).any()); */
app.use(multer().any());

// 전체 router 설정
app.use('/', indexRouter);

// 500 server error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('서버 에러가 발생 했습니다.')
})
/* 
const io = socketIO(server); // socket 서버 실행
io.on("connection", (socket) => {
  console.log('클라이언트와 socket 연결되었습니다.');
}); */

server.keepAliveTimeout = 60 * 1000
server.listen(PORT, () => {
  console.log(`Nature Server listening on port ${PORT}`)
})