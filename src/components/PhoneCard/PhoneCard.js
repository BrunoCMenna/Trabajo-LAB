import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./PhoneCard.css";

const PhoneCard = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`phone-card-container ${
        theme === "dark" && "phone-card-dark"
      }`}
    >
      {children}
    </div>
  );
};

export default PhoneCard;
