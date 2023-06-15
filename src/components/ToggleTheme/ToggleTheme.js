import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
        onClick={toggleTheme}
        className="flex-grow-1 text-white"
        variant={theme ==="light" ? "dark" : "light"}
    >
        Cambiar a Tema {theme ==="light" ? "Oscuro" : "Claro"}
    </button>
  )
}

export default ToggleTheme
