import ModalForm from "../../components/common/ModalForm";
import { useRecoilState } from "recoil";
import { loginState } from "../../atoms";
import instance from "../../lib/axios";

export default function Modal({ close }) {
  const [login, setLogin] = useRecoilState(loginState);
  logoutUser(login.username, login.password);
  const logout = () => {
    console.log("로그아웃");
    setLogin({
      username: "",
      password: "",
      token: 0,
      profile: "",
      result: "",
    });
    close();
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

  return <ModalForm close={close} logout={logout} profile={login.profile} />;
}
