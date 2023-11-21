import Button from "../common/Button";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { loginState, registerState } from "../../atoms";
// import axios from "axios";
import instance from "../../lib/axios";

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
  const [login, setLogin] = useRecoilState(loginState);
  const [register, setRegister] = useRecoilState(registerState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const passwordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
    validatePassword(password, e.target.value);
  };

  const validatePassword = (password, passwordCheck) => {
    setIsButtonEnabled(
      password.length >= 8 &&
        !/[^\dA-Za-z]/.test(password) &&
        password === passwordCheck
    );
    console.log(isButtonEnabled);
  };

  async function validateUser(username, password) {
    try {
      const response = await instance.post("/login", {
        username: username,
        password: password,
      });
      const getData = () => {
        response.then((res) => {
          if (res.data.token) {
            return true;
          } else {
            return false;
          }
        });
      };
      getData();
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const handleSubmit = (e) => {
    if (type === "register") {
      if (isButtonEnabled) {
        console.log(username, password, passwordCheck);
        console.log("회원가입 성공");
        setRegister({
          username: username,
          password: password,
          passwordConfirm: passwordCheck,
        });
        console.log(register);
        instance
          .post("/register", {
            username: register.username,
            password: register.password,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        setUsername("");
        setPassword("");
        setPasswordCheck("");
        setIsButtonEnabled(false);
      } else console.log("회원가입 실패");
    } else {
      if (validateUser(username, password)) {
        console.log("로그인 성공");
      } else console.log("로그인 실패");
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
          onClick={handleSubmit}
        >
          {titleMap[type].text}
        </Button>
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
