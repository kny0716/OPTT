import React from "react";
import { useState, useEffect } from "react";

const Loading = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageUrls = [
    "/img/logo/netflix.svg",
    "/img/logo/disneyplus.svg",
    "/img/logo/wavve.svg",
    "/img/logo/tving.svg",
    "/img/logo/coupangplay.svg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [imageUrls.length]);

  return (
    <div className="loading-container">
      <div className="loading-component">
        <img
          src={imageUrls[currentImageIndex]}
          alt={`${currentImageIndex + 1}`}
        />
        <p>나와 어울리는 OTT는?</p>
      </div>
    </div>
  );
};

export default Loading;
