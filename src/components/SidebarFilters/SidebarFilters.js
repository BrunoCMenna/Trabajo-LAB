import React from "react";
import "../SidebarFilters/SidebarFilters.css";

const SidebarFilters = ({ phones, onBrandFilterChange }) => {
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
      <h3>Filtrar por</h3>
      <div>
        <div>
          <button
            className="sb-button"
            type="button"
            value=""
            onClick={changeBrandFilterHandler}
          >
            Todas las marcas
          </button>
        </div>
        {Object.entries(getSameBrandPhones()).map(([brand, counter]) => (
          <div>
            <button
              className="sb-button"
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
    </div>
  );
};

export default SidebarFilters;
