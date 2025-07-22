import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css"
import App from "./App.jsx"
import { AuthProvider } from "./context/AuthContext.jsx";
import { BusquedaProvider } from "./context/BusquedaContext.jsx";
import { ClimaProvider } from "./context/ClimaContext.jsx";
import { FechaHoraProvider } from "./context/FechaHoraContext.jsx";
import { VariasUbicacionesProvider } from "./context/VariasUbicacionesContext.jsx";
import { FonVivoFormHoraTempProvider } from "./context/FonVivoFormHoraTempContext.jsx";
import ScrollToTop from "./componentes/scroll_control/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <BusquedaProvider>
          <ClimaProvider>
            <FechaHoraProvider>
              <VariasUbicacionesProvider>
                <FonVivoFormHoraTempProvider>
                  <App />
                </FonVivoFormHoraTempProvider>
              </VariasUbicacionesProvider>
            </FechaHoraProvider>
          </ClimaProvider>
        </BusquedaProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
