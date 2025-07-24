import { useMemo, useCallback } from 'react';

// Importar imágenes verticales
import dayclearVertical from "../assets/img/fondo_estado_tiempo/vertical/dayclear.png";
import nightclearVertical from "../assets/img/fondo_estado_tiempo/vertical/nightclear.png";
import daymostlyclearVertical from "../assets/img/fondo_estado_tiempo/vertical/daymostlyclear.png";
import nightmostlyclearVertical from "../assets/img/fondo_estado_tiempo/vertical/nightmostlyclear.png";
import daypartlycloudyVertical from "../assets/img/fondo_estado_tiempo/vertical/daypartlycloudy.png";
import nightpartlycloudyVertical from "../assets/img/fondo_estado_tiempo/vertical/nightpartlycloudy.png";
import daycloudyVertical from "../assets/img/fondo_estado_tiempo/vertical/daycloudy.png";
import nightcloudyVertical from "../assets/img/fondo_estado_tiempo/vertical/nightcloudy.png";
import dayfogVertical from "../assets/img/fondo_estado_tiempo/vertical/dayfog.png";
import nightfogVertical from "../assets/img/fondo_estado_tiempo/vertical/nightfog.png";
import daydrizzleVertical from "../assets/img/fondo_estado_tiempo/vertical/daydrizzle.png";
import nightdrizzleVertical from "../assets/img/fondo_estado_tiempo/vertical/nightdrizzle.png";
import dayrainVertical from "../assets/img/fondo_estado_tiempo/vertical/dayrain.png";
import nightrainVertical from "../assets/img/fondo_estado_tiempo/vertical/nightrain.png";
import daysnowVertical from "../assets/img/fondo_estado_tiempo/vertical/daysnow.png";
import nightsnowVertical from "../assets/img/fondo_estado_tiempo/vertical/nightsnow.png";
import dayhailVertical from "../assets/img/fondo_estado_tiempo/vertical/dayhail.png";
import nighthailVertical from "../assets/img/fondo_estado_tiempo/vertical/nighthail.png";
import dayshowersVertical from "../assets/img/fondo_estado_tiempo/vertical/dayshowers.png";
import nightshowersVertical from "../assets/img/fondo_estado_tiempo/vertical/nightshowers.png";
import thunderstormVertical from "../assets/img/fondo_estado_tiempo/vertical/thunderstorm.png";

// Importar imágenes horizontales
import dayclearHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/dayclear.png";
import nightclearHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/nightclear.png";
import daymostlyclearHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/daymostlyclear.png";
import nightmostlyclearHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/nightmostlyclear.png";
import daypartlycloudyHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/daypartlycloudy.png";
import nightpartlycloudyHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/nightpartlycloudy.png";
import daycloudyHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/daycloudy.png";
import nightcloudyHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/nightcloudy.png";
import dayfogHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/dayfog.png";
import nightfogHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/nightfog.png";
import daydrizzleHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/daydrizzle.png";
import nightdrizzleHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/nightdrizzle.png";
import dayrainHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/dayrain.png";
import nightrainHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/nightrain.png";
import daysnowHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/daysnow.png";
import nightsnowHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/nightsnow.png";
import dayhailHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/dayhail.png";
import nighthailHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/nighthail.png";
import dayshowersHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/dayshowers.png";
import nightshowersHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/nightshowers.png";
import thunderstormHorizontal from "../assets/img/fondo_estado_tiempo/horizontal/thunderstorm.png";

import { obtenerDescripcionClima } from "../utils/formato";

