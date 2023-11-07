import React from "react";

const Menu = () => {
  return (
    <nav className="header__menu">
      <ul>
        <li>
          <a href="/login">로그인</a>
        </li>
        <li>
          <a href="/register">회원가입</a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
