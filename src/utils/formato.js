export const obtenerDescripcionClima = (codigo) => {
    const descripciones = {
        0: "Clear",
        1: "Mostly clear",
        2: "Partly cloudy",
        3: "Cloudy",
        45: "Fog",
        48: "Fog with frost",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Light rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Light snow",
        73: "Moderate snow",
        75: "Heavy snow",
        77: "Light hail",
        80: "Light showers",
        81: "Moderate showers",
        82: "Heavy showers",
        85: "Light snow showers",
        86: "Heavy snow showers",
        95: "Light to moderate thunderstorm",
        96: "Thunderstorm with light hail",
        99: "Thunderstorm with heavy hail"
    };

    return descripciones[codigo] || "Unknown climate";
};

// 1. Precipitaciones
export const obtenerEstadoPrecipitacion = (codigo) => {
    const codigosLluvia = [51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
    const codigosNieve = [71, 73, 75, 77, 85, 86]; // Códigos de nieve y granizo
    
    if (codigosNieve.includes(codigo)) {
        return "Esta nevando";
    }
    return codigosLluvia.includes(codigo) ? "It's raining" : "No precipitation";
};

// 2. Humedad
export const formatearHumedad = (valor) => `${valor}%`;

// 3. Dirección del viento
export const obtenerDireccionViento = (grados, velocidad) => {
    const direcciones = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
        "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
    const index = Math.round(grados / 22.5) % 16;
    return `${direcciones[index]} ${velocidad} km/h`;
};

// 4. Índice UV
export const obtenerIndiceUV = (uv) => {
    if (uv <= 2) return `Low (${uv})`;
    if (uv <= 5) return `Moderate (${uv})`;
    if (uv <= 7) return `High (${uv})`;
    if (uv <= 10) return `Very high (${uv})`;
    return `Extreme (${uv})`;
};