import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./PhoneCard.css";


const PhoneCard = ({ children }) => {
  const { theme } = useContext(ThemeContext)
  return ( 
    <div className="phone-card-container">
      <div className= {`${theme === "dark" && "phone-card-dark"}`}>
        {children}
      </div>
    </div>
    )
};

export default PhoneCard;
