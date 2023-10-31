import React, { useState } from "react";
import "../SidebarFilters/SidebarFilters.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";
import { FaChevronCircleRight } from "react-icons/fa";

const SidebarFilters = ({
  phones,
  onBrandFilterChange,
  onSortChange,
  onStockFilterChange,
  stockFilter,
  onPriceFilterChange,
}) => {
  const { theme } = useContext(ThemeContext);
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handlePriceChange = (e) => {
    if (e.target.placeholder === "Min") {
      setMinPrice(e.target.value);
    } else if (e.target.placeholder === "Max") {
      setMaxPrice(e.target.value);
    }
  };

  const handleApplyFilters = () => {
    onPriceFilterChange(minPrice, maxPrice);
  };

  const getSameBrandPhones = () => {
    const sameBrandPhones = {};
    phones
      .filter((p) => p.isActive !== false)
      .forEach((p) => {
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

  const changeSortHandler = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    onSortChange(selectedSort);
  };

  const changeStockFilterHandler = (e) => {
    onStockFilterChange(e.currentTarget.value);
  };

  return (
    <div
      className={`filters-container mb-5 d-flex flex-column ${
        theme === "dark" && "sidebar-dark"
      }`}
    >
      <h6>
        <b>Marcas</b>
      </h6>
      <div className="filters-brands">
        <button
          className={`sb-button ${theme === "dark" && "sb-button-dark"}`}
          type="button"
          value=""
          onClick={changeBrandFilterHandler}
        >
          TODAS
        </button>
      </div>

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

      {/* ordenar por precio*/}
      <div className="mt-4">
        <h6>
          <b>Ordenar por</b>
        </h6>
        <select
          value={sortBy}
          onChange={changeSortHandler}
          className="form-select"
          data-bs-theme={theme}
        >
          <option value="asc">Menor precio</option>
          <option value="desc">Mayor precio</option>
        </select>
      </div>

      {/* ordenar por stock*/}
      <div className="mt-4">
        <h6>
          <b>Stock</b>
        </h6>
        <select
          value={stockFilter}
          onChange={changeStockFilterHandler}
          className="form-select"
          data-bs-theme={theme}
        >
          <option value="">Todos</option>
          <option value="conStock">Disponibles</option>
        </select>
      </div>

      {/* por precio min y max */}
      <div className="mt-4">
        <h6>
          <b>Precio</b>
        </h6>
        <div className="d-flex">
          <input
            type="number"
            placeholder="Min"
            min="0"
            value={minPrice}
            onChange={handlePriceChange}
            className="me-2 price-input"
            data-bs-theme={theme}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            min="0"
            value={maxPrice}
            onChange={handlePriceChange}
            className="mx-2 price-input"
            data-bs-theme={theme}
          />
          <button
            type="button"
            onClick={handleApplyFilters}
            className={`sb-button ps-1 ${theme === "dark" && "sb-button-dark"}`}
          >
            <FaChevronCircleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
