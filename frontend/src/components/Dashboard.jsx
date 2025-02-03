import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import "./Dashboard.css";
import Filters from "./Filters";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import data from "../data.json";
import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

function Dashboard() {
  const location = useLocation();
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    ageRange: "all",
    gender: "all",
    feature: "all",
  });
  const chartRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const savedStartDate = params.get("startDate") || Cookies.get("startDate");
    const savedEndDate = params.get("endDate") || Cookies.get("endDate");
    const savedAgeRange = params.get("ageRange") || Cookies.get("ageRange") || "all";
    const savedGender = params.get("gender") || Cookies.get("gender") || "all";
    const savedFeature = params.get("feature") || Cookies.get("feature") || "all";

    setFilters({
      startDate: savedStartDate ? dayjs(savedStartDate) : null,
      endDate: savedEndDate ? dayjs(savedEndDate) : null,
      ageRange: savedAgeRange,
      gender: savedGender,
      feature: savedFeature,
    });
  }, [location.search]);

  // Fix: Ensure date parsing works correctly
  const filteredData = data.filter((item) => {
    const itemDate = dayjs(item.Day, "D/M/YYYY", true); // Strict parsing

    if (!itemDate.isValid()) return false; // Ignore invalid dates

    return (
      (!filters.startDate || itemDate.isAfter(filters.startDate.subtract(1, "day"))) &&
      (!filters.endDate || itemDate.isBefore(filters.endDate.add(1, "day"))) &&
      (filters.ageRange === "all" || item.Age === filters.ageRange) &&
      (filters.gender === "all" || item.Gender === filters.gender)
    );
  });

  const totalTime = {};
  const dateWiseTime = {};

  filteredData.forEach((item) => {
    if (!dateWiseTime[item["Day"]]) {
      dateWiseTime[item["Day"]] = {};
    }
    Object.keys(item).forEach((key) => {
      if (!["Day", "Age", "Gender"].includes(key)) {
        totalTime[key] = (totalTime[key] || 0) + item[key];
        dateWiseTime[item["Day"]][key] = (dateWiseTime[item["Day"]][key] || 0) + item[key];
      }
    });
  });

  const categories = Object.keys(totalTime);
  const values = Object.values(totalTime);

  function handleBarChartClick(columnName) {
    setFilters((prevFilters) => ({ ...prevFilters, feature: columnName }));
    Cookies.set("feature", columnName);
  }

  let lineChartY = [];
  let lineChartX = [];

  if (filters.feature !== "all") {
    for (let key in dateWiseTime) {
      if (dateWiseTime[key][filters.feature] !== undefined) {
        lineChartY.push(dateWiseTime[key][filters.feature]);
        lineChartX.push(key);
      }
    }
  }

  function resetPreferences() {
    setFilters({ startDate: null, endDate: null, ageRange: "all", gender: "all", feature: "all" });
    Cookies.remove("startDate");
    Cookies.remove("endDate");
    Cookies.remove("ageRange");
    Cookies.remove("gender");
    Cookies.remove("feature");
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
    elements: {
      line: {
        tension: 0.3,
        borderWidth: 2,
      },
      point: {
        radius: 4,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
  };

  return (
    
    <Box sx={{ py: 4, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <Filters filters={filters} setFilters={setFilters} resetPreferences={resetPreferences} />
      <div className="chart-container">
        <div className="chart">
          <BarChart
            series={[
              {
                label: "Features",
                data: values,
                color: "#42A5F5",
              },
            ]}
            height={400}
            yAxis={[{ data: categories, label: "Features", scaleType: "band" }]}
            xAxis={[{ label: "Time" }]}
            layout="horizontal"
            onClick={(event) => {
              const barElement = event.target;
              const allBars = Array.from(document.querySelectorAll(".MuiBarElement-root"));
              const clickedIndex = allBars.indexOf(barElement);
              if (clickedIndex >= 0) {
                handleBarChartClick(categories[clickedIndex]);
              }
            }}
          />
        </div>
        <div className="chart">
          <Line
            ref={chartRef}
            data={{
              labels: lineChartX,
              datasets: [
                {
                  label: filters.feature !== "all" ? filters.feature : "Select a feature",
                  data: lineChartY,
                  borderColor: "#42A5F5",
                  backgroundColor: "rgba(66, 165, 245, 0.2)",
                  fill: false,
                },
              ],
            }}
            options={lineChartOptions}
            height={400}
          />
        </div>
      </div>
    </Box>
  );
}

export default Dashboard;