const useImagenFondo = () => {
  // Función para determinar si es día o noche
  const determinarEsDia = useCallback((hora24) => {
    return hora24 >= 6 && hora24 < 19;
  }, []);

  // Mapeo de imágenes verticales - Memoizado para evitar recreaciones
  const imagenesVerticales = useMemo(() => ({
    // Clear sky
    0: { dia: dayclearVertical, noche: nightclearVertical },
    // Mostly clear
    1: { dia: daymostlyclearVertical, noche: nightmostlyclearVertical },
    // Partly cloudy
    2: { dia: daypartlycloudyVertical, noche: nightpartlycloudyVertical },
    // Cloudy
    3: { dia: daycloudyVertical, noche: nightcloudyVertical },
    // Fog
    45: { dia: dayfogVertical, noche: nightfogVertical },
    48: { dia: dayfogVertical, noche: nightfogVertical },
    // Drizzle
    51: { dia: daydrizzleVertical, noche: nightdrizzleVertical },
    53: { dia: daydrizzleVertical, noche: nightdrizzleVertical },
    55: { dia: daydrizzleVertical, noche: nightdrizzleVertical },
    56: { dia: daydrizzleVertical, noche: nightdrizzleVertical },
    57: { dia: daydrizzleVertical, noche: nightdrizzleVertical },
    // Rain
    61: { dia: dayrainVertical, noche: nightrainVertical },
    63: { dia: dayrainVertical, noche: nightrainVertical },
    65: { dia: dayrainVertical, noche: nightrainVertical },
    66: { dia: dayrainVertical, noche: nightrainVertical },
    67: { dia: dayrainVertical, noche: nightrainVertical },
    // Snow
    71: { dia: daysnowVertical, noche: nightsnowVertical },
    73: { dia: daysnowVertical, noche: nightsnowVertical },
    75: { dia: daysnowVertical, noche: nightsnowVertical },
    // Hail
    77: { dia: dayhailVertical, noche: nighthailVertical },
    // Showers
    80: { dia: dayshowersVertical, noche: nightshowersVertical },
    81: { dia: dayshowersVertical, noche: nightshowersVertical },
    82: { dia: dayshowersVertical, noche: nightshowersVertical },
    85: { dia: dayshowersVertical, noche: nightshowersVertical },
    86: { dia: dayshowersVertical, noche: nightshowersVertical },
    // Thunderstorm (sin jornada específica)
    95: thunderstormVertical,
    96: thunderstormVertical,
    99: thunderstormVertical
  }), []);

  // Mapeo de imágenes horizontales - Memoizado para evitar recreaciones
  const imagenesHorizontales = useMemo(() => ({
    // Clear sky
    0: { dia: dayclearHorizontal, noche: nightclearHorizontal },
    // Mostly clear
    1: { dia: daymostlyclearHorizontal, noche: nightmostlyclearHorizontal },
    // Partly cloudy
    2: { dia: daypartlycloudyHorizontal, noche: nightpartlycloudyHorizontal },
    // Cloudy
    3: { dia: daycloudyHorizontal, noche: nightcloudyHorizontal },
    // Fog
    45: { dia: dayfogHorizontal, noche: nightfogHorizontal },
    48: { dia: dayfogHorizontal, noche: nightfogHorizontal },
    // Drizzle
    51: { dia: daydrizzleHorizontal, noche: nightdrizzleHorizontal },
    53: { dia: daydrizzleHorizontal, noche: nightdrizzleHorizontal },
    55: { dia: daydrizzleHorizontal, noche: nightdrizzleHorizontal },
    56: { dia: daydrizzleHorizontal, noche: nightdrizzleHorizontal },
    57: { dia: daydrizzleHorizontal, noche: nightdrizzleHorizontal },
    // Rain
    61: { dia: dayrainHorizontal, noche: nightrainHorizontal },
    63: { dia: dayrainHorizontal, noche: nightrainHorizontal },
    65: { dia: dayrainHorizontal, noche: nightrainHorizontal },
    66: { dia: dayrainHorizontal, noche: nightrainHorizontal },
    67: { dia: dayrainHorizontal, noche: nightrainHorizontal },
    // Snow
    71: { dia: daysnowHorizontal, noche: nightsnowHorizontal },
    73: { dia: daysnowHorizontal, noche: nightsnowHorizontal },
    75: { dia: daysnowHorizontal, noche: nightsnowHorizontal },
    // Hail
    77: { dia: dayhailHorizontal, noche: nighthailHorizontal },
    // Showers
    80: { dia: dayshowersHorizontal, noche: nightshowersHorizontal },
    81: { dia: dayshowersHorizontal, noche: nightshowersHorizontal },
    82: { dia: dayshowersHorizontal, noche: nightshowersHorizontal },
    85: { dia: dayshowersHorizontal, noche: nightshowersHorizontal },
    86: { dia: dayshowersHorizontal, noche: nightshowersHorizontal },
    // Thunderstorm (sin jornada específica)
    95: thunderstormHorizontal,
    96: thunderstormHorizontal,
    99: thunderstormHorizontal
  }), []);

  // Función principal para obtener imagen de fondo - Memoizada con useCallback
  const obtenerImagenFondo = useCallback((codigoClima, hora24, isMobile, debug = false) => {
    // Validar datos requeridos
    if (codigoClima === null || codigoClima === undefined || hora24 === null || hora24 === undefined) {
      if (debug) console.log('Datos faltantes para imagen de fondo:', { codigoClima, hora24 });
      return null;
    }

    const esDia = determinarEsDia(hora24);
    const imagenesMapeo = isMobile ? imagenesVerticales : imagenesHorizontales;

    // Obtener imagen según el mapeo
    const imagenData = imagenesMapeo[codigoClima];
    
    if (!imagenData) {
      if (debug) console.log('No se encontró imagen para código:', codigoClima);
      return null;
    }

    // Para thunderstorm que no tiene jornada específica
    if (typeof imagenData === 'string') {
      if (debug) console.log('Imagen thunderstorm seleccionada:', imagenData);
      return imagenData;
    }

    // Para imágenes con jornada específica
    const imagenSeleccionada = esDia ? imagenData.dia : imagenData.noche;
    
    if (debug) {
      console.log('Imagen seleccionada:', {
        codigoClima,
        hora24,
        esDia,
        isMobile,
        imagenSeleccionada
      });
    }
    
    return imagenSeleccionada;
  }, [determinarEsDia, imagenesVerticales, imagenesHorizontales]);

  // Función para obtener el estilo de fondo - Memoizada con useCallback
  const obtenerEstiloFondo = useCallback((encendido, imagenFondo) => {
    if (!encendido || !imagenFondo) {
      return {};
    }

    return {
      backgroundImage: `url(${imagenFondo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      // Agregar will-change para optimizar el rendering
      willChange: 'background-image'
    };
  }, []);

  return {
    obtenerImagenFondo,
    obtenerEstiloFondo,
    determinarEsDia
  };
};

export default useImagenFondo;