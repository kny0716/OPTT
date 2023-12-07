var express = require("express");
var cors = require("cors");
const multer = require("multer");
const uuid4 = require("uuid4");
const path = require("path");
const publicPath = path.join(__dirname, "public");
const user = require("./user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const port = 8080;
const app = express();
module.exports = app;

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      const randomID = uuid4();
      const ext = path.extname(file.originalname);
      const filename = randomID + ext;
      done(null, filename);
    },
    destination(req, file, done) {
      done(null, path.join(__dirname, "files"));
    },
  }),
  limits: { fileSize: 1024 * 1024 },
});

const uploadMiddleware = upload.single("myFile"); // input의 name 속성이 myFile, formDate의 key
app.use(uploadMiddleware);

// app.use(cors({
//   origin: 'https://your-client-domain.com', // 특정 도메인만 허용
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

// 구글 소셜 로그인
passport.use(
  new GoogleStrategy(
    {
      clientID: "your_client_id",
      clientSecret: "your_client_secret",
      callbackURL: "your_callback_url",
    },
    (accessToken, refreshToken, profile, done) => {
      // 로그인 처리
    }
  )
);

// 모든 요청 처리
app.use(cors());
app.options("*", cors()); // OPTIONS 메서드에 대한 CORS 허용 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.use(passport.initialize()); // passport 초기화

// auth
app.post("/login", user.login);
app.post("/register", user.register);
app.post("/logout", user.logout);

// user
app.post("/user", cors(), user.user);
app.post("/user/result", user.result);
app.post("/profile", uploadMiddleware, user.profile);

// stats
app.get("/stats", user.total);

// comments
app.post("/comments", user.list);
app.post("/comment/create", user.create);
app.post("/comment/update", user.update);
app.delete("/comment/delete", user.delete);

// likes
app.post("/like", user.like);
app.post("/unlike", user.unlike);

// 서버 실행
app.listen(port, (err) => {
  if (err) {
    console.error("서버 시작 실패:", err);
  } else {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
  }
});
