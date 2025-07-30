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
import { ConexionProvider } from "./context/ConexionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BusquedaProvider>
          <ConexionProvider>
          <ClimaProvider>
            <FechaHoraProvider>
              <VariasUbicacionesProvider>
                <FonVivoFormHoraTempProvider>
                  <App />
                </FonVivoFormHoraTempProvider>
              </VariasUbicacionesProvider>
            </FechaHoraProvider>
          </ClimaProvider>
          </ConexionProvider>
        </BusquedaProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
