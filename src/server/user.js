var mysql = require("mysql");
var Axios = require("axios");

var connection = mysql.createConnection({
  host: "database-1.c7l3lp7npccg.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "ckdmsdn330!!",
  database: "optt",
  port: "3306",
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
        res.send({ msg: "로그인 실패", token: results[0] });
        res.end();
      }
    }
  );
};

// // 소셜 로그인 - 카카오
// exports.kakao = async (req, res) => {
//   const code = req.query.code;
//   try {
//     // Access token 가져오기
//     const res1 = await Axios.post(
//       "https://kauth.kakao.com/oauth/token",
//       {},
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         params: {
//           grant_type: "authorization_code",
//           client_id: CONFIG.KAKAO.RESTAPIKEY,
//           code,
//           redirect_uri:
//             (CONFIG.PRODUCT ? "https://" : "http://") +
//             req.headers.host +
//             "/api/auth/kakao",
//         },
//       }
//     );

//     // Access token을 이용해 정보 가져오기
//     const res2 = await Axios.post(
//       "https://kapi.kakao.com/v2/user/me",
//       {},
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: "Bearer " + res1.data.access_token,
//         },
//       }
//     );
//     console.log(res2.data);

//     const data = res2.data;
//     const row = (
//       await db.query(
//         `select * from user where snsPrimaryKey=? and snsType="kakao"`,
//         [data.id]
//       )
//     )[0];
//     if (row) {
//       // 회원가입된 유저
//       req.session.userId = row.id;
//       req.session.save(() => {});
//       res.redirect("http://localhost:4100");
//       return;
//     }
//     res.redirect(
//       "http://localhost:4100/auth/signup?token=" +
//         (data.properties && data.properties.nickname
//           ? "&name=" + encodeURIComponent(data.properties.nickname)
//           : "")
//     );
//   } catch (e) {
//     console.log(e);
//     res.status(400).end("Sorry, Login Error!");
//   }
// };

// 회원가입
exports.register = (req, res) => {
  const { username, password } = req.body;
  const profile = " " + username;
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
          "INSERT INTO user (username, password, profile) VALUES(?,?,?)",
          [username, password, profile],
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
  const username = req.header("Custom-Headers");
  const file = req.file;
  console.log(file);
  if (file) {
    connection.query(
      "UPDATE user SET profile=? WHERE username=?",
      [file.filename, username],
      function (error, results, fields) {
        if (error) {
          res.send({ msg: "프로필 업로드 실패" });
          res.end();
        } else {
          console.log(file.filename, username);
          res.send({ msg: "프로필 업로드 성공", url: file.filename });
          res.end();
        }
      }
    );
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
        console.log(results);
        if (!results.result) {
          console.log("result", results);
          connection.query("INSERT INTO stats (result) VALUES (?)", [result]);
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
    connection.query(
      "INSERT INTO stats (result) VALUES (?)",
      [result],
      function (error, results, fields) {
        if (error) {
          res.send({ msg: "결과 저장 실패" });
          res.end();
        } else {
          res.send({ msg: "비로그인 사용자 +1" });
          res.end();
        }
      }
    );
  }
};

// 총 사용자 수 불러오기
exports.total = (req, res) => {
  const { username } = req.body;
  connection.query(
    "SELECT stats_id FROM stats",
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
  connection.query(
    "SELECT comments.*, user.profile FROM comments JOIN user ON comments.username = user.username ORDER BY comments.createdAt DESC LIMIT 10",
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("시작222");
        res.send({ msg: "불러오기 성공", lists: results });
        res.end();
      } else {
        res.send({ msg: "불러오기 실패", lists: results });
        res.end();
      }
    }
  );
};

// 댓글 쓰기 - 시간은 나중에
exports.create = (req, res) => {
  const { username, comment } = req.body;
  const date = new Date();
  connection.query(
    "INSERT INTO comments (comment, createdAt, username) VALUES (?, ?, ?)",
    [comment, date, username],
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
  const { username, comment_id, likes } = req.body;
  console.log(username, comment_id, likes);
  const like1 = likes + 1;
  connection.query(
    "UPDATE comments SET likes=? WHERE comment_id=?",
    [like1, comment_id],
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
  const { username, comment_id, likes } = req.body;
  console.log(username, comment_id, likes, "좋아요 취소");
  const unlike1 = likes - 1;
  connection.query(
    "UPDATE comments SET likes=?-1 WHERE=?",
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
