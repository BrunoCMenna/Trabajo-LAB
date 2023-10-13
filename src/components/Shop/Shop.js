import React, { useContext, useState } from "react";
import "./Shop.css";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import PhoneCatalog from "../PhoneCatalog/PhoneCatalog";
import SidebarFilters from "../SidebarFilters/SidebarFilters";
import { LoaderContext } from "../../contexts/LoaderContext";
import Spinner from "../ui/Spinner";
import { ThemeContext } from "../../contexts/ThemeContext";

const Shop = ({ products }) => {
  const [brandFilterSelected, setBrandFilterSelected] = useState(null);
  const { isLoading } = useContext(LoaderContext);
  const { theme } = useContext(ThemeContext);
  const brandFilterChanged = (brand) => {
    setBrandFilterSelected(brand);
  };

  return (
    <div className={`d-flex flex-column ${theme === "dark" && "shop-dark"}`}>
      <div>
        <NavBar />
      </div>
      <div className="d-flex flex-row shop-body">
        {isLoading ? (
          <div style={{ margin: "20rem" }}>
            <Spinner />
          </div>
        ) : (
          <>
            <div className="sidebarfilters d-flex flex-wrap">
              <SidebarFilters
                phones={products}
                onBrandFilterChange={brandFilterChanged}
              />
            </div>
            <div className="card-grid">
              <PhoneCatalog
                phones={products}
                brandFilterSelected={brandFilterSelected}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
