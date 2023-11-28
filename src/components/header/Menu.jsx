import { useEffect } from "react";
import instance from "../../lib/axios";
import { useState } from "react";
import { loginState } from "../../atoms";
import { useRecoilValue } from "recoil";

// 아 이유 알았다. 이거 Menu가 body안 헤더인지 되게 애매하게 있어 그래서 잘 안되는 거 같아
// 가장 좋은 거는 Main 안에 header넣고 고정시키는게 가장 좋을 거 같아. 그래서 값이 잘 안넘어가는 거 같아.
// 로그인 token은 데베에서 끌고 온거라서 잘 넘어와 한 번 해봐
const Menu = ({ openModal }) => {
  const { username, password, token, profile, result } =
    useRecoilValue(loginState);
  const [profile_img, setprofile_img] = useState("");

  console.log(username, password, token, profile, result);

  // async function getUser(username, password) {
  //   try {
  //     const response = await instance.post("/user", {
  //       username: username,
  //       password: password,
  //     });
  //     console.log(response, "response");
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // const setProfile = (username, password) => {
  //   const userdata = getUser(username, password);
  //   const getData = () => {
  //     userdata.then((res) => {
  //       setprofile_img(res.data.profile);
  //     });
  //   };
  //   console.log(userdata, "userData");
  //   if (username && password) {
  //     getData();
  //   }
  // };

  // const setProfile = async (username, password) => {
  //   if (!username || !password) {
  //     return;
  //   }
  //   try {
  //     const userdata = await getUser(username, password);
  //     console.log(userdata.data.token);
  //     console.log(userdata, "userData"); // 이게 undefind

  //     setprofile_img(userdata.data.profile);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   setProfile(username, password);
  // }, [token]);

  return (
    <>
      <a href="/" className="header__logo">
        <img src="/img/logo.svg" alt="logo" />
      </a>
      <nav className="header__menu">
        {profile !== "" && (
          <ul>
            <li>
              <img src={profile} alt="profile_img" />
            </li>
            <li>
              <img
                src="img/modal_btn.svg"
                alt="modal_btn"
                onClick={() => {
                  console.log("modal_btn clicked");
                  openModal();
                }}
              />
            </li>
          </ul>
        )}
        {profile === "" && (
          <ul>
            <li>
              <a href="/login" id="login">
                로그인
              </a>
            </li>
            <li>
              <a href="/register" id="register">
                회원가입
              </a>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Menu;
