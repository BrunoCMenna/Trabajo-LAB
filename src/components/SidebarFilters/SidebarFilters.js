import React from "react";
import "../SidebarFilters/SidebarFilters.css";

const SidebarFilters = ({ phones, onBrandFilterChange }) => {
  const getStockByBrand = () => {
    const stockByBrand = {};
    phones.forEach((p) => {
      if (stockByBrand[p.brand]) {
        stockByBrand[p.brand]++;
      } else {
        stockByBrand[p.brand] = 1;
      }
    });
    return stockByBrand;
  };

  const changeBrandFilterHandler = (e) => {
    onBrandFilterChange(e.target.value);
  };

  return (
    <div className="filters-container">
      <h3>Filtrar por</h3>
      <div>
        <div>
          <button
            className="sb-button"
            type="button"
            value="showAll"
            onClick={changeBrandFilterHandler}
          >
            Todas las marcas
          </button>
        </div>
        {Object.entries(getStockByBrand()).map(([brand, counter]) => (
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
