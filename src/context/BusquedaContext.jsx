import React, { createContext, useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { normalizarTexto, desnormalizarURL } from "../utils/normalizarURL";

export const BusquedaContext = createContext();

export const BusquedaProvider = ({ children }) => {
  const [resultados, setResultados] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [ciudadesColombia, setCiudadesColombia] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const [cargandoCiudadesColombia, setCargandoCiudadesColombia] = useState(false);
  const [cargandoBusquedaCiudad, setCargandoBusquedaCiudad] = useState(false);

  // 🔢 CONTADOR DE PETICIONES DE LA API
  const [peticionesHoy, setPeticionesHoy] = useState(() => {
    return obtenerContadorDelDia();
  });

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 🎯 CACHÉ LOCAL para evitar peticiones repetidas
  const cacheRef = useRef({
    busquedas: new Map(),
    coordenadas: new Map(),
    verificacionesURL: new Map()
  });

  // 🎯 DEBOUNCE timer
  const debounceTimerRef = useRef(null);

  // 📋 LISTA DE RUTAS VÁLIDAS QUE NO DEBEN SER VERIFICADAS
  const rutasValidas = [
    '/',
    '/register',
    '/login',
    '/order-location',
    '/add-city-weather',
    '/manage-location',
    '/error',
    '/terms-of-service',
    '/privacy-policy',
    '/help',
    '/known-issues'
  ];

  // 🔢 FUNCIONES PARA MANEJAR EL CONTADOR DE PETICIONES
  function obtenerFechaHoy() {
    return new Date().toDateString(); // "Mon Dec 25 2023"
  }

  function obtenerContadorDelDia() {
    const hoy = obtenerFechaHoy();
    const datosGuardados = localStorage.getItem('geonames_contador');

    if (datosGuardados) {
      try {
        const datos = JSON.parse(datosGuardados);
        if (datos.fecha === hoy) {
          return datos.contador;
        }
      } catch (error) {
        console.error('Error al leer contador de peticiones:', error);
      }
    }

    // Si no hay datos del día de hoy, empezar en 0
    return 0;
  }

  function incrementarContador() {
    const hoy = obtenerFechaHoy();
    const nuevoContador = peticionesHoy + 1;

    // Actualizar estado
    setPeticionesHoy(nuevoContador);

    // Guardar en localStorage
    const datosParaGuardar = {
      fecha: hoy,
      contador: nuevoContador,
      ultimaActualizacion: new Date().toISOString()
    };

    localStorage.setItem('geonames_contador', JSON.stringify(datosParaGuardar));

    console.log(`📊 Peticiones GeoNames hoy: ${nuevoContador}`);
  }

  function resetearContadorSiEsNuevoDia() {
    const hoy = obtenerFechaHoy();
    const datosGuardados = localStorage.getItem('geonames_contador');

    if (datosGuardados) {
      try {
        const datos = JSON.parse(datosGuardados);
        if (datos.fecha !== hoy) {
          // Es un nuevo día, resetear contador
          setPeticionesHoy(0);
          localStorage.setItem('geonames_contador', JSON.stringify({
            fecha: hoy,
            contador: 0,
            ultimaActualizacion: new Date().toISOString()
          }));
          console.log('🌅 Nuevo día! Contador de peticiones reseteado');
        }
      } catch (error) {
        console.error('Error al verificar fecha del contador:', error);
      }
    }
  }

  const limpiarBusqueda = () => {
    setTerminoBusqueda("");
    setResultados([]);
    // Limpiar debounce pendiente
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };

  // 🔧 Función para comparar ubicaciones de manera flexible
  const compararUbicaciones = (ubicacion1, ubicacion2) => {
    const texto1 = normalizarTexto(ubicacion1);
    const texto2 = normalizarTexto(ubicacion2);
    
    // Comparación exacta
    if (texto1 === texto2) return true;
    
    // Comparación sin considerar separadores (ni guiones ni espacios)
    const sinSeparadores1 = texto1.replace(/[-\s]/g, "");
    const sinSeparadores2 = texto2.replace(/[-\s]/g, "");
    
    return sinSeparadores1 === sinSeparadores2;
  };

  // 🎯 FUNCIÓN PARA VERIFICAR SI ES UNA RUTA VÁLIDA
  const esRutaValida = (pathname) => {
    // Verificar rutas exactas
    if (rutasValidas.includes(pathname)) {
      return true;
    }

    // Verificar si es una ruta dinámica válida (formato /:ciudad/:departamento/:pais)
    const pathRegex = /^\/([a-z0-9]+(?:-[a-z0-9]+)*)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;
    return pathRegex.test(pathname);
  };

  // ✅ FUNCIÓN PARA FILTRAR RESULTADOS CON "UNKNOWN" - CASE INSENSITIVE
  const filtrarResultadosValidos = (ciudades) => {
    return ciudades.filter((item) => {
      // Excluir ciudades que tengan "Unknown" en cualquier campo (case insensitive)
      const tieneUnknown =
        item.ciudad.toLowerCase().includes('unknown') ||
        item.departamento.toLowerCase().includes('unknown') ||
        item.pais.toLowerCase().includes('unknown');

      // También filtrar campos vacíos o null
      const tieneValoresVacios =
        !item.ciudad ||
        !item.departamento ||
        !item.pais ||
        item.ciudad.trim() === '' ||
        item.departamento.trim() === '' ||
        item.pais.trim() === '';

      // Verificar si algún campo tiene solo espacios o caracteres especiales
      const tieneSoloEspacios =
        item.ciudad.trim().length === 0 ||
        item.departamento.trim().length === 0 ||
        item.pais.trim().length === 0;

      // Solo retornar si NO tiene unknown Y NO tiene valores vacíos Y NO tiene solo espacios
      const esValido = !tieneUnknown && !tieneValoresVacios && !tieneSoloEspacios;

      if (!esValido) {
        console.log(`🚫 Filtrando resultado inválido: ${item.ciudad} - ${item.departamento} / ${item.pais}`);
      }

      return esValido;
    });
  };

  // 🎯 FUNCIÓN PARA VERIFICAR SI UN ITEM INDIVIDUAL ES VÁLIDO
  const esItemValido = (ciudad, departamento, pais) => {
    // Verificar Unknown case insensitive
    const tieneUnknown =
      (ciudad && ciudad.toLowerCase().includes('unknown')) ||
      (departamento && departamento.toLowerCase().includes('unknown')) ||
      (pais && pais.toLowerCase().includes('unknown'));

    // Verificar valores vacíos
    const tieneValoresVacios =
      !ciudad || !departamento || !pais ||
      ciudad.trim() === '' || departamento.trim() === '' || pais.trim() === '';

    return !tieneUnknown && !tieneValoresVacios;
  };

  // 🎯 FUNCIÓN DE BÚSQUEDA OPTIMIZADA CON CACHÉ Y CONTADOR
  const buscarCiudadesInterno = useCallback(async (termino) => {
    const terminoNormalizado = normalizarTexto(termino);

    if (terminoNormalizado.length < 2) {
      setResultados([]);
      return;
    }

    // ✅ Verificar caché primero
    const cacheKey = terminoNormalizado;
    if (cacheRef.current.busquedas.has(cacheKey)) {
      console.log(`📦 Usando caché para: "${termino}" (sin consumir API)`);
      setResultados(cacheRef.current.busquedas.get(cacheKey));
      return;
    }

    setCargandoBusquedaCiudad(true);

    try {
      // 🔢 INCREMENTAR CONTADOR ANTES DE LA PETICIÓN
      incrementarContador();

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/geonames/busqueda`, {
        params: {q: termino, maxRows: 30, lang: "en"}
      });

      console.log(`🔍 Respuesta de GeoNames para "${termino}":`, response.data.geonames.length, 'resultados');

      const ciudadesCrudas = response.data.geonames.map((item) => {
        const ciudad = item.name || "Unknown";
        const departamento = item.adminName1 || "Unknown";
        const pais = item.countryName || "Unknown";

        return {
          ciudad,
          ciudadNormalizada: normalizarTexto(ciudad),
          departamento,
          pais,
          lat: item.lat, // ✅ Guardar coordenadas desde el inicio
          lon: item.lng
        };
      });

      // ✅ APLICAR FILTRO PARA EXCLUIR "UNKNOWN" ANTES DE OTRAS OPERACIONES
      const ciudadesValidas = filtrarResultadosValidos(ciudadesCrudas);
      console.log(`✅ Después de filtrar Unknown: ${ciudadesValidas.length} resultados válidos`);

      const ciudadesFiltradas = ciudadesValidas
        .filter((item) => {
          const conjunto = `${item.ciudad} - ${item.departamento} / ${item.pais}`;
          const conjuntoNormalizado = normalizarTexto(conjunto);
          return conjuntoNormalizado.includes(terminoNormalizado);
        })
        .sort((a, b) => {
          return a.ciudadNormalizada.localeCompare(b.ciudadNormalizada);
        });

      const sinDuplicados = ciudadesFiltradas.filter((item, index, self) => {
        const id = `${item.ciudad}-${item.departamento}/${item.pais}`;
        return index === self.findIndex((t) => `${t.ciudad}-${t.departamento}/${t.pais}` === id);
      });

      console.log(`📊 Resultados finales: ${sinDuplicados.length} ciudades`);

      // ✅ Guardar en caché
      cacheRef.current.busquedas.set(cacheKey, sinDuplicados);
      console.log(`💾 Guardado en caché: "${termino}" (${sinDuplicados.length} resultados válidos)`);

      setResultados(sinDuplicados);
    } catch (error) {
      console.error("Error al buscar ciudades con GeoNames:", error);
      setResultados([]);
    } finally {
      setCargandoBusquedaCiudad(false);
    }
  }, [peticionesHoy]); // Dependencia para que se recalcule con el contador

  // 🎯 FUNCIÓN CON DEBOUNCE
  const buscarCiudades = useCallback((termino) => {
    setTerminoBusqueda(termino);

    // Limpiar timer anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // ✅ DEBOUNCE: Esperar 500ms después de que el usuario deje de escribir
    debounceTimerRef.current = setTimeout(() => {
      console.log(`🔍 Buscando (con delay): "${termino}"`);
      buscarCiudadesInterno(termino);
    }, 500);
  }, [buscarCiudadesInterno]);

  // 🎯 OPTIMIZACIÓN: Una sola petición con múltiples ciudades + CONTADOR
  const obtenerCiudadesColombia = async () => {
    setCargandoCiudadesColombia(true);

    // Lista de ciudades principales
    const nombresCiudades = [
      "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena",
      "Bucaramanga", "Pereira", "Santa Marta", "Cúcuta", "Manizales",
      "Ibagué", "Villavicencio", "Neiva", "Popayán", "Montería",
      "Sincelejo", "Armenia", "Riohacha", "Valledupar", "Tunja"
    ];

    try {
      // 🔢 INCREMENTAR CONTADOR - Petición principal
      incrementarContador();

      // ✅ UNA SOLA petición para obtener ciudades principales de Colombia
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/geonames/busqueda-colombia`, {
        params: {country: "CO", featureClass: "P", featureCode: "PPLA", maxRows: 50, lang: "en"}
      });

      const ciudadesAPI = response.data.geonames || [];

      // Filtrar solo las ciudades que nos interesan y agregar otras importantes
      const ciudadesImportantes = [];

      for (const nombre of nombresCiudades) {
        // Buscar en los resultados de la API
        let ciudadEncontrada = ciudadesAPI.find(item =>
          normalizarTexto(item.name).includes(normalizarTexto(nombre)) ||
          normalizarTexto(nombre).includes(normalizarTexto(item.name))
        );

        // Si no se encuentra en capitales, hacer búsqueda específica (solo para casos necesarios)
        if (!ciudadEncontrada) {
          try {
            // 🔢 INCREMENTAR CONTADOR - Petición específica
            incrementarContador();

            const responseEspecifica = await axios.get(`${import.meta.env.VITE_API_URL}/api/geonames/busqueda-colombia`, {
              params: {q: `${nombre}, Colombia`, maxRows: 1, country: "CO", featureClass: "P", lang: "en"}
            });
            ciudadEncontrada = responseEspecifica.data.geonames[0];
            // Pequeño delay solo cuando es necesario hacer petición adicional
            await new Promise(resolve => setTimeout(resolve, 300));
          } catch (error) {
            console.error(`Error específico para ${nombre}:`, error.message);
            continue;
          }
        }

        if (ciudadEncontrada) {
          const ciudad = ciudadEncontrada.name;
          const departamento = ciudadEncontrada.adminName1;
          const pais = ciudadEncontrada.countryName;

          // ✅ VALIDAR QUE NO TENGA "DESCONOCIDO" Y TENGA DATOS COMPLETOS
          if (ciudad && departamento && pais === "Colombia" &&
            !ciudad.toLowerCase().includes('Unknown') &&
            !departamento.toLowerCase().includes('Unknown') &&
            !pais.toLowerCase().includes('Unknown')) {

            ciudadesImportantes.push({
              ciudad,
              departamento,
              pais,
              lat: ciudadEncontrada.lat,
              lon: ciudadEncontrada.lng,
              id: `${ciudad}-${departamento}`,
            });

            // ✅ Guardar coordenadas en caché
            const coordKey = `${ciudad}-${departamento}-${pais}`;
            cacheRef.current.coordenadas.set(coordKey, {
              lat: ciudadEncontrada.lat,
              lon: ciudadEncontrada.lng
            });
          }
        }
      }

      setCiudadesColombia(ciudadesImportantes);
      console.log(`🇨🇴 Cargadas ${ciudadesImportantes.length} ciudades válidas de Colombia`);

    } catch (error) {
      console.error("Error al obtener ciudades de Colombia:", error);
    } finally {
      setCargandoCiudadesColombia(false);
    }
  };

  // 🎯 COORDENADAS OPTIMIZADAS CON CACHÉ Y CONTADOR
  const obtenerCoordenadas = async (ciudad, departamento, pais) => {
    const coordKey = `${ciudad}-${departamento}-${pais}`;

    // ✅ Verificar caché primero
    if (cacheRef.current.coordenadas.has(coordKey)) {
      console.log(`📍 Coordenadas desde caché: ${ciudad} (sin consumir API)`);
      return cacheRef.current.coordenadas.get(coordKey);
    }

    try {
      // 🔢 INCREMENTAR CONTADOR
      incrementarContador();

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/geonames/busqueda`, {
        params: {q: `${ciudad}, ${departamento}, ${pais}`, maxRows: 1}
      });

      const data = response.data.geonames[0];
      if (data) {
        const coordenadas = {
          lat: data.lat,
          lon: data.lng
        };

        // ✅ Guardar en caché
        cacheRef.current.coordenadas.set(coordKey, coordenadas);
        console.log(`📍 Coordenadas guardadas en caché: ${ciudad}`);

        return coordenadas;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      return null;
    }
  };

  // Verificación de URL con comparación flexible
  useEffect(() => {
    const verificarRutaManual = async () => {
      // 🚫 VERIFICAR SI ES UNA RUTA VÁLIDA ANTES DE PROCESARLA
      if (rutasValidas.includes(location.pathname)) {
        console.log(`✅ Ruta válida reconocida: ${location.pathname}`);
        return; // No procesar rutas válidas estáticas
      }

      // ✅ PRIMER PASO: Verificar si la URL tiene mayúsculas y redirigir
      const pathRegexConMayusculas = /^\/([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)\/([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)\/([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)$/;
      const matchConMayusculas = location.pathname.match(pathRegexConMayusculas);

      if (matchConMayusculas) {
        // Convertir toda la URL a minúsculas
        const urlEnMinusculas = location.pathname.toLowerCase();

        // Si la URL actual tiene mayúsculas, redirigir a minúsculas
        if (location.pathname !== urlEnMinusculas) {
          console.log(`🔄 Redirigiendo URL con mayúsculas: ${location.pathname} → ${urlEnMinusculas}`);
          navigate(urlEnMinusculas, { replace: true });
          return; // Salir aquí para evitar verificación adicional
        }
      }

      // ✅ SEGUNDO PASO: Verificar si cumple el formato correcto (solo minúsculas)
      const pathRegex = /^\/([a-z0-9]+(?:-[a-z0-9]+)*)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;
      const match = location.pathname.match(pathRegex);

      if (!match) {
        // Solo redirigir a error si no es una ruta válida conocida
        if (!esRutaValida(location.pathname)) {
          console.log(`❌ URL no válida: ${location.pathname} - Redirigiendo a /error`);
          
          navigate("/error");
        }
        return;
      }

      const [_, ciudadURL, departamentoURL, paisURL] = match;
      const urlKey = `${ciudadURL}-${departamentoURL}-${paisURL}`;

      // ✅ Verificar caché de URLs
      if (cacheRef.current.verificacionesURL.has(urlKey)) {
        console.log(`🔗 URL verificada desde caché: ${location.pathname} (sin consumir API)`);
        const ciudadCacheada = cacheRef.current.verificacionesURL.get(urlKey);

        // ✅ VERIFICAR QUE LA CIUDAD CACHEADA SEA VÁLIDA
        if (esItemValido(ciudadCacheada.ciudad, ciudadCacheada.departamento, ciudadCacheada.pais)) {
          setCiudadSeleccionada(ciudadCacheada);
        } else {
          console.log(`🚫 Ciudad cacheada tiene valores Unknown, redirigiendo a error`);
          navigate("/error");
        }
        return;
      }

      // Convertir URLs de vuelta a texto comparable
      const ciudadParaBuscar = desnormalizarURL(ciudadURL);
      const departamentoParaBuscar = desnormalizarURL(departamentoURL);
      const paisParaBuscar = desnormalizarURL(paisURL);

      try {
        // 🔢 INCREMENTAR CONTADOR
        incrementarContador();

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/geonames/busqueda`, {
          params: {
            q: `${ciudadParaBuscar}, ${departamentoParaBuscar}, ${paisParaBuscar}`,
            maxRows: 10, lang: "en"}
        });

        // Usar comparación flexible
        const coincidencia = response.data.geonames.find((item) => {
          const ciudadAPI = item.name || "";
          const departamentoAPI = item.adminName1 || "";
          const paisAPI = item.countryName || "";

          // Usar la nueva función de comparación flexible
          const ciudadCoincide = compararUbicaciones(ciudadAPI, ciudadParaBuscar);
          const departamentoCoincide = compararUbicaciones(departamentoAPI, departamentoParaBuscar);
          const paisCoincide = compararUbicaciones(paisAPI, paisParaBuscar);

          console.log('🔍 Comparando con función flexible:', {
            ciudad: `"${ciudadAPI}" ≈ "${ciudadParaBuscar}" = ${ciudadCoincide}`,
            departamento: `"${departamentoAPI}" ≈ "${departamentoParaBuscar}" = ${departamentoCoincide}`,
            pais: `"${paisAPI}" ≈ "${paisParaBuscar}" = ${paisCoincide}`
          });

          return ciudadCoincide && departamentoCoincide && paisCoincide;
        });

        if (coincidencia) {
          const ciudad = coincidencia.name || "Unknown";
          const departamento = coincidencia.adminName1 || "Unknown";
          const pais = coincidencia.countryName || "Unknown";

          // ✅ VERIFICAR QUE LA COINCIDENCIA SEA VÁLIDA ANTES DE USARLA
          if (!esItemValido(ciudad, departamento, pais)) {
            console.log(`🚫 Ciudad encontrada tiene valores Unknown: ${ciudad} - ${departamento} / ${pais}`);
            navigate("/error");
            return;
          }

          const ciudadData = {
            ciudad,
            departamento,
            pais,
            lat: coincidencia.lat,
            lon: coincidencia.lng,
          };

          // ✅ Guardar en caché de verificaciones URL
          cacheRef.current.verificacionesURL.set(urlKey, ciudadData);
          console.log(`🔗 URL verificada y guardada: ${location.pathname}`);
          console.log(`✅ Ciudad encontrada:`, ciudadData);

          setCiudadSeleccionada(ciudadData);
        } else {
          console.log('❌ No se encontró coincidencia para:', {
            ciudadURL,
            departamentoURL,
            paisURL
          });
          navigate("/error");

        }
      } catch (error) {
        console.error("Error al verificar ciudad por URL:", error);
        navigate("/error");

      }
    };

    verificarRutaManual();
  }, [location.pathname, navigate]);

  // 🔢 VERIFICAR SI ES UN NUEVO DÍA AL CARGAR
  useEffect(() => {
    resetearContadorSiEsNuevoDia();

    // Verificar cada hora si cambió el día
    const interval = setInterval(() => {
      resetearContadorSiEsNuevoDia();
    }, 60 * 60 * 1000); // cada hora

    return () => clearInterval(interval);
  }, []);

  // 🧹 Cleanup del debounce
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <BusquedaContext.Provider value={{
      resultados,
      buscarCiudades,
      terminoBusqueda,
      limpiarBusqueda,
      ciudadesColombia,
      obtenerCiudadesColombia,
      ciudadSeleccionada,
      setCiudadSeleccionada,
      obtenerCoordenadas,
      cargandoBusquedaCiudad,
      cargandoCiudadesColombia,
      peticionesHoy,
      resetearContadorSiEsNuevoDia
    }}>
      {children}
    </BusquedaContext.Provider>
  );
};