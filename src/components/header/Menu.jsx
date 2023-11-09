import React from "react";

const Menu = () => {
  return (
    <>
      <a href="/" className="header__logo">
        <img src="/img/logo.svg" alt="logo" />
      </a>
      <nav className="header__menu">
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
