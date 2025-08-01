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

import Mantenimiento from "./componentes/mantenimiento/Mantenimiento.jsx";

const estaEnMantenimiento = import.meta.env.VITE_MAINTENANCE === 'true' || import.meta.env.VITE_MAINTENANCE === 'True'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {estaEnMantenimiento ? (
      <Mantenimiento />
    ) : (
      <BrowserRouter>
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
    )}
  </React.StrictMode>
);
