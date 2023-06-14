import { createContext, useState } from "react";
import React from 'react';

export const ThemeContext = createContext();

export const ThemeContextProvider  = ({ children }) => {

    const [ theme, setTheme] = useState("light");

    const toggleTheme = () => {
        if (theme === "light")
            setTheme("dark");
        else{
            setTheme("light");
        }
    };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  );
};
