import React from "react";
import Main from "../components/section/Main";

const Home = () => {
  return (
    <Main>
      <div id="main_page">
        <h1> 나와 맞는 OTT 테스트 </h1>
        <p> 좋아하는 콘텐츠로 맞춤형 OTT를 찾아보세요. </p>
        <div>
          <img src="/img/start_button.svg"></img>
          <h3> 지금까지 총 10,000명이 참여 하였습니다.</h3>
        </div>
        <img src="img/home_character.svg"></img>
      </div>
    </Main>
  );
};

export default Home;
