import Button from "../common/Button";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const GoogleLoginButton = () => {
  const clientId =
    "240613383820-is61ts08q1if74vopesi9pn61ca7aqji.apps.googleusercontent.com";
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

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

export default function AuthForm({ type, value, onChange, onSubmit }) {
  const { username, password, passwordCheck } = value;
  const { usernameChange, passwordChange, passwordCheckChange } = onChange;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };
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
        <form method="post" onKeyDown={handleKeyDown}>
          <div className="auth__form">
            {type === "register" && (
              <p className="register__form__label"> 아이디 </p>
            )}
            <div
              className={
                type === "login" ? "auth__form__div" : "register__form__div"
              }
            >
              <input
                placeholder="아이디를 입력해 주세요."
                type="text"
                value={username}
                onChange={usernameChange}
              />
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
              <input
                placeholder="비밀번호를 입력해 주세요."
                type="password"
                value={password}
                onChange={passwordChange}
              />
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
                  <input
                    placeholder="비밀번호를 확인해 주세요."
                    type="password"
                    value={passwordCheck}
                    onChange={passwordCheckChange}
                  />
                  <img src="/img/auth/blinded-eye.svg" alt="blinc-eye" />
                </div>
              </>
            )}
          </div>
          <Button
            className={
              type === "register"
                ? "auth__submit__button"
                : "register__submit__button"
            }
            onClick={onSubmit}
          >
            {titleMap[type].text}
          </Button>
        </form>

        {type === "login" && (
          <>
            <div className="login__line" />
            <div className="login__sns__block">
              <p>Google 간편 로그인</p>
              <div className="login__sns__button">
                {/* <a href={NAVER_URL}>
                  <img src="/img/auth/naver.svg" alt="naver" />
                </a>
                <a href={KAKAO_URL}>
                  <img src="/img/auth/kakao.svg" alt="kakao" />
                </a>
                <a href={GOOGLE_URL}>
                  <img src="/img/auth/google.svg" alt="google" />
                </a> */}
                <GoogleLoginButton />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
