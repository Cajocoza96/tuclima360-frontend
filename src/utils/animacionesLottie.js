// Función para cargar animaciones con manejo de errores
const cargarAnimacionesConErrorHandling = () => {
  try {
    return import.meta.glob("../assets/animaciones/lottie_animation/estado_de_tiempo/*.json", {
      eager: true,
      import: "default",
    });
  } catch (error) {
    console.warn('Error cargando animaciones Lottie:', error);
    return {};
  }
};

// Cargar animaciones con manejo de errores
const animaciones = cargarAnimacionesConErrorHandling();

const obtenerNombreClave = (nombreArchivo) => {
  return nombreArchivo
    .split("/")
    .pop()
    .replace(".json", "")
    .toLowerCase();
};

// Mapeo para animaciones de día
const codigosClimaToDia = {
  0: "dayclear",
  1: "daymostlyclear",
  2: "daypartlycloudy",
  3: "cloudy",
  45: "dayfog",
  48: "dayfogwithfrost",
  51: "lightdrizzle",
  53: "moderatedrizzle",
  55: "densedrizzle",
  56: "lightfreezingdrizzle",
  57: "densefreezingdrizzle",
  61: "lightrain",
  63: "moderaterain",
  65: "heavyrain",
  66: "lightfreezingrain",
  67: "heavyfreezingrain",
  71: "lightsnow",
  73: "moderatesnow",
  75: "heavysnow",
  77: "lighthail",
  80: "daylightshowers",
  81: "daymoderateshowers",
  82: "dayheavyshowers",
  85: "daylightsnowshowers",
  86: "dayheavysnowshowers",
  95: "lighttomoderatethunderstorm",
  96: "thunderstormwithlighthail",
  99: "thunderstormwithheavyhail"
};

// Mapeo para animaciones de noche
const codigosClimaToNoche = {
  0: "nightclear",
  1: "nightmostlyclear",
  2: "nightpartlycloudy",
  45: "nightfog",
  48: "nightfogwithfrost",
  80: "nightlightshowers",
  81: "nightmoderateshowers",
  82: "nightheavyshowers",
  85: "nightlightsnowshowers",
  86: "nightheavysnowshowers",
};

// Función para determinar si es de noche basado en la hora (formato 24h)
const esDeNoche = (hora24) => {
  // Considera noche desde las 19:00 hasta las 05:59
  return hora24 >= 19 || hora24 < 6;
};

// Función segura para buscar animaciones
const buscarAnimacionSegura = (codigo, mapeoNombres) => {
  try {
    const nombre = mapeoNombres[codigo];
    if (!nombre) return null;
    
    const animacion = Object.entries(animaciones).find(([ruta]) => {
      try {
        return obtenerNombreClave(ruta).includes(nombre);
      } catch (error) {
        console.warn(`Error procesando ruta de animación: ${ruta}`, error);
        return false;
      }
    });
    
    return animacion ? animacion[1] : null;
  } catch (error) {
    console.warn(`Error buscando animación para código ${codigo}:`, error);
    return null;
  }
};

// Crear objetos de animaciones para día y noche
export const animacionesClimaDay = {};
export const animacionesClimaNight = {};

// Cargar animaciones de día con manejo de errores
for (const codigo in codigosClimaToDia) {
  const animacion = buscarAnimacionSegura(codigo, codigosClimaToDia);
  if (animacion) {
    animacionesClimaDay[codigo] = animacion;
  }
}

// Cargar animaciones de noche con manejo de errores
for (const codigo in codigosClimaToNoche) {
  const animacion = buscarAnimacionSegura(codigo, codigosClimaToNoche);
  if (animacion) {
    animacionesClimaNight[codigo] = animacion;
  }
}

// Función principal para obtener la animación correcta según la hora
export const obtenerAnimacionClima = (codigoClima, hora24) => {
  try {
    // Si hora24 no está disponible aún, usar animación de día por defecto
    if (hora24 === null || hora24 === undefined) {
      return animacionesClimaDay[codigoClima] || null;
    }
    
    if (esDeNoche(hora24)) {
      return animacionesClimaNight[codigoClima] || animacionesClimaDay[codigoClima] || null;
    }
    return animacionesClimaDay[codigoClima] || null;
  } catch (error) {
    console.warn(`Error obteniendo animación para código ${codigoClima}:`, error);
    return null;
  }
};

// Mantener compatibilidad con el código existente (solo día)
export const animacionesClima = animacionesClimaDay;

// Función para verificar si las animaciones están disponibles
export const verificarAnimacionesDisponibles = () => {
  const totalDia = Object.keys(animacionesClimaDay).length;
  const totalNoche = Object.keys(animacionesClimaNight).length;
  
  console.log(`Animaciones cargadas - Día: ${totalDia}, Noche: ${totalNoche}`);
  
  return {
    dia: totalDia,
    noche: totalNoche,
    total: totalDia + totalNoche
  };
};

// Función para precargar animaciones críticas
export const precargarAnimacionesCriticas = () => {
  const animacionesCriticas = [0, 1, 2, 3, 61, 63, 65]; // Códigos más comunes
  
  animacionesCriticas.forEach(codigo => {
    try {
      const animacionDia = animacionesClimaDay[codigo];
      const animacionNoche = animacionesClimaNight[codigo];
      
      if (animacionDia) {
        // Intentar acceder a la animación para forzar su carga
        JSON.stringify(animacionDia);
      }
      
      if (animacionNoche) {
        JSON.stringify(animacionNoche);
      }
    } catch (error) {
      console.warn(`Error precargando animación ${codigo}:`, error);
    }
  });
};