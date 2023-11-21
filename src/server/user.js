const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ckdmsdn330!!",
  database: "optt",
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
  } else {
    console.log("MySQL 연결 성공!");
  }
});

// 사용자 정보
exports.user = (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT nickname, profile, result FROM user WHERE username = ? AND password = ? LIMIT 1",
    [username, password],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.send({
          msg: "사용자 정보",
          nickname: res.data.nickname,
          profile: res.data.profile,
          result: res.data.result,
        });
      } else {
        res.send({ msg: "사용자 정보 없음" });
      }
      res.end();
    }
  );
};
