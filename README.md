OPTT API 명세서
공통 : status (200 성공, 500 서버 오류, 503 데이터베이스 찾기 실패)

1. 로그인
   방식 : POST
   URL : '/login'
   보내는 객체 : {username, password}
   응답 : data (token - Boolean)

1-2. 소셜 로그인
방식 : GET
URL : '/social/login'
보내는 객체 : {platform}
응답 : data (token - Boolean)

2. 회원가입
   방식 : POST
   URL : '/register'
   보내는 객체 : {username, password}

3. 사용자 정보
   방식 : GET
   URL : '/user'
   보내는 객체 : {username, password}
   응답 : data (profile - String, nickname - String, result - String)
   profile에 URL 들어가

4. 메인 페이지 (댓글 및 좋아요)
   방식 : GET
   URL : '/home'
   보내는 객체 : {username, password}
   응답 : data (comments - List)
   객체 배열이야 [{createdAt : Date, comment : String, like : Int, commnet_id : Int}]
   // page는 나중에 추가

5. 댓글 입력
   방식 : POST
   URL : '/create/comment'
   보내는 객체 : {username, password, comment}
   <!-- 응답 : data () -->

6. 댓글 수정
   방식 : POST
   URL : '/update/comment'
   보내는 객체 : {username, password, comment}
   <!-- 응답 : data (token - Boolean) -->

7. 댓글 삭제
   방식 : DELETE
   URL : '/delete/comment'
   보내는 객체 : {username, password, comment}
   <!-- 응답 : data (token - Boolean) -->

8. 좋아요 입력
   방식 : POST
   URL : '/like'
   보내는 객체 : {username, password, comment_id, like}
   <!-- 응답 : data (token - Boolean) -->
