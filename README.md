# Dashboard Project

## 📌 Overview

This is a React-based interactive dashboard that provides visual data insights using bar and line charts. It includes user authentication, filtering options, and a shareable view feature.

## 🚀 Features

- 🔑 **Authentication (Login & Sign-up system)**

- 📊 **Bar and Line Charts for data visualization**

- 🎛 **Filters for date range, age group, and gender**

- 🔗 **Shareable URL for filtered views**

- 🍪 **Persistent Filters using cookies**

## 🛠 Tech Stack

- **Frontend**: React, MUI, Toolpad

- **State Management**: React Hooks

- **Data Handling**: Day.js, Cookies

- **Charts**: MUI X Charts

## 📂 Project Structure
```bash
  /dashboard
  │── /src
  │   ├── /components
  │   │   ├── Auth.js
  │   │   ├── Dashboard.css
  │   │   ├── Dashboard.jsx
  │   │   ├── DashboardLayoutWrapper.css
  │   │   ├── DashboardLayoutWrapper.jsx
  │   │   ├── Filters.css
  │   │   ├── Filters.jsx
  │   │   ├── LoginPage.css
  │   │   ├── LoginPage.jsx
  │   ├── App.jsx
  │   ├── data.json
  │   ├── main.jsx
  │── /public
  │── index.html
  │── package.json
  │── README.md
```

## 📦 Installation & Setup

**Clone the repository**
```bash
  git clone https://github.com/Jija-sarak/dashboard.git
  cd dashboard
```
**Install dependencies**
```bash
  npm install
  npm install @mui/material @emotion/react @emotion/styled
  npm install @mui/icons-material
  npm install @toolpad/core
  npm install @mui/x-charts
  npm install js-cookie
  npm install @mui/x-date-pickers
  npm install dayjs
  npm install react-datepicker
```

**Start the project**
```bash
  npm run dev
```

## 🔑 Authentication

- Users can log in or sign up via the LoginPage.jsx.

- Upon login, the dashboard is accessible.

## 📊 Dashboard Features

- **Bar Chart:** Displays aggregated feature usage.

- **Line Chart:** Shows trends over time for a selected feature.

- **Filters:** Users can filter data based on: Date range, Age group, Gender

- **Persistent Preferences:** Filters are saved using cookies.

- **Reset & Shareable View:** Users can reset or share their custom views via URL.








