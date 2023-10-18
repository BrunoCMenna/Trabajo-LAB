import { useContext, useEffect, useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { LoaderContext } from "../../contexts/LoaderContext";

function AdminDashboard() {
  const { toggleLoading } = useContext(LoaderContext);
  const [sells, setSells] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Ventas por día",
        data: [],
        backgroundColor: [
            "rgba(245, 132, 27, 1)",
            "#ecf0f1",
            "#4222d4",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
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

    // Actualiza el estado de chartData con los datos calculados
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

    console.log("ventas por día", Object.keys(salesByDate));
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center">
        <div className="" style={{ width: 700 }}>
          <BarChart chartData={chartData} />
        </div>
        <div style={{ width: 700 }}>
          <LineChart chartData={chartData} />
        </div>
        <div style={{ width: 700 }}>
          <PieChart chartData={chartData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
