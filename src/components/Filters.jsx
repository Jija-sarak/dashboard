/* eslint-disable react/prop-types */
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Cookies from "js-cookie";
import "./Filters.css";

function Filters({ filters, setFilters, resetPreferences }) {
  function generateShareableURL() {
    const params = new URLSearchParams({
      startDate: filters.startDate?.format("YYYY-MM-DD") || "",
      endDate: filters.endDate?.format("YYYY-MM-DD") || "",
      ageRange: filters.ageRange || "",
      gender: filters.gender || "",
      feature: filters.feature || "",
    }).toString();

    const shareableURL = `${window.location.origin}/dashboard?${params}`;
    navigator.clipboard.writeText(shareableURL);
    alert("URL copied to clipboard!");
  }
  return (
  <>
  <div className="filters-container">
      <div className="Date-filter">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={filters.startDate}
            onChange={(newValue) => {
              setFilters({
                ...filters,
                startDate: newValue, // Update only the startDate
              });
              Cookies.set(
                "startDate",
                newValue ? newValue.format("YYYY-MM-DD") : ""
              );
            }}
            sx={{
              width: 160,
              "& .MuiInputBase-root": {
                height: 40,
                display: "flex",
                alignItems: "center",
              },

              "& .MuiInputLabel-root": {
                top: `${filters.startDate != null ? 0 : `-20%`}`,
              },
            }}
          />
          <DatePicker
            label="End Date"
            value={filters.endDate}
            onChange={(newValue) => {
              setFilters({
                ...filters,
                endDate: newValue, // Update only the endDate
              });
              Cookies.set(
                "endDate",
                newValue ? newValue.format("YYYY-MM-DD") : ""
              );
            }}
            sx={{
              width: 160,
              "& .MuiInputBase-root": {
                height: 40,
                display: "flex",
                alignItems: "center",
              },

              "& .MuiInputLabel-root": {
                top: `${filters.endDate != null ? 0 : `-20%`}`,
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="age-gender-filters">
        <div className="filter-1">
          <select
            value={filters.ageRange}
            onChange={(e) => {
              const newAgeRange = e.target.value;
              setFilters({ ...filters, ageRange: newAgeRange }); // Update the correct filter key
              Cookies.set("ageRange", newAgeRange); // Update the cookie immediately
            }}
          >
            <option value="all">All Ages</option>
            <option value="15-25">15-25</option>
            <option value=">25">Above 25</option>
          </select>
        </div>

        <div className="filter-1">
          <select
            value={filters.gender}
            onChange={(e) => {
              const newGender = e.target.value;
              setFilters({ ...filters, gender: newGender }); // Update the correct filter key
              Cookies.set("gender", newGender); // Update the cookie immediately
            }}
          >
            <option value="all">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="filter-1">
          <button onClick={resetPreferences}>Reset Preferences</button>
        </div>
      </div>
    </div>
     <div className="share-view">
        <button onClick={generateShareableURL}>Share View</button>
      </div>
  </>
    
  );
}

export default Filters;
