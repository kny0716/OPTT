import React, { useEffect } from "react";
import instance from "../../lib/axios";
import { useState } from "react";
import { loginState } from "../../atoms";
import { useRecoilValue } from "recoil";

const Menu = () => {
  const { username, password } = useRecoilValue(loginState);
  const [profile_img, setprofile_img] = useState("");
  // useEffect(() => {
  //   const checkLogin = async () => {
  //     try {
  //       const response = await instance.get("/user", {
  //         username: username,
  //         password: password,
  //       });
  //       setprofile_img(response.profile);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   checkLogin();
  // }, [username, password]);

  return (
    <>
      <a href="/" className="header__logo">
        <img src="/img/logo.svg" alt="logo" />
      </a>
      <nav className="header__menu">
        {profile_img && (
          <ul>
            <li>
              <img src={profile_img} alt="profile_img" />
            </li>
            <li>
              <img src="img/modal_btn.svg" alt="modal_btn" />
            </li>
          </ul>
        )}
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
      </nav>
    </>
  );
};

export default Menu;
