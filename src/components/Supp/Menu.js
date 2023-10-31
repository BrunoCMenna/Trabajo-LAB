import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Supp.css";

function AccordionItem({ title, isActive, toggleItem, children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`Accordeon-container ${isActive ? "active" : ""} ${
        theme === "dark" && "Accordeon-container-dark "
      }`}
    >
      <button
        onClick={toggleItem}
        className={`ac-button ${isActive ? "active" : ""} ${theme === "dark" && "ac-button-dark"}`}
      >
        {title}
      </button>
      <div className={`accordion-content ${isActive ? "active" : ""}`}>
        {children(isActive)}
      </div>
    </div>
  );
}



export default AccordionItem;
