import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "../../containers/modal/Modal";
import { useState } from "react";

const Main = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header openModal={openModal} />
      <main id="main" role="main">
        {props.children}
      </main>
      {isModalOpen && <Modal close={closeModal} />}
      <Footer />
    </>
  );
};

export default Main;
