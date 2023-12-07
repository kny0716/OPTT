var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nabong0716!",
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
        connection.query("UPDATE user SET token = 1 WHERE username = ?", [
          username,
        ]);
        res.send({
          msg: "로그인 성공",
          token: results[0].token,
          result: results[0],
        });
        res.end();
      } else {
        res.send({ msg: "로그인 실패", token: results[0].token });
        res.end();
      }
    }
  );
};

// 회원가입
exports.register = (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM user WHERE username = ? ",
    [username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.send({ msg: "이미 아이디가 존재합니다." });
        res.end();
      } else {
        connection.query(
          "INSERT INTO user (username, password) VALUES(?,?)",
          [username, password],
          function (error) {
            if (error) {
              res.send({ msg: "회원가입 실패!" });
              res.end();
            } else {
              res.send({ msg: "회원가입 성공!" });
              res.end();
            }
          }
        );
      }
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
        res.send({ msg: "로그아웃 성공", token: results[0].token });
        res.end();
      } else {
        res.send({ msg: "로그아웃 실패", token: results[0].token });
        res.end();
      }
    }
  );
};

// 사용자 정보
exports.user = (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.send({
          msg: "사용자 정보",
          results: results[0],
        });
        res.end();
      } else {
        res.send({ msg: "사용자 정보 없음", results: results });
        res.end();
      }
    }
  );
};

// 프로필 업로드
exports.profile = (req, res, next) => {
  console.log("시작");
  const { username } = req.body;
  const file = req.file;
  console.log(file);
  if (file) {
    res.send({ msg: "프로필 업로드 성공", url: file.filename });
    res.end();
  }
};

// 설문조사 결과
exports.result = (req, res) => {
  const { username, result } = req.body;
  if (username) {
    connection.query(
      "SELECT result FROM user WHERE username=?",
      [username],
      function (error, results, fields) {
        if (results.length <= 0) {
          connection.query("UPDATE stats SET total_users+=1");
        }
        connection.query(
          "UPDATE user SET result=? WHERE username=?",
          [result, username],
          function (error, results, fields) {
            if (error) {
              res.send({ msg: "결과 저장 실패" });
              res.end();
            } else {
              res.send({ msg: "결과 저장 성공" });
              res.end();
            }
          }
        );
      }
    );
  } else {
    connection.query("UPDATE stats SET total_users=total_users+1");
    res.send({ msg: "비로그인 사용자 +1" });
    res.end();
  }
};

// 총 사용자 수 불러오기
exports.total = (req, res) => {
  const { username } = req.body;
  connection.query(
    "SELECT total_users FROM stats",
    function (error, results, fields) {
      if (error) {
        res.send({ msg: "사용자 수를 불러오는데 실패" });
        res.end();
      } else {
        res.send({ msg: `사용자 수 ${results}`, num: results });
      }
    }
  );
};

// 댓글 불러오기
exports.list = (req, res) => {
  const username = req.body;
  console.log("시작");
  connection.query("SELECT * FROM comments", function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    if (results.length > 0) {
      console.log("시작222");
      res.send({ msg: "불러오기 성공", lists: results });
      res.end();
    } else {
      res.send({ msg: "불러오기 실패", lists: results });
      res.end();
    }
  });
};

// 댓글 쓰기 - 시간은 나중에
exports.create = (req, res) => {
  const { username, comment } = req.body;
  connection.query(
    "INSERT INTO comments (comment, username) VALUES (?, ?)",
    [comment, username],
    function (error, results, fields) {
      if (error) throw error;
      else {
        res.send({ msg: "성공" });
        res.end();
      }
    }
  );
};

// 댓글 수정
exports.update = (req, res) => {
  const { username, comment_id, comment } = req.body;
  connection.query(
    "UPDATE comments SET comment=? WHERE username=? AND comment_id=?",
    [comment, username, comment_id],
    function (error, results, fields) {
      if (error) {
        res.send({ msg: "댓글이 수정되지 않았습니다." });
        res.end();
      } else {
        res.send({ msg: "업데이트 성공" });
        res.end();
      }
    }
  );
};

// 댓글 삭제
exports.delete = (req, res) => {
  const { comment_id } = req.body;
  connection.query(
    "DELETE FROM comments WHERE comment_id=?",
    [comment_id],
    function (error, results, fields) {
      if (error) {
        res.send({ msg: "삭제되지 않았습니다" });
        res.end();
      } else {
        res.send({ msg: "삭제 성공" });
        res.end();
      }
    }
  );
};

// 좋아요
exports.like = (req, res) => {
  const { comment_id, likes } = req.body;
  connection.query(
    "UPDATE comments SET likes=?+1 WHERE comment_id=?",
    [likes, comment_id],
    function (error, results, fields) {
      if (error) {
        res.send({ msg: "다시 시도해주세요" });
        res.end();
      } else {
        res.send({ msg: "좋아요 성공" });
        res.end();
      }
    }
  );
};

// 좋아요 취소
exports.unlike = (req, res) => {
  const { comment_id, likes } = req.body;
  connection.query(
    "UPDATE comments SET likes=?-1 WHERE comment_id= ?",
    [likes, comment_id],
    function (error, results, fields) {
      if (error) {
        res.send({ msg: "다시 시도해주세요" });
        res.end();
      } else {
        res.send({ msg: "좋아요 취소 성공" });
        res.end();
      }
    }
  );
};
