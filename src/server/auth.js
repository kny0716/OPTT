var express = require("express");
var session = require("express-session");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ckdmsdn330!!",
  database: "optt",
});

const port = 8080;
const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
  } else {
    console.log("MySQL 연결 성공!");
  }
});

// 모든 요청 처리
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 로그인
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        req.data.token = 1;
        console.log("로그인 성공!");
        res.end();
      } else {
        console.log("로그인 실패!");
        //response.send('Incorrect Username and/or Password!');
        res.data.token = 0;
        res.end();
      }
    }
  );
});

// 회원가입
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    function (error, results, fields) {
      if (error) throw error;
      connection.query(
        "INSERT INTO user (username, password) VALUES(?,?)",
        [username, password],
        function (error, data) {
          if (error) console.log(error);
          else console.log(data);
        }
      );
      console.log("회원가입 성공!");
      res.end();
    }
  );
});

// 사용자 정보
app.get("/user", (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT nickname, profile, result FROM user WHERE username = ? AND password = ? LIMIT 1",
    [username, password],
    function (error, results, fields) {
      if (error) throw error;

      res.data.nickname = results.nickname;
      res.data.profile = results.profile;
      res.data.result = results.result;
      console.log("사용자 정보", results);
      res.end();
    }
  );
});

//

// 서버 실행
app.listen(port, () => {
  console.log("Server is running on port 8080");
});
