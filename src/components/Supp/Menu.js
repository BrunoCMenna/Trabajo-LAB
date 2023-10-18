import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Supp.css";

function AccordionItem({ title, isActive, toggleItem, children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`filters-container ${isActive ? "active" : ""} ${
        theme === "dark" && "sidebar-dark"
      }`}
    >
      <button
        onClick={toggleItem}
        className={`sb-button ${theme === "dark" && "sb-button-dark"}`}
      >
        {title}
      </button>
      {children(isActive)}
    </div>
  );
}

export default AccordionItem;
