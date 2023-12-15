const express = require("express");
const path = require("path");

const app = express();
const port = 3001; // 적절한 포트 번호로 변경

// Express 앱에서 정적 파일 제공 (리액트 빌드 폴더)
app.use(express.static(path.join(__dirname, "path/on/ec2/build")));

// 리액트 빌드 폴더에서 index.html 제공
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "path/on/ec2/build", "index.html"));
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
