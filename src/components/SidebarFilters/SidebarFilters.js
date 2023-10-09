import React from "react";
import "../SidebarFilters/SidebarFilters.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

const SidebarFilters = ({ phones, onBrandFilterChange }) => {
  const { theme } = useContext(ThemeContext);
  const getSameBrandPhones = () => {
    const sameBrandPhones = {};
    phones.forEach((p) => {
      if (sameBrandPhones[p.brand]) {
        sameBrandPhones[p.brand]++;
      } else {
        sameBrandPhones[p.brand] = 1;
      }
    });
    return sameBrandPhones;
  };

  const changeBrandFilterHandler = (e) => {
    onBrandFilterChange(e.currentTarget.value);
  };

  return (
    <div className={`filters-container ${theme === "dark" && "sidebar-dark"}`}>
      <h3>Filtrar por</h3>
      <button
        className={`sb-button ${theme === "dark" && "sb-button-dark"}`}
        type="button"
        value=""
        onClick={changeBrandFilterHandler}
      >
        Todas las marcas
      </button>

      {Object.entries(getSameBrandPhones()).map(([brand, counter]) => (
        <div className="filters-brands" key={brand}>
          <button
            className={`sb-button ${theme === "dark" && "sb-button-dark"}`}
            type="button"
            value={brand}
            onClick={changeBrandFilterHandler}
          >
            {brand}
            <span> ({counter})</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SidebarFilters;
