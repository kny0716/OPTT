import AuthForm from "../../components/auth/AuthForm";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { registerState } from "../../atoms";
import { useNavigate } from "react-router-dom";
import instance from "../../lib/axios";

export default function Register() {
  const [register, setRegister] = useRecoilState(registerState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const navigate = useNavigate();
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
  };

  const validateId = (username, password) => {
    const userdata = registerUser(username, password);
    const getData = () => {
      userdata.then((res) => {
        if (res.data.msg === "이미 아이디가 존재합니다.") {
          alert("이미 아이디가 존재합니다.");
        } else {
          navigate("/login");
        }
      });
    };
    getData();
  };
  async function registerUser(username, password) {
    try {
      const response = await instance.post("/register", {
        username: username,
        password: password,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    if (isButtonEnabled) {
      console.log(username, password, passwordCheck);
      console.log("회원가입 성공");
      setRegister({
        username: username,
        password: password,
        passwordConfirm: passwordCheck,
      });

      validateId(username, password);
      console.log(register);

      setUsername("");
      setPassword("");
      setPasswordCheck("");
      setIsButtonEnabled(false);
    } else console.log("회원가입 실패");
  };

  return (
    <AuthForm
      type="register"
      value={{ username, password, passwordCheck }}
      onChange={{ usernameChange, passwordChange, passwordCheckChange }}
      onSubmit={handleSubmit}
    />
  );
}
