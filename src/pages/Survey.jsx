import React, { useState } from "react";
import Main from "../components/section/Main";
import SurveyForm from "../components/common/SurveyForm";

const Survey = () => {
  const [question_number, set_question_number] = useState(1);
  const handleAnswerChange = () => {
    if (question_number + 1 === 12) {
      window.location.href = "/result";
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
