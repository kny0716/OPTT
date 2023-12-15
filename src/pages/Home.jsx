import React, { useState } from "react";
import Main from "../components/section/Main";
import Total from "../containers/home/Total";

const Home = () => {
  const [isListHover, setIsListHover] = useState(false);

  return (
    <Main>
      <div id="main__page">
        <h1> 나와 맞는 OTT 테스트 </h1>
        <p> 좋아하는 콘텐츠로 맞춤형 OTT를 찾아보세요. </p>
        <div>
          <img
            id="home__character"
            src="img/home_character.svg"
            alt="메인화면 캐릭터"
          />
          <li>
            <a href="/survey">
              {/* <img
                onMouseOver={() => setIsListHover(true)}
                onMouseOut={() => setIsListHover(false)}
                src={
                  isListHover
                    ? "/img/hover_start_button.svg"
                    : "/img/start_button.svg"
                }
                alt=""
              /> */}
              <img src={"/img/start_button.svg"}></img>
            </a>
            <Total />
          </li>
        </div>
      </div>
    </Main>
  );
};

export default Home;
