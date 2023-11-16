import React, { useState } from "react";
import Main from "../components/section/Main";
import Modal from "../components/common/Modal";

const Result = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <Main>
      <button onClick={open}>모달 열기</button>
      {isOpen && <Modal close={close} />}
    </Main>
  );
};

export default Result;
