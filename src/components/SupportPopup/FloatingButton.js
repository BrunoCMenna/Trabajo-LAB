import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./FloatingButton.css";

const FloatingButton = () => {
  const handleClick = () => {
    window.location.href = "https://web.whatsapp.com";
  };

  return (
    <div className="floating-button" onClick={handleClick}>
      <FontAwesomeIcon icon={faWhatsapp} />
    </div>
  );
};

export default FloatingButton;
