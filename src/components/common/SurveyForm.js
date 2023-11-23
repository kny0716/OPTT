import React from "react";

export default function SurveyForm(props) {
  const index = parseInt(props.number);
  const contents = props.contents;
  return (
    <div id="survey">
      <div className="survey__div">
        <div className="survey__header">
          <div className="survey__header__title">
            <p>{index <= 10 ? index + 1 : 11} / 11</p>
          </div>
          <div className="survey__progressbar__container">
            <div
              className="survey__progressbar"
              style={{ width: `${((index + 1) / 12) * 100}%` }}
            />
            <img
              className="survey__progressbar__img"
              src="img/home_character.svg"
              style={{ left: `${((index + 1) / 12) * 100}%` }}
              alt="character"
            ></img>
          </div>
        </div>
        <div className="survey__form">
          <div className="survey__form__query">
            {index <= 10 ? contents[index].query : contents[10].query}
          </div>
          <div className="answer__form">
            <div className="survey__form__answer" onClick={props.onfirstClick}>
              {index <= 10
                ? contents[index].answers[0]
                : contents[10].answers[0]}
            </div>
            <div className="survey__form__answer" onClick={props.onsecondClick}>
              {index <= 10
                ? contents[index].answers[1]
                : contents[10].answers[1]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
