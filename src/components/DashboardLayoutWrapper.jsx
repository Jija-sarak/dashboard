import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Dashboard from "./Dashboard";
import "./DashboardLayoutWrapper.css";
import { useAuth } from "./Auth.js";
import LoginPage from "./LoginPage.jsx";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutWrapper() {
  const { session, authentication } = useAuth();
  const router = useDemoRouter("/dashboard");
  if (!session) {
    return <LoginPage onSignIn={authentication.signIn} />;
  }

  return (
    <AppProvider
      branding={{
        title: "Dashboard",
      }}
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutWrapper;
