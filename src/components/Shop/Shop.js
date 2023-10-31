import React, { useContext, useState } from "react";
import "./Shop.css";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import PhoneCatalog from "../PhoneCatalog/PhoneCatalog";
import SidebarFilters from "../SidebarFilters/SidebarFilters";
import { LoaderContext } from "../../contexts/LoaderContext";
import Spinner from "../ui/Spinner";
import { ThemeContext } from "../../contexts/ThemeContext";
import TopProducts from "../TopProducts/TopProducts";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const Shop = ({ products, top3 }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [brandFilterSelected, setBrandFilterSelected] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { isLoading } = useContext(LoaderContext);
  const { theme } = useContext(ThemeContext);

  const brandFilterChanged = (brand) => {
    setBrandFilterSelected(brand);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleStockFilterChange = (selectedStockFilter) => {
    setStockFilter(selectedStockFilter);
  };

  const handlePriceFilterChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const filterProductsByStock = (products, stockFilter) => {
    if (stockFilter === "conStock") {
      return products.filter((product) => product.inStock > 0);
    }
    return products;
  };

  const filterProductsByPrice = (products, minPrice, maxPrice) => {
    return products.filter(
      (product) =>
        (minPrice === "" || product.price >= parseInt(minPrice)) &&
        (maxPrice === "" || product.price <= parseInt(maxPrice))
    );
  };

  const sortProducts = (products, option) => {
    if (option === "asc") {
      return products.slice().sort((a, b) => a.price - b.price);
    } else if (option === "desc") {
      return products.slice().sort((a, b) => b.price - a.price);
    } else {
      return products;
    }
  };

  const filteredAndSortedProducts = sortProducts(
    filterProductsByPrice(
      filterProductsByStock(
        products.filter((product) => {
          if (brandFilterSelected) {
            return product.brand === brandFilterSelected;
          }
          return true;
        }),
        stockFilter
      ),
      minPrice,
      maxPrice
    ),
    sortOption
  );

  return (
    <div className={`d-flex flex-column ${theme === "dark" && "shop-dark"}`}>
      <div>
        <NavBar />
      </div>
      <div className="shop-body">
        {isLoading ? (
          <div style={{ margin: "20rem" }}>
            <Spinner />
          </div>
        ) : (
          <div className="d-flex flex-row">
            <div className="sidebarfilters">
              <SidebarFilters
                phones={products}
                onBrandFilterChange={brandFilterChanged}
                onSortChange={handleSortChange}
                stockFilter={stockFilter}
                onStockFilterChange={handleStockFilterChange}
                onPriceFilterChange={handlePriceFilterChange}
                currentMinPrice={minPrice}
                currentMaxPrice={maxPrice}
              />
            </div>
            <div>
              <div className="top-banner d-flex justify-content-center img-fluid">
                <div className="mt-3 top-products">
                  <TopProducts top3={top3} />
                </div>
              </div>
              <div className="mobile-filters-button p-3">
                <button
                  className=""
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  {showMobileFilters ? (
                    <>
                      Ocultar Filtros <FaAngleDown />
                    </>
                  ) : (
                    <>
                      Mostrar Filtros <FaAngleRight />
                    </>
                  )}
                </button>
              </div>
              <div className="mobile-filters">
                {showMobileFilters && (
                  <SidebarFilters
                    phones={products}
                    onBrandFilterChange={brandFilterChanged}
                    onSortChange={handleSortChange}
                    stockFilter={stockFilter}
                    onStockFilterChange={handleStockFilterChange}
                    onPriceFilterChange={handlePriceFilterChange}
                    currentMinPrice={minPrice}
                    currentMaxPrice={maxPrice}
                  />
                )}
              </div>
              <div className="conten">
                <div className="card-grid">
                  <PhoneCatalog
                    phones={filteredAndSortedProducts}
                    brandFilterSelected={brandFilterSelected}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
