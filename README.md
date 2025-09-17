

https://github.com/user-attachments/assets/c0cd3cd2-e5df-4d48-8164-7c33965769f9

# OPTT (OTT 추천 웹서비스)

> 설문조사를 기반으로 사용자가 선호할 만한 OTT 플랫폼을 추천하는 웹사이트  

🔗 [GitHub Repository](https://github.com/kny0716/Webprogramming.git)

---

## 📌 프로젝트 개요
- 개발 기간: YYYY.MM.DD ~ YYYY.MM.DD
- 주요 기술 스택: React, JavaScript, Express.js, Recoil, MySQL, SCSS
- 프로젝트 유형: 팀 프로젝트 (팀장)

---

## 🎯 프로젝트 목표
- 사용자의 설문조사 데이터를 기반으로 OTT 맞춤형 추천 서비스 제공
- 반응형 웹 디자인으로 다양한 기기 대응

---

## 🛠️ 주요 기능
- [ ] 설문조사 기반 OTT 추천
- [ ] 반응형 웹 (모바일/태블릿/데스크톱 대응)
- [ ] MySQL DB 및 REST API 연동

---

## 👩‍💻 역할과 기여
- 팀장으로 프로젝트 전체 관리 및 주간 백로그 설정
- UX/UI 기획 및 Figma 프로토타입 제작
- Express.js 기반 백엔드 구현

---

## 🔍 배운 점 & 성과
- **Agile 방식 (스프린트/회고)** 활용한 프로젝트 관리 경험
- **Jira 칸반 보드**로 요구사항 관리 및 협업 체계 강화
- 반응형 디자인 및 REST API 통신 구조에 대한 이해 심화


OPTT API 명세서
공통 : msg (성공, 실패)

1. 로그인
   방식 : POST
   URL : '/login'
   보내는 객체 : {username, password}
   응답 : data (token - Boolean)

1. 소셜 로그인
   방식 : GET
   URL : '/social/login'
   보내는 객체 : {platform}
   응답 : data (token - Boolean)

1. 회원가입
   방식 : POST
   URL : '/register'
   보내는 객체 : {username, password}

1. 로그아웃
   방식 : POST
   URL : '/logout'
   보내는 객체 : {username, password}
   응답 : data (token - Boolean)

1. 사용자 정보
   방식 : GET
   URL : '/user'
   보내는 객체 : {username, password}
   응답 : data (profile - String, nickname - String, result - String)
   profile에 URL 들어가

1. 메인 페이지 (댓글 및 좋아요)
   방식 : GET
   URL : '/comments'
   응답 : data (comments - List)
   객체 배열이야 [{createdAt : Date, comment : String, like : Int, commnet_id : Int}]
   // page는 나중에 추가

1. 사용자 결과 저장
   방식 : POST
   URL : '/user/result'
   보내는 객체 : {username, password, result}

1. 댓글 입력
   방식 : POST
   URL : '/comment/create'
   보내는 객체 : {username, comment}
   <!-- 응답 : data () -->

1. 댓글 수정
   방식 : POST
   URL : '/comment/update'
   보내는 객체 : {username, comment_id, comment}
   <!-- 응답 : data (token - Boolean) -->

1. 댓글 삭제
   방식 : DELETE
   URL : '/comment/delete'
   보내는 객체 : {comment_id}
   <!-- 응답 : data (token - Boolean) -->

1. 좋아요 입력
   방식 : POST
   URL : '/like'
   보내는 객체 : {username, comment_id, likes}
   <!-- 응답 : data (token - Boolean) -->

1. 좋아요 취소
   방식 : POST
   URL : '/unlike'
   보내는 객체 : {username, comment_id, likes}
   <!-- 응답 : data (token - Boolean) -->
