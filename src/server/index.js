var express = require("express");
var cors = require("cors");
const multer = require("multer");
const uuid4 = require("uuid4");
const path = require("path");
const publicPath = path.join(__dirname, "public");
const user = require("./user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var axios = require("axios");

const port = 8080;
const app = express();
module.exports = app;

app.set("port", process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, "OPTT/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/OPTT/index.html"));
});

// app.use(cors({
//   origin: 'https://your-client-domain.com', // 특정 도메인만 허용
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

// 구글 소셜 로그인
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "240613383820-is61ts08q1if74vopesi9pn61ca7aqji.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
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

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, cb) {
      const randomID = uuid4();
      const ext = path.extname(file.originalname);
      const filename = randomID + ext;
      cb(null, filename);
    },
    destination(req, file, cb) {
      cb(null, path.join(__dirname, "public/uploads"));
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB로 설정된 제한
});

// auth
app.post("/login", user.login);
app.post("/register", user.register);
app.post("/logout", user.logout);
app.get("/api/auth/kakao", user.kakao);

// user
app.post("/user", cors(), user.user);
app.post("/user/result", user.result);
app.post("/profile", upload.single("file"), user.profile);

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

// Google login route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // 여기에서 로그인 성공 후 리다이렉션 또는 응답을 처리합니다.
    res.redirect("/");
  }
);

// Google token validation and user creation route
app.post("/api/google-login", async (req, res) => {
  const { tokenId } = req.body;

  // Google 토큰을 Google에 확인 요청
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`
    );
    const { sub, email, name, picture } = response.data;

    // 여기에서 사용자 정보를 처리하거나 데이터베이스에 저장합니다.
    // 예를 들어, 사용자 정보를 응답으로 클라이언트에게 보낼 수 있습니다.
    res.json({ userId: sub, email, name, picture });
  } catch (error) {
    console.error("Google 토큰 확인에 실패했습니다.", error);
    res.status(500).send("Internal Server Error");
  }
});

// 서버 실행
app.listen(port, (err) => {
  if (err) {
    console.error("서버 시작 실패:", err);
  } else {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
  }
});
