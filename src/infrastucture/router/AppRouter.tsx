import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/Login/Login";
import Dashboard from "../features/Dashboard/Dashboard";
import Configuracion from "../features/Configuracion/Configuracion";
import ProtectedRoute from "../componentes/ProtectedRoute";
import PageLayout from "../layout/PageLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* pública - sin PageLayout */}
        <Route path="/v1/login" element={<Login />} />

        {/* rutas privadas con PageLayout */}
        <Route path="/*" element={
          <PageLayout>
            <Routes>
              <Route
                path="/v1/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/v1/ingresos"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/v1/gastos"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/v1/configuracion"
                element={
                  <ProtectedRoute>
                    <Configuracion />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </PageLayout>
        } />

        {/* fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
