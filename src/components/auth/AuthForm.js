import Button from "../common/Button";

const titleMap = {
  login: {
    link: "/register",
    title: "회원이 아니신가요?",
    button: "회원가입 하기",
    text: "로그인",
  },
  register: {
    link: "/login",
    title: "이미 회원이신가요?",
    button: "로그인 하기",
    text: "가입하기",
  },
};

export default function AuthForm({ type, form, onChange, onSubmit }) {
  return (
    <div id="auth">
      <div className="auth__div">
        <div className="auth__header">
          <a href="/" className="auth__logo">
            <img src="/img/auth/logo.svg" alt="logo" />
          </a>
          <div className="auth__nav">
            <p>{titleMap[type].title}</p>
            <Button to={titleMap[type].link}>{titleMap[type].button}</Button>
          </div>
        </div>
        <div className="auth__form">
          {type === "register" && (
            <p className="register__form__label"> 아이디 </p>
          )}
          <div
            className={
              type === "login" ? "auth__form__div" : "register__form__div"
            }
          >
            <input placeholder="아이디를 입력해 주세요." />
            <img src="/img/auth/eye.svg" alt="eye" />
          </div>
          {type === "register" && (
            <p className="register__form__label"> 비밀번호 </p>
          )}
          <div
            className={
              type === "login" ? "auth__form__div" : "register__form__div2"
            }
          >
            <input placeholder="비밀번호를 입력해 주세요." />
            <img src="/img/auth/blinded-eye.svg" alt="blinded-eye" />
          </div>
          {type === "register" && (
            <p className="password__condition">
              영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
            </p>
          )}
          {type === "register" && (
            <>
              <p className="register__form__label"> 비밀번호 확인 </p>
              <div className="register__form__div">
                <input placeholder="비밀번호를 확인해 주세요." />
                <img src="/img/auth/blinded-eye.svg" alt="blinc-eye" />
              </div>
            </>
          )}
        </div>
        <div
          className={
            type === "register"
              ? "auth__submit__button"
              : "register__submit__button"
          }
        >
          <Button>{titleMap[type].text}</Button>
        </div>
        {type === "login" && (
          <>
            <div className="login__line" />
            <div className="login__sns__block">
              <p>SNS 간편 로그인</p>
              <div className="login__sns__button">
                <img src="/img/auth/naver.svg" alt="kakao" />
                <img src="/img/auth/kakao.svg" alt="naver" />
                <img src="/img/auth/google.svg" alt="google" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
