

https://github.com/user-attachments/assets/c0cd3cd2-e5df-4d48-8164-7c33965769f9



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
