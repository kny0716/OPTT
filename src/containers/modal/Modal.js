import ModalForm from "../../components/common/ModalForm";
import { useRecoilState } from "recoil";
import { loginState } from "../../atoms";
import instance from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export default function Modal({ close }) {
  const [login, setLogin] = useRecoilState(loginState);
  const navigate = useNavigate();
  // logoutUser(login.username, login.password);
  const logout = () => {
    logoutUser(login.username, login.password);
    console.log("로그아웃");
    setLogin({
      ...login,
      username: "",
      password: "",
      token: 0,
      profile: "",
    });
    close();
    navigate("/");
  };

  const resultClick = () => {
    console.log(login.result);
    if (login.result === null) {
      alert("저장된 설문 결과가 없습니다.");
    } else {
      navigate("/result");
    }
  };

  // 응답이 오기는 하는데 응답을 활용하지는 않아서 일단은 이렇게...
  async function logoutUser(username, password) {
    await instance.post("/logout", {
      username: username,
      password: password,
    });
    // try {
    //   const response = await instance.post("/logout", {
    //     username: username,
    //     password: password,
    //   });
    //   return response;
    // } catch (error) {
    //   console.error(error);
    // }
  }

  return (
    <ModalForm
      close={close}
      logout={logout}
      resultClick={resultClick}
      profile={login.profile}
    />
  );
}
