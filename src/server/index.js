var express = require("express");
var cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
var user = require("./user");
const path = require("path");
const publicPath = path.join(__dirname, "public");

const port = 8080;
const app = express();
module.exports = app;

// 모든 요청 처리
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

// auth
app.post("/login", user.login);
app.post("/register", user.register);
app.post("/logout", user.logout);

// user
app.post("/user", user.user);
app.post("/user/result", user.result);

// stats
app.post("/stats", user.total);

// comments
app.post("/comments", user.list);
app.post("/comment/create", user.create);
app.post("/comment/update", user.update);
app.post("/comment/delete", user.delete);

// likes
app.post("/like", user.like);
app.post("/unlike", user.unlike);

// profile upload
app.post("/profile", upload.single("profile"), (req, res, next) => {
  const { username } = req.body;
  const file = req.file;
  console.log(file);
});

// 서버 실행
app.listen(port, (err) => {
  if (err) {
    console.error("서버 시작 실패:", err);
  } else {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
  }
});
