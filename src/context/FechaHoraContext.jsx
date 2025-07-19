import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BusquedaContext } from "./BusquedaContext";

export const FechaHoraContext = createContext();

export const FechaHoraProvider = ({ children }) => {
  const { ciudadSeleccionada } = useContext(BusquedaContext);
  const [hora12, setHora12] = useState("");
  const [ampm, setAmpm] = useState("");
  const [fechaLarga, setFechaLarga] = useState("");
  const [hora24, setHora24] = useState(null);
  const [hora24Completa, setHora24Completa] = useState(""); 
  const [zoneName, setZoneName] = useState(""); 
  const [abbreviation, setAbbreviation] = useState(""); 
  const [cargandoFechaHora, setCargandoFechaHora] = useState(false);
  const [datosIniciales, setDatosIniciales] = useState(false);

  const obtenerFechaHora = async (esActualizacionPeriodica = false) => {
    if (!ciudadSeleccionada) return;

    if (!esActualizacionPeriodica) {
      setCargandoFechaHora(true);
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/timezonedb/fecha-hora`, {
        params: {
          ciudad: ciudadSeleccionada.ciudad,
          departamento: ciudadSeleccionada.departamento,
          pais: ciudadSeleccionada.pais,
        },
      });

      const { hora12, ampm, fechaLarga, hora24, hora24Completa, zoneName, abbreviation } = response.data;

      setHora12(hora12);
      setAmpm(ampm);
      setFechaLarga(fechaLarga);
      setHora24(hora24);
      setHora24Completa(hora24Completa); 
      setZoneName(zoneName); 
      setAbbreviation(abbreviation); 

      if (!datosIniciales) {
        setDatosIniciales(true);
      }

    } catch (error) {
      console.error("Error al obtener la fecha y hora desde el backend:", error.message);
    } finally {
      if (!esActualizacionPeriodica) {
        setCargandoFechaHora(false);
      }
    }
  };

  useEffect(() => {
    setDatosIniciales(false);
    setCargandoFechaHora(false);

    obtenerFechaHora(); // Carga inicial

    const intervalo = setInterval(() => {
      obtenerFechaHora(true); // Actualización periódica
    }, 60000);

    return () => clearInterval(intervalo);
  }, [ciudadSeleccionada]);

  return (
    <FechaHoraContext.Provider
      value={{
        hora12,
        ampm,
        fechaLarga,
        hora24,
        hora24Completa, 
        zoneName,
        abbreviation,
        cargandoFechaHora,
        datosIniciales,
      }}
    >
      {children}
    </FechaHoraContext.Provider>
  );
};