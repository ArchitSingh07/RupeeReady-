import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { FinancialDataProvider } from "./contexts/FinancialDataContext";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <FinancialDataProvider>
      <App />
    </FinancialDataProvider>
  </AuthProvider>
);
