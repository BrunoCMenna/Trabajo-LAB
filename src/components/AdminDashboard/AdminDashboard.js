import { useContext, useEffect, useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { LoaderContext } from "../../contexts/LoaderContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./AdminDashboard.css";
import { UserContext } from "../../contexts/AuthContext";

const colorScheme = [
  "#25CCF7",
  "#FD7272",
  "#54a0ff",
  "#00d2d3",
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#ecf0f1",
  "#95a5a6",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#bdc3c7",
  "#7f8c8d",
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#a29bfe",
  "#dfe6e9",
  "#00b894",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#ffeaa7",
  "#fab1a0",
  "#ff7675",
  "#fd79a8",
  "#fdcb6e",
  "#e17055",
  "#d63031",
  "#feca57",
  "#5f27cd",
  "#54a0ff",
  "#01a3a4",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colorScheme.length);
  return colorScheme[randomIndex];
};

function AdminDashboard() {
  const { theme } = useContext(ThemeContext);
  const { toggleLoading } = useContext(LoaderContext);
  const { token } = useContext(UserContext);
  const [sells, setSells] = useState([]);

  const chartOptionsP = {
    plugins: {
      legend: {
        labels: {
          color:
            theme === "dark" ? "rgba(245, 240, 240, 1)" : "rgba(15, 15, 15, 1)", // Color del texto en la leyenda
        },
      },
    },
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color:
            theme === "dark" ? "rgba(245, 240, 240, 1)" : "rgba(15, 15, 15, 1)", // Color del texto en la leyenda
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color:
            theme === "dark" ? "rgba(245, 240, 240, 1)" : "rgba(15, 15, 15, 1)", // Color del texto en el eje X
        },
      },
      y: {
        ticks: {
          color:
            theme === "dark" ? "rgba(245, 240, 240, 1)" : "rgba(15, 15, 15, 1)", // Color del texto en el eje Y
        },
      },
    },
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Ventas por día",
        data: [],
        backgroundColor: [], // Usaremos un arreglo vacío para asignar colores aleatorios
        borderColor: "rgba(15, 15, 15, 1)",
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
        backgroundColor: [], // Usaremos un arreglo vacío para asignar colores aleatorios
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    toggleLoading(true);
    fetch("https://localhost:44377/api/Order/GetOrders", {
      headers: {
        accept: "application/json",
        "Authorization": `Bearer ${token}`,
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
    const backgroundColors = [];

    sellsComp.forEach((item) => {
      const date = item.orderDate.split("T")[0];
      if (salesByDate[date]) {
        salesByDate[date]++;
      } else {
        salesByDate[date] = 1;
      }

      // Asignar un color aleatorio para cada fecha
      backgroundColors.push(getRandomColor());
    });

    setChartData({
      ...chartData,
      labels: Object.keys(salesByDate),
      datasets: [
        {
          ...chartData.datasets[0],
          data: Object.values(salesByDate),
          backgroundColor: backgroundColors, // Asignar los colores aleatorios
        },
      ],
    });

    console.log("Ventas por día", Object.keys(salesByDate));
  };
  const calculateTopProducts = (sellsComp) => {
    const productSales = {};
    const backgroundColors = {};

    sellsComp.forEach((order) => {
      order.orderItems.forEach((item) => {
        const brand = item.brand; // Obtenemos la marca del producto
        const model = item.model; // Obtenemos el modelo del producto
        const productKey = `${brand} - ${model}`; // Creamos una clave única con marca y modelo

        if (productSales[productKey]) {
          productSales[productKey] += item.quantity;
        } else {
          productSales[productKey] = item.quantity;
        }

        // Asignar un color aleatorio para cada producto (una vez por producto)
        if (!backgroundColors[productKey]) {
          backgroundColors[productKey] = getRandomColor();
        }
      });

      // Obtener la lista de productos más vendidos
      const topProductsLabels = Object.keys(productSales);

      setTopProducts({
        ...topProducts,
        labels: topProductsLabels,
        datasets: [
          {
            ...topProducts.datasets[0],
            data: topProductsLabels.map(
              (productKey) => productSales[productKey]
            ),
            backgroundColor: topProductsLabels.map(
              (productKey) => backgroundColors[productKey]
            ),
          },
        ],
      });

      console.log("Productos más vendidos", topProductsLabels);
    });
  };

  return (
    <div>
      <NavBar />
      <div
        className={`d-flex flex-column align-items-center ${
          theme === "dark" && "charts-dark"
        }`}
      >
        <div className="d-flex">
          <div className="" style={{ width: 400 }}>
            <BarChart chartData={chartData} options={chartOptions} />
          </div>
          <div style={{ width: 400 }}>
            <LineChart chartData={chartData} options={chartOptions} />
          </div>
          <div style={{ width: 300 }}>
            <PieChart chartData={chartData} options={chartOptionsP} />
          </div>
        </div>
        <div className="d-flex">
          <div style={{ width: 400 }}>
            <BarChart chartData={topProducts} options={chartOptions} />{" "}
            {/* Nuevo gráfico de productos */}
          </div>
          <div style={{ width: 400 }}>
            <LineChart chartData={topProducts} options={chartOptions} />
          </div>
          <div style={{ width: 300 }}>
            <PieChart chartData={topProducts} options={chartOptionsP} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
