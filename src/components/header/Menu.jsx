import { loginState } from "../../atoms";
import { useRecoilState } from "recoil";
import React, { useState, useEffect } from "react";

// 아 이유 알았다. 이거 Menu가 body안 헤더인지 되게 애매하게 있어 그래서 잘 안되는 거 같아
// 가장 좋은 거는 Main 안에 header넣고 고정시키는게 가장 좋을 거 같아. 그래서 값이 잘 안넘어가는 거 같아.
// 로그인 token은 데베에서 끌고 온거라서 잘 넘어와 한 번 해봐
const Menu = ({ openModal }) => {
  const [login, setLogin] = useRecoilState(loginState);
  const [isMobile, setIsMobile] = useState(false);

  const profile_img =
    login.profile === "null" ? "/img/profile.svg" : login.profile;

  useEffect(() => {
    // 화면 크기가 600px보다 작으면 모바일로 간주
    const handleResize = () => {
      setIsMobile(window.innerWidth < 757);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <a href="/" className="header__logo">
        <img src="/img/logo.svg" alt="logo" />
      </a>
      <nav className="header__menu">
        {login.profile !== "" && !isMobile && (
          <ul>
            <li>
              <img
                src={profile_img}
                className="profile_img"
                alt="profile_img"
              />
            </li>
            <li className="modal_btn_container">
              <img
                src="img/modal_btn.svg"
                className="modal_btn"
                alt="modal_btn"
                onClick={() => {
                  openModal();
                }}
              />
            </li>
          </ul>
        )}
        {login.profile !== "" && isMobile && (
          <ul>
            <li className="modal_btn_container">
              <img
                src="img/mobile_modal_btn.svg"
                className="mobile_modal_btn"
                alt="mobie_modal_btn"
                onClick={() => {
                  openModal();
                }}
              />
            </li>
          </ul>
        )}
        {login.profile === "" && (
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
