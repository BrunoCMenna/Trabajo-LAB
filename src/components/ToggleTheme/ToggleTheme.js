import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { ThemeContext } from "../../contexts/ThemeContext";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="flex-grow-1 text-white"
      variant={theme === "light" ? "dark" : "light"}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ToggleTheme;
