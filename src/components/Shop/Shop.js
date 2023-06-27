import React, { useContext, useState } from "react";
import "./Shop.css";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import PhoneCatalog from "../PhoneCatalog/PhoneCatalog";
import SidebarFilters from "../SidebarFilters/SidebarFilters";
import { LoaderContext } from "../../contexts/LoaderContext";
import Spinner from "../ui/Spinner";

const Shop = ({ products }) => {
  const [brandFilterSelected, setBrandFilterSelected] = useState(null);
  const { isLoading } = useContext(LoaderContext);
  const brandFilterChanged = (brand) => {
    setBrandFilterSelected(brand);
  };

  return (
    <div className="d-flex flex-column">
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
            <div className="sidebarfilters">
              <SidebarFilters
                phones={products}
                onBrandFilterChange={brandFilterChanged}
              />
            </div>
            <div className="catalog-body">
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
