var express = require("express");
var cors = require("cors");
var auth = require("./auth");

const port = 8080;
const app = express();
module.exports = app;

// 모든 요청 처리
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth
app.post("/login", auth.login);
app.post("/register", auth.register);
app.post("/logout", auth.logout);

// user
app.get("/user", auth.user);
// app.get("/user/image", user.profile);

// 서버 실행
app.listen(port, (err) => {
  if (err) {
    console.error("서버 시작 실패:", err);
  } else {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
  }
});
