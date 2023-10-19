import { useContext, useEffect, useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { LoaderContext } from "../../contexts/LoaderContext";

function AdminDashboard({ products }) {
  const { toggleLoading } = useContext(LoaderContext);
  const [sells, setSells] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Ventas por día",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  // Nuevo estado para los productos más vendidos
  const [topProducts, setTopProducts] = useState({
    labels: [],
    datasets: [
      {
        label: "Productos más vendidos",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    toggleLoading(true);
    fetch("https://localhost:44377/api/Order/GetOrders", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((productData) => {
        const sellsComp = productData.map((product) => ({
          ...product,
        }));
        setSells(sellsComp);
        separatePerDate(sellsComp);
        calculateTopProducts(sellsComp);
        toggleLoading(false);
        console.log("sells cargado", sellsComp);
      })
      .catch((error) => {
        console.log(error);
        toggleLoading(false);
      });
  }, []);

  const separatePerDate = (sellsComp) => {
    const salesByDate = {};
    sellsComp.forEach((item) => {
      const date = item.orderDate.split("T")[0];
      if (salesByDate[date]) {
        salesByDate[date]++;
      } else {
        salesByDate[date] = 1;
      }
    });

    setChartData({
      ...chartData,
      labels: Object.keys(salesByDate),
      datasets: [
        {
          ...chartData.datasets[0],
          data: Object.values(salesByDate),
        },
      ],
    });

    console.log("Ventas por día", Object.keys(salesByDate));
  };

  const calculateTopProducts = (sellsComp) => {
    const productSales = {};

    // Calcular la cantidad vendida de cada producto
    sellsComp.forEach((item) => {
      const productId = item.orderItems[0].productId;
      if (productSales[productId]) {
        productSales[productId] += item.orderItems[0].quantity;
      } else {
        productSales[productId] = item.orderItems[0].quantity;
      }
    });

    // Ordenar los productos por cantidad vendida de forma descendente
    const sortedProducts = Object.keys(productSales).sort(
      (a, b) => productSales[b] - productSales[a]
    );

    // Limitar a los 3 productos más vendidos
    const topProductsLabels = sortedProducts.slice(0, 3);

    setTopProducts({
      ...topProducts,
      labels: topProductsLabels.map((productId) => {
        const product = products.find((p) => p.id === parseInt(productId));
        return product ? `${product.brand} ${product.model}` : "";
      }),
      datasets: [
        {
          ...topProducts.datasets[0],
          data: topProductsLabels.map((productId) => productSales[productId]),
        },
      ],
    });

    console.log("Productos más vendidos", topProductsLabels);
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex">
          <div className="" style={{ width: 400 }}>
            <BarChart chartData={chartData} />
          </div>
          <div style={{ width: 400 }}>
            <LineChart chartData={chartData} />
          </div>
          <div style={{ width: 300 }}>
            <PieChart chartData={chartData} />
          </div>
        </div>
        <div className="d-flex">
          <div style={{ width: 400 }}>
            <BarChart chartData={topProducts} />{" "}
            {/* Nuevo gráfico de productos */}
          </div>
          <div style={{ width: 400 }}>
            <LineChart chartData={topProducts} />
          </div>
          <div style={{ width: 300 }}>
            <PieChart chartData={topProducts} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
