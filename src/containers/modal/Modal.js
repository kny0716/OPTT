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
    if (login.result === null) {
      alert("저장된 설문 결과가 없습니다.");
    } else {
      navigate("/result");
    }
  };

  async function logoutUser(username, password) {
    await instance.post("/logout", {
      username: username,
      password: password,
    });
  }

  return (
    <ModalForm
      close={close}
      logout={logout}
      resultClick={resultClick}
      profile={login.profile}
      username={login.username}
    />
  );
}
