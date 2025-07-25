import { useMemo, useCallback } from 'react';

const useImagenFondo = () => {
  const basePath = "/assets/img/fondo_estado_tiempo";

  const determinarEsDia = useCallback((hora24) => {
    return hora24 >= 6 && hora24 < 19;
  }, []);

  const vertical = `${basePath}/vertical`;
  const horizontal = `${basePath}/horizontal`;

  const imagenesVerticales = useMemo(() => ({
    0: { dia: `${vertical}/dayclear.png`, noche: `${vertical}/nightclear.png` },
    1: { dia: `${vertical}/daymostlyclear.png`, noche: `${vertical}/nightmostlyclear.png` },
    2: { dia: `${vertical}/daypartlycloudy.png`, noche: `${vertical}/nightpartlycloudy.png` },
    3: { dia: `${vertical}/daycloudy.png`, noche: `${vertical}/nightcloudy.png` },
    45: { dia: `${vertical}/dayfog.png`, noche: `${vertical}/nightfog.png` },
    48: { dia: `${vertical}/dayfog.png`, noche: `${vertical}/nightfog.png` },
    51: { dia: `${vertical}/daydrizzle.png`, noche: `${vertical}/nightdrizzle.png` },
    53: { dia: `${vertical}/daydrizzle.png`, noche: `${vertical}/nightdrizzle.png` },
    55: { dia: `${vertical}/daydrizzle.png`, noche: `${vertical}/nightdrizzle.png` },
    56: { dia: `${vertical}/daydrizzle.png`, noche: `${vertical}/nightdrizzle.png` },
    57: { dia: `${vertical}/daydrizzle.png`, noche: `${vertical}/nightdrizzle.png` },
    61: { dia: `${vertical}/dayrain.png`, noche: `${vertical}/nightrain.png` },
    63: { dia: `${vertical}/dayrain.png`, noche: `${vertical}/nightrain.png` },
    65: { dia: `${vertical}/dayrain.png`, noche: `${vertical}/nightrain.png` },
    66: { dia: `${vertical}/dayrain.png`, noche: `${vertical}/nightrain.png` },
    67: { dia: `${vertical}/dayrain.png`, noche: `${vertical}/nightrain.png` },
    71: { dia: `${vertical}/daysnow.png`, noche: `${vertical}/nightsnow.png` },
    73: { dia: `${vertical}/daysnow.png`, noche: `${vertical}/nightsnow.png` },
    75: { dia: `${vertical}/daysnow.png`, noche: `${vertical}/nightsnow.png` },
    77: { dia: `${vertical}/dayhail.png`, noche: `${vertical}/nighthail.png` },
    80: { dia: `${vertical}/dayshowers.png`, noche: `${vertical}/nightshowers.png` },
    81: { dia: `${vertical}/dayshowers.png`, noche: `${vertical}/nightshowers.png` },
    82: { dia: `${vertical}/dayshowers.png`, noche: `${vertical}/nightshowers.png` },
    85: { dia: `${vertical}/dayshowers.png`, noche: `${vertical}/nightshowers.png` },
    86: { dia: `${vertical}/dayshowers.png`, noche: `${vertical}/nightshowers.png` },
    95: `${vertical}/thunderstorm.png`,
    96: `${vertical}/thunderstorm.png`,
    99: `${vertical}/thunderstorm.png`,
  }), []);

  const imagenesHorizontales = useMemo(() => ({
    0: { dia: `${horizontal}/dayclear.png`, noche: `${horizontal}/nightclear.png` },
    1: { dia: `${horizontal}/daymostlyclear.png`, noche: `${horizontal}/nightmostlyclear.png` },
    2: { dia: `${horizontal}/daypartlycloudy.png`, noche: `${horizontal}/nightpartlycloudy.png` },
    3: { dia: `${horizontal}/daycloudy.png`, noche: `${horizontal}/nightcloudy.png` },
    45: { dia: `${horizontal}/dayfog.png`, noche: `${horizontal}/nightfog.png` },
    48: { dia: `${horizontal}/dayfog.png`, noche: `${horizontal}/nightfog.png` },
    51: { dia: `${horizontal}/daydrizzle.png`, noche: `${horizontal}/nightdrizzle.png` },
    53: { dia: `${horizontal}/daydrizzle.png`, noche: `${horizontal}/nightdrizzle.png` },
    55: { dia: `${horizontal}/daydrizzle.png`, noche: `${horizontal}/nightdrizzle.png` },
    56: { dia: `${horizontal}/daydrizzle.png`, noche: `${horizontal}/nightdrizzle.png` },
    57: { dia: `${horizontal}/daydrizzle.png`, noche: `${horizontal}/nightdrizzle.png` },
    61: { dia: `${horizontal}/dayrain.png`, noche: `${horizontal}/nightrain.png` },
    63: { dia: `${horizontal}/dayrain.png`, noche: `${horizontal}/nightrain.png` },
    65: { dia: `${horizontal}/dayrain.png`, noche: `${horizontal}/nightrain.png` },
    66: { dia: `${horizontal}/dayrain.png`, noche: `${horizontal}/nightrain.png` },
    67: { dia: `${horizontal}/dayrain.png`, noche: `${horizontal}/nightrain.png` },
    71: { dia: `${horizontal}/daysnow.png`, noche: `${horizontal}/nightsnow.png` },
    73: { dia: `${horizontal}/daysnow.png`, noche: `${horizontal}/nightsnow.png` },
    75: { dia: `${horizontal}/daysnow.png`, noche: `${horizontal}/nightsnow.png` },
    77: { dia: `${horizontal}/dayhail.png`, noche: `${horizontal}/nighthail.png` },
    80: { dia: `${horizontal}/dayshowers.png`, noche: `${horizontal}/nightshowers.png` },
    81: { dia: `${horizontal}/dayshowers.png`, noche: `${horizontal}/nightshowers.png` },
    82: { dia: `${horizontal}/dayshowers.png`, noche: `${horizontal}/nightshowers.png` },
    85: { dia: `${horizontal}/dayshowers.png`, noche: `${horizontal}/nightshowers.png` },
    86: { dia: `${horizontal}/dayshowers.png`, noche: `${horizontal}/nightshowers.png` },
    95: `${horizontal}/thunderstorm.png`,
    96: `${horizontal}/thunderstorm.png`,
    99: `${horizontal}/thunderstorm.png`,
  }), []);

  const obtenerImagenFondo = useCallback((codigoClima, hora24, isMobile, debug = false) => {
    if (codigoClima === null || codigoClima === undefined || hora24 === null || hora24 === undefined) {
      if (debug) console.log('Datos faltantes para imagen de fondo:', { codigoClima, hora24 });
      return null;
    }

    const esDia = determinarEsDia(hora24);
    const imagenesMapeo = isMobile ? imagenesVerticales : imagenesHorizontales;
    const imagenData = imagenesMapeo[codigoClima];

    if (!imagenData) {
      if (debug) console.log('No se encontró imagen para código:', codigoClima);
      return null;
    }

    if (typeof imagenData === 'string') return imagenData;

    return esDia ? imagenData.dia : imagenData.noche;
  }, [determinarEsDia, imagenesVerticales, imagenesHorizontales]);

  const obtenerEstiloFondo = useCallback((encendido, imagenFondo) => {
    if (!encendido || !imagenFondo) return {};
    return {
      backgroundImage: `url(${imagenFondo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
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