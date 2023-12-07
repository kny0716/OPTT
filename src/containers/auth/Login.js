import AuthForm from "../../components/auth/AuthForm";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { loginState } from "../../atoms";
import { useNavigate } from "react-router-dom";
import instance from "../../lib/axios";
import e from "cors";

export default function Login() {
  const [login, setLogin] = useRecoilState(loginState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 이거 set함수에 [e.target.name]으로 묶을 수 있어
  const usernameChange = (e) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  async function getUser(username, password) {
    try {
      const response = await instance.post("/login", {
        username: username,
        password: password,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const validateUser = (username, password) => {
    const userdata = getUser(username, password);
    const getData = () => {
      userdata.then((res) => {
        setLogin({
          username: username,
          password: password,
          token: res.data.token,
        });
      });
    };
    getData();
  };

  const handleSubmit = (e) => {
    validateUser(username, password);
  };

  useEffect(() => {
    if (login.token !== 0) {
      console.log("로그인 성공");
      navigate("/");
      setProfile(username, password);
    } else console.log("로그인 실패");
  }, [login.token]);

  async function getUserData(username, password) {
    try {
      const response = await instance.post("/user", {
        username: username,
        password: password,
      });
      console.log(response, "response");
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const setProfile = async (username, password) => {
    const userdata = getUserData(username, password);
    const getProfileData = () => {
      userdata.then((res) => {
        let serverPath = instance.defaults.baseURL + "uploads/";
        if (res.data.results.profile === null) {
          serverPath = "";
        }
        setLogin({
          username: username,
          password: password,
          token: res.data.results.token,
          profile: `${serverPath}${res.data.results.profile}`,
          result: res.data.results.result,
        });
      });
    };
    getProfileData();
  };

  return (
    <AuthForm
      type="login"
      value={{ username, password }}
      onChange={{ usernameChange, passwordChange }}
      onSubmit={handleSubmit}
    />
  );
}
