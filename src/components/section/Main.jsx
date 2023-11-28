import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "../common/Modal";
import { useState } from "react";

const Main = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  console.log("isModalOpen:", isModalOpen);
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
