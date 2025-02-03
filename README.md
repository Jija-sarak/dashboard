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

- **Frontend**: React, Material UI (MUI), Toolpad

- **State Management**: React Hooks

- **Data Handling**: Day.js, Cookies

- **Charts**: MUI X Charts, Chart.js

- **Backend**: Express, Body-parser, Bcrypt.js, CORS

## 📂 Project Structure
```bash
/dashboard
  │── /frontend
  │   ├── /public
  │   ├── /src
  │   │   ├── /components
  │   │   │   ├── Dashboard.css
  │   │   │   ├── Dashboard.jsx
  │   │   │   ├── DashboardLayoutWrapper.css
  │   │   │   ├── DashboardLayoutWrapper.jsx
  │   │   │   ├── Filters.css
  │   │   │   ├── Filters.jsx
  │   │   │   ├── LoginPage.css
  │   │   │   ├── LoginPage.jsx
  │   │   │   ├── useAuth.js
  │   │   ├── App.jsx
  │   │   ├── main.jsx
  │   │   ├── index.html
  │   │   ├── package.json
  │── /backend
  │── ├── /server.js
  │   ├── /users.json
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
  # Frontend dependencies
    cd frontend
    npm install
    npm install @mui/material @emotion/react @emotion/styled
    npm install @mui/icons-material
    npm install @toolpad/core
    npm install @mui/x-charts
    npm install js-cookie
    npm install @mui/x-date-pickers
    npm install dayjs
    npm install react-datepicker
    npm install react-chartjs-2 chart.js
    npm install chartjs-plugin-zoom

  # Backend dependencies
    cd ../backend
    npm init -y
    npm install express body-parser bcryptjs fs cors
    npm install bcrypt --save
```

**Start the project**
```bash
  # Start frontend
    cd frontend
    npm run dev

  # Start backend
    cd ../backend
    node server.js
```

## 🔑 Authentication

- Users can log in or sign up via the LoginPage.jsx component.
- Upon successful login, the dashboard becomes accessible.
- Authentication status is persisted using local storage (`useAuth.js`).

## 📊 Dashboard Features

- **Bar Chart:** Displays aggregated feature usage.

- **Line Chart:** Shows trends over time for a selected feature.

- **Filters:** Users can filter data based on:
  - Date range
  - Age group
  - Gender

- **Persistent Preferences:** Filters are saved using cookies (`js-cookie`).

- **Reset & Shareable View:** 
  - Users can reset filters to default settings.
  - Generate shareable URLs with selected filters (`Filters.jsx`).








