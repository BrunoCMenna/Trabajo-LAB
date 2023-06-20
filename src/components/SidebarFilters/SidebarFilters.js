import React from "react";
import "../SidebarFilters/SidebarFilters.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

const SidebarFilters = ({ phones, onBrandFilterChange }) => {
  const { theme } = useContext(ThemeContext);
  //funcion de contador de celulres que comparten marca. Devuelve un objeto con "Marca: numCantidad"
  const getSameBrandPhones = () => {
    const SameBrandPhones = {};
    phones.forEach((p) => {
      if (SameBrandPhones[p.brand]) {
        SameBrandPhones[p.brand]++;
      } else {
        SameBrandPhones[p.brand] = 1;
      }
    });
    return SameBrandPhones;
  };
  
  const changeBrandFilterHandler = (e) => {
    onBrandFilterChange(e.currentTarget.value);
  };

  return (
    <div className="filters-container">
      <div className= {`${theme === "dark" && "sidebar-dark"}`}>
        <h3>Filtrar por</h3>
          <button
            className="sb-button"
            type="button"
            value=""
            onClick={changeBrandFilterHandler}
          >
          <div className= {`${theme === "dark" && "sb-button-dark"}`}>
            Todas las marcas
          </div>
          </button>
          
      
        {Object.entries(getSameBrandPhones()).map(([brand, counter]) => (
          <div className="filters-brands">
            <button
              className="sb-button"
              type="button"
              value={brand}
              onClick={changeBrandFilterHandler}>
            <div className= {`${theme === "dark" && "button-dark"}`}>
              {brand}
              <span> ({counter})</span>
            </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarFilters;
