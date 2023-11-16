import React, { useState } from "react";
import Main from "../components/section/Main";
import SurveyForm from "../components/common/SurveyForm";

const Survey = () => {
  const [question_number, set_question_number] = useState(0);
  const handleAnswerChange = () => {
    if (question_number === 10) {
      set_question_number(question_number + 1);
      setTimeout(() => {
        window.location.href = "/result";
      }, 700);
    } else {
      set_question_number(question_number + 1);
    }
  };
  return (
    <Main>
      <SurveyForm
        number={question_number}
        onClick={() => handleAnswerChange()}
      />
    </Main>
  );
};

export default Survey;
