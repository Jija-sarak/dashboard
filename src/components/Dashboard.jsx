import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import "./Dashboard.css";
import Filters from "./Filters";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import data from "../data.json";

function Dashboard() {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    ageRange: "all",
    gender: "all",
    feature: "all",
  });

  useEffect(() => {
    const savedStartDate = Cookies.get("startDate");
    const savedEndDate = Cookies.get("endDate");
    const savedAgeRange = Cookies.get("ageRange") || "all";
    const savedGender = Cookies.get("gender") || "all";
    const savedFeature = Cookies.get("feature") || "";

    if (savedStartDate) setFilters({
      ...filters,
      startDate: dayjs(savedStartDate), // Update only the endDate
    });
    if (savedEndDate) setFilters({
      ...filters,
      endDate: dayjs(savedEndDate), // Update only the endDate
    });

    setFilters({ ...filters, ageRange: savedAgeRange, gender: savedGender, feature: savedFeature });
  }, [filters]);

  const filteredData = data.filter((item) => {
    const itemDate = dayjs(item.Day, "D/M/YYYY");
    const matchesDateRange =
      (!filters.startDate ||
        itemDate.isAfter(filters.startDate, "day") ||
        itemDate.isSame(filters.startDate, "day")) &&
      (!filters.endDate ||
        itemDate.isBefore(filters.endDate, "day") ||
        itemDate.isSame(filters.endDate, "day"));
    const matchesAgeRange = filters.ageRange === "all" || item.Age === filters.ageRange;
    const matchesGender = filters.gender === "all" || item.Gender === filters.gender;
    return matchesDateRange && matchesAgeRange && matchesGender;
  });

  const totalTime = {};
  const dateWiseTime = {};
  filteredData.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!["Day", "Age", "Gender"].includes(key)) {
        totalTime[key] = (totalTime[key] || 0) + item[key];
        dateWiseTime[item["Day"]][key] =
          (dateWiseTime[item["Day"]][key] || 0) + item[key];
      }
      if ("Day" === key && !dateWiseTime[item[key]]) {
        dateWiseTime[item[key]] = {};
      }
    });
  });

  const categories = Object.keys(totalTime);
  const values = Object.values(totalTime);

  function handleBarChartClick(columnName) {
    setFilters({...filters, feature: columnName});
    Cookies.set("feature", columnName);
  }

  let lineChartY = [];
  let lineChartX = [];
  for (let key in dateWiseTime) {
    if (filters.feature !== "") {
      lineChartY.push(dateWiseTime[key][filters.feature]);
      lineChartX.push(key);
    }
  }

  function resetPreferences() {
    setFilters({
      startDate: null,
      endDate: null,
      ageRange: "all",
      gender: "all",
      feature: "all",
    });
    Cookies.remove("startDate");
    Cookies.remove("endDate");
    Cookies.remove("ageRange");
    Cookies.remove("gender");
    Cookies.remove("feature");
  }

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
    <Filters
          filters={filters}
          setFilters={setFilters}
          resetPreferences={resetPreferences}
        />
      <div className="chart-container">
  
        <div className="chart">
        <BarChart
            series={[{label: "Features", data: values }]}
            height={400}
            yAxis={[{ data: categories, label: "Features", scaleType: "band" }]}
            xAxis={[{ label: "Time" }]}
            layout="horizontal"
            onClick={(event) => {
              const barElement = event.target;
              const allBars = Array.from(
                document.querySelectorAll(".MuiBarElement-root")
              );
              const clickedIndex = allBars.indexOf(barElement);

              if (clickedIndex >= 0) {
                const clickedCategory = categories[clickedIndex];
                handleBarChartClick(clickedCategory);
              }
            }}
          />
        </div>
        <div className="chart">
        <LineChart
            xAxis={[{ data: lineChartX, label: "Date", scaleType: "band" }]}
            yAxis={[{ label: "Time" }]}
            series={[
              {
                label: `${filters.feature}`,
                data: lineChartY,
              },
            ]}
            height={400}
          />
        </div>
      </div>
    </Box>
  );
}

export default Dashboard;
