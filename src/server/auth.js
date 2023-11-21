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

// 로그인
exports.login = (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.send({ msg: "로그인 성공", token: 1 });
        connection.query("UPDATE user SET token = 1 WHERE username = ?", [
          username,
        ]);
        res.end();
      } else {
        res.send({ msg: "로그인 실패", token: 0 });
        res.end();
      }
    }
  );
};

// 회원가입
exports.register = (req, res) => {
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
          if (error) {
            res.send({ msg: "회원가입 실패!" });
          } else {
            res.send({ msg: "회원가입 성공!" });
          }
        }
      );
      res.end();
    }
  );
};

// 로그아웃
exports.logout = (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        connection.query("UPDATE user SET token = 0 WHERE username = ?", [
          username,
        ]);
        res.send({ msg: "로그아웃 성공", token: 0 });
        res.end();
      } else {
        res.send({ msg: "로그아웃 실패", token: 1 });
        res.end();
      }
    }
  );
};
