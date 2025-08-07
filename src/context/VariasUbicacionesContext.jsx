import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { BusquedaContext } from "./BusquedaContext";
import { ClimaContext } from "./ClimaContext";

export const VariasUbicacionesContext = createContext();

export const VariasUbicacionesProvider = ({ children }) => {
  const [ubicaciones, setUbicaciones] = useState(() => {
    const almacenadas = localStorage.getItem("ubicaciones");
    return almacenadas ? JSON.parse(almacenadas) : [];
  });

  const [climasUbicaciones, setClimasUbicaciones] = useState(() => {
    const almacenados = localStorage.getItem("climasUbicaciones");
    return almacenados ? JSON.parse(almacenados) : {};
  });

  const [ubicacionActiva, setUbicacionActiva] = useState(() => {
    const activa = localStorage.getItem("ubicacionActiva");
    return activa ? JSON.parse(activa) : null;
  });

  const { ciudadSeleccionada, setCiudadSeleccionada } = useContext(BusquedaContext);
  const { clima } = useContext(ClimaContext);

  const ciudadEnEsperaRef = useRef(null);

  // Función para verificar si una ubicación tiene clima válido
  const tieneClimaValido = (ubicacionId) => {
    const clima = climasUbicaciones[ubicacionId];
    return clima &&
      clima.temperatura !== null &&
      clima.temperatura !== undefined &&
      clima.codigoClima !== null &&
      clima.codigoClima !== undefined;
  };

  // Función para obtener ubicaciones con clima válido
  const obtenerUbicacionesValidas = () => {
    return ubicaciones.filter(ubicacion => tieneClimaValido(ubicacion.id));
  };

  // Función para encontrar la primera ubicación válida
  const obtenerPrimeraUbicacionValida = () => {
    const ubicacionesValidas = obtenerUbicacionesValidas();
    return ubicacionesValidas.length > 0 ? ubicacionesValidas[0] : null;
  };

  // Función para validar y establecer ubicación activa automáticamente
  const validarYEstablecerUbicacionActiva = () => {
    if (!ubicacionActiva || !tieneClimaValido(ubicacionActiva.id)) {
      const primeraValida = obtenerPrimeraUbicacionValida();
      if (primeraValida) {
        setUbicacionActiva(primeraValida);
        // Actualizar también la ciudad seleccionada en BusquedaContext
        setCiudadSeleccionada({
          ciudad: primeraValida.ciudad,
          departamento: primeraValida.departamento,
          pais: primeraValida.pais,
          lat: primeraValida.lat,
          lon: primeraValida.lon
        });
        return primeraValida;
      } else {
        setUbicacionActiva(null);
        return null;
      }
    }
    return ubicacionActiva;
  };

  // Efecto para validar al cargar el componente
  useEffect(() => {
    // Solo ejecutar si hay ubicaciones pero no hay ubicación activa válida
    if (ubicaciones.length > 0 && (!ubicacionActiva || !tieneClimaValido(ubicacionActiva.id))) {
      validarYEstablecerUbicacionActiva();
    }
  }, [ubicaciones, climasUbicaciones]);

  // Efecto para sincronizar la ciudad seleccionada del BusquedaContext
  useEffect(() => {
    if (!ciudadSeleccionada) return;

    const existe = ubicaciones.find(
      (ubicacion) =>
        ubicacion.ciudad === ciudadSeleccionada.ciudad &&
        ubicacion.departamento === ciudadSeleccionada.departamento &&
        ubicacion.pais === ciudadSeleccionada.pais
    );

    if (!existe) {
      const nuevaUbicacion = {
        id: Date.now(),
        ciudad: ciudadSeleccionada.ciudad,
        departamento: ciudadSeleccionada.departamento,
        pais: ciudadSeleccionada.pais,
        lat: ciudadSeleccionada.lat,
        lon: ciudadSeleccionada.lon,
        fechaAgregada: new Date().toISOString()
      };

      setUbicaciones(prev => [...prev, nuevaUbicacion]);
      ciudadEnEsperaRef.current = nuevaUbicacion;
    } else {
      ciudadEnEsperaRef.current = existe;
    }
  }, [ciudadSeleccionada]);

  // Cuando llega el clima actualizado
  useEffect(() => {
    const ciudadPendiente = ciudadEnEsperaRef.current;

    if (clima && ciudadPendiente) {
      // Verificar si el clima es válido
      const climaEsValido = clima.temperatura !== null &&
        clima.temperatura !== undefined &&
        clima.codigoClima !== null &&
        clima.codigoClima !== undefined;

      // Evitar sobrescribir si ya se guardó el clima correcto
      setClimasUbicaciones(prev => ({
        ...prev,
        [ciudadPendiente.id]: {
          temperatura: clima.temperatura,
          codigoClima: clima.codigoClima,
        }
      }));

      // Solo establecer como activa si el clima es válido
      if (climaEsValido) {
        setUbicacionActiva(ciudadPendiente);
      } else {
        // Si el clima no es válido, mantener la ubicación activa anterior si es válida
        // o buscar la primera ubicación válida disponible
        validarYEstablecerUbicacionActiva();
      }

      ciudadEnEsperaRef.current = null; // Limpiar espera
    }
  }, [clima, ubicaciones, climasUbicaciones]);

  // Efecto para validar la ubicación activa cuando cambian los climas
  useEffect(() => {
    if (ubicacionActiva && !tieneClimaValido(ubicacionActiva.id)) {
      validarYEstablecerUbicacionActiva();
    }
  }, [climasUbicaciones]);

  // Función para agregar una nueva ubicación manualmente
  const agregarUbicacion = (datosUbicacion) => {
    const existe = ubicaciones.some(
      (ubicacion) =>
        ubicacion.ciudad === datosUbicacion.ciudad &&
        ubicacion.departamento === datosUbicacion.departamento &&
        ubicacion.pais === datosUbicacion.pais
    );

    if (!existe) {
      const nuevaUbicacion = {
        id: Date.now(),
        ...datosUbicacion,
        fechaAgregada: new Date().toISOString()
      };

      setUbicaciones(prev => [...prev, nuevaUbicacion]);
      
      return nuevaUbicacion;
    }

    return null; // Ya existe
  };

  // Función para eliminar una ubicación
  const eliminarUbicacion = (id) => {
    setUbicaciones(prev => {
      const nuevasUbicaciones = prev.filter(ubicacion => ubicacion.id !== id);
      return nuevasUbicaciones;
    });

    // Eliminar también el clima de esa ubicación
    setClimasUbicaciones(prev => {
      const nuevoEstado = { ...prev };
      delete nuevoEstado[id];
      return nuevoEstado;
    });

    // Si eliminamos la ubicación activa, establecer una nueva automáticamente
    if (ubicacionActiva?.id === id) {
      // Usar setTimeout para permitir que los estados se actualicen primero
      setTimeout(() => {
        validarYEstablecerUbicacionActiva();
      }, 0);
    }
  };

  // Función para cambiar la ubicación activa (solo si tiene clima válido)
  const cambiarUbicacionActiva = (ubicacion) => {
    if (tieneClimaValido(ubicacion.id)) {
      setUbicacionActiva(ubicacion);
      // Sincronizar con BusquedaContext
      setCiudadSeleccionada({
        ciudad: ubicacion.ciudad,
        departamento: ubicacion.departamento,
        pais: ubicacion.pais,
        lat: ubicacion.lat,
        lon: ubicacion.lon
      });
    }
  };

  // Función para obtener la ubicación activa o la primera disponible válida
  const obtenerUbicacionActiva = () => {
    // Primero verificar si la ubicación activa actual es válida
    if (ubicacionActiva && tieneClimaValido(ubicacionActiva.id)) {
      return ubicacionActiva;
    }

    // Si no, buscar la primera ubicación válida
    const primeraValida = obtenerPrimeraUbicacionValida();
    if (primeraValida) {
      // Establecer automáticamente la primera válida como activa
      setUbicacionActiva(primeraValida);
      setCiudadSeleccionada({
        ciudad: primeraValida.ciudad,
        departamento: primeraValida.departamento,
        pais: primeraValida.pais,
        lat: primeraValida.lat,
        lon: primeraValida.lon
      });
      return primeraValida;
    }

    // Si no hay ubicaciones válidas, devolver null en lugar de ciudadSeleccionada
    return null;
  };

  // Función para limpiar todas las ubicaciones
  const limpiarUbicaciones = () => {
    setUbicaciones([]);
    setUbicacionActiva(null);
    setClimasUbicaciones({});
    setCiudadSeleccionada(null);
    
    localStorage.removeItem("ubicaciones");
    localStorage.removeItem("climasUbicaciones");
    localStorage.removeItem("ubicacionActiva");
  };

  const obtenerClimaUbicacion = (id) => {
    return climasUbicaciones[id] || null;
  };

  // Función para verificar si hay ubicaciones disponibles
  const hayUbicacionesDisponibles = () => {
    return obtenerUbicacionesValidas().length > 0;
  };

  useEffect(() => {
    localStorage.setItem("ubicaciones", JSON.stringify(ubicaciones));
  }, [ubicaciones]);

  useEffect(() => {
    if (ubicacionActiva) {
      localStorage.setItem("ubicacionActiva", JSON.stringify(ubicacionActiva));
    } else {
      localStorage.removeItem("ubicacionActiva");
    }
  }, [ubicacionActiva]);

  useEffect(() => {
    localStorage.setItem("climasUbicaciones", JSON.stringify(climasUbicaciones));
  }, [climasUbicaciones]);

  return (
    <VariasUbicacionesContext.Provider
      value={{
        ubicaciones,
        ubicacionActiva,
        agregarUbicacion,
        eliminarUbicacion,
        cambiarUbicacionActiva,
        obtenerUbicacionActiva,
        limpiarUbicaciones,
        climasUbicaciones,
        obtenerClimaUbicacion,
        obtenerUbicacionesValidas,
        tieneClimaValido,
        hayUbicacionesDisponibles,
        validarYEstablecerUbicacionActiva
      }}
    >
      {children}
    </VariasUbicacionesContext.Provider>
  );
};

// Hook personalizado para usar el contexto más fácilmente
export const useVariasUbicaciones = () => {
  const context = useContext(VariasUbicacionesContext);
  if (!context) {
    throw new Error('useVariasUbicaciones debe ser usado dentro de VariasUbicacionesProvider');
  }
  return context;
};