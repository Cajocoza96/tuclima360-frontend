import { useMemo, useCallback } from 'react';

const useImagenFondo = () => {
  const determinarEsDia = useCallback((hora24) => {
    return hora24 >= 6 && hora24 < 19;
  }, []);

  const construirRuta = useCallback((orientacion, nombre) => {
    return `/assets/img/fondo_estado_tiempo/${orientacion}/${nombre}.webp`;
  }, []);

  const imagenesVerticales = useMemo(() => ({
    0: { dia: construirRuta("vertical", "dayclear"), noche: construirRuta("vertical", "nightclear") },
    1: { dia: construirRuta("vertical", "daymostlyclear"), noche: construirRuta("vertical", "nightmostlyclear") },
    2: { dia: construirRuta("vertical", "daypartlycloudy"), noche: construirRuta("vertical", "nightpartlycloudy") },
    3: { dia: construirRuta("vertical", "daycloudy"), noche: construirRuta("vertical", "nightcloudy") },
    45: { dia: construirRuta("vertical", "dayfog"), noche: construirRuta("vertical", "nightfog") },
    48: { dia: construirRuta("vertical", "dayfog"), noche: construirRuta("vertical", "nightfog") },
    51: { dia: construirRuta("vertical", "daydrizzle"), noche: construirRuta("vertical", "nightdrizzle") },
    53: { dia: construirRuta("vertical", "daydrizzle"), noche: construirRuta("vertical", "nightdrizzle") },
    55: { dia: construirRuta("vertical", "daydrizzle"), noche: construirRuta("vertical", "nightdrizzle") },
    56: { dia: construirRuta("vertical", "daydrizzle"), noche: construirRuta("vertical", "nightdrizzle") },
    57: { dia: construirRuta("vertical", "daydrizzle"), noche: construirRuta("vertical", "nightdrizzle") },
    61: { dia: construirRuta("vertical", "dayrain"), noche: construirRuta("vertical", "nightrain") },
    63: { dia: construirRuta("vertical", "dayrain"), noche: construirRuta("vertical", "nightrain") },
    65: { dia: construirRuta("vertical", "dayrain"), noche: construirRuta("vertical", "nightrain") },
    66: { dia: construirRuta("vertical", "dayrain"), noche: construirRuta("vertical", "nightrain") },
    67: { dia: construirRuta("vertical", "dayrain"), noche: construirRuta("vertical", "nightrain") },
    71: { dia: construirRuta("vertical", "daysnow"), noche: construirRuta("vertical", "nightsnow") },
    73: { dia: construirRuta("vertical", "daysnow"), noche: construirRuta("vertical", "nightsnow") },
    75: { dia: construirRuta("vertical", "daysnow"), noche: construirRuta("vertical", "nightsnow") },
    77: { dia: construirRuta("vertical", "dayhail"), noche: construirRuta("vertical", "nighthail") },
    80: { dia: construirRuta("vertical", "dayshowers"), noche: construirRuta("vertical", "nightshowers") },
    81: { dia: construirRuta("vertical", "dayshowers"), noche: construirRuta("vertical", "nightshowers") },
    82: { dia: construirRuta("vertical", "dayshowers"), noche: construirRuta("vertical", "nightshowers") },
    85: { dia: construirRuta("vertical", "dayshowers"), noche: construirRuta("vertical", "nightshowers") },
    86: { dia: construirRuta("vertical", "dayshowers"), noche: construirRuta("vertical", "nightshowers") },
    95: construirRuta("vertical", "thunderstorm"),
    96: construirRuta("vertical", "thunderstorm"),
    99: construirRuta("vertical", "thunderstorm")
  }), [construirRuta]);

  const imagenesHorizontales = useMemo(() => ({
    0: { dia: construirRuta("horizontal", "dayclear"), noche: construirRuta("horizontal", "nightclear") },
    1: { dia: construirRuta("horizontal", "daymostlyclear"), noche: construirRuta("horizontal", "nightmostlyclear") },
    2: { dia: construirRuta("horizontal", "daypartlycloudy"), noche: construirRuta("horizontal", "nightpartlycloudy") },
    3: { dia: construirRuta("horizontal", "daycloudy"), noche: construirRuta("horizontal", "nightcloudy") },
    45: { dia: construirRuta("horizontal", "dayfog"), noche: construirRuta("horizontal", "nightfog") },
    48: { dia: construirRuta("horizontal", "dayfog"), noche: construirRuta("horizontal", "nightfog") },
    51: { dia: construirRuta("horizontal", "daydrizzle"), noche: construirRuta("horizontal", "nightdrizzle") },
    53: { dia: construirRuta("horizontal", "daydrizzle"), noche: construirRuta("horizontal", "nightdrizzle") },
    55: { dia: construirRuta("horizontal", "daydrizzle"), noche: construirRuta("horizontal", "nightdrizzle") },
    56: { dia: construirRuta("horizontal", "daydrizzle"), noche: construirRuta("horizontal", "nightdrizzle") },
    57: { dia: construirRuta("horizontal", "daydrizzle"), noche: construirRuta("horizontal", "nightdrizzle") },
    61: { dia: construirRuta("horizontal", "dayrain"), noche: construirRuta("horizontal", "nightrain") },
    63: { dia: construirRuta("horizontal", "dayrain"), noche: construirRuta("horizontal", "nightrain") },
    65: { dia: construirRuta("horizontal", "dayrain"), noche: construirRuta("horizontal", "nightrain") },
    66: { dia: construirRuta("horizontal", "dayrain"), noche: construirRuta("horizontal", "nightrain") },
    67: { dia: construirRuta("horizontal", "dayrain"), noche: construirRuta("horizontal", "nightrain") },
    71: { dia: construirRuta("horizontal", "daysnow"), noche: construirRuta("horizontal", "nightsnow") },
    73: { dia: construirRuta("horizontal", "daysnow"), noche: construirRuta("horizontal", "nightsnow") },
    75: { dia: construirRuta("horizontal", "daysnow"), noche: construirRuta("horizontal", "nightsnow") },
    77: { dia: construirRuta("horizontal", "dayhail"), noche: construirRuta("horizontal", "nighthail") },
    80: { dia: construirRuta("horizontal", "dayshowers"), noche: construirRuta("horizontal", "nightshowers") },
    81: { dia: construirRuta("horizontal", "dayshowers"), noche: construirRuta("horizontal", "nightshowers") },
    82: { dia: construirRuta("horizontal", "dayshowers"), noche: construirRuta("horizontal", "nightshowers") },
    85: { dia: construirRuta("horizontal", "dayshowers"), noche: construirRuta("horizontal", "nightshowers") },
    86: { dia: construirRuta("horizontal", "dayshowers"), noche: construirRuta("horizontal", "nightshowers") },
    95: construirRuta("horizontal", "thunderstorm"),
    96: construirRuta("horizontal", "thunderstorm"),
    99: construirRuta("horizontal", "thunderstorm")
  }), [construirRuta]);

  const obtenerImagenFondo = useCallback((codigoClima, hora24, isMobile) => {
    if (codigoClima === null || codigoClima === undefined || hora24 === null || hora24 === undefined) {
      return null;
    }

    const esDia = determinarEsDia(hora24);
    const imagenesMapeo = isMobile ? imagenesVerticales : imagenesHorizontales;
    const imagenData = imagenesMapeo[codigoClima];

    if (!imagenData) return null;

    return typeof imagenData === 'string' ? imagenData : (esDia ? imagenData.dia : imagenData.noche);
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