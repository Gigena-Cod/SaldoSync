import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/Login/Login";
import Dashboard from "../features/Dashboard/Dashboard";
import ProtectedRoute from "../componentes/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* pública */}
        <Route path="/v1/login" element={<Login />} />

        {/* privada */}
        <Route
          path="/v1/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
