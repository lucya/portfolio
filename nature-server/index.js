const express = require('express')
const http = require("http"); // node 기본모듈
const app = express()
const server = http.createServer(app);
const cors = require('cors')
const bodyParser = require("body-parser");

/* const socketIO = require("socket.io"); */
const indexRouter = require('./routes');
// const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 8081

const corsOptions = {
  origin: [process.env.WEB_ORIGIN], // '*'
  credential: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));


// 전체 router 설정
app.use('/', indexRouter);

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
/* 
const io = socketIO(server); // socket 서버 실행
io.on("connection", (socket) => {
  console.log('클라이언트와 socket 연결되었습니다.');
}); */



server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})