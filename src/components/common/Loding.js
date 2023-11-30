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
  // const size = [
  //   [17.25, 12.5],
  //   [20, 11.25],
  //   [29.5625, 5.625],
  //   [25.1875, 5.625],
  //   [13.125, 14.375],
  // ];

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
        <div className="loading-img">
          <img
            src={imageUrls[currentImageIndex]}
            alt={`${currentImageIndex + 1}`}
          />
          {/* <img
            src={imageUrls[currentImageIndex]}
            alt={`${currentImageIndex + 1}`}
            style={{
              width: `${size[currentImageIndex][0]}rem`,
              height: `${size[currentImageIndex][1]}rem`,
            }}
          /> */}
        </div>
        <p>나와 어울리는 OTT는?</p>
      </div>
    </div>
  );
};

export default Loading;
