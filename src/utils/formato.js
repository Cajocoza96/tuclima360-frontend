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

//Mensaje Segun Temperatura - para Celsius y Fahrenheit
export const obtenerMensajeTemperatura = (temp, esCelsius = true) => {
    if (esCelsius) {
        // Rangos para Celsius
        if (temp <= 0) return "Below zero temperatures, risk of frostbite. Wear thermal clothing.";
        if (temp <= 10) return "It's quite cold, dress warmly in several layers.";
        if (temp <= 15) return "Cool weather, a light jacket will suffice.";
        if (temp <= 25) return "Pleasant temperature, ideal for outdoor activities.";
        if (temp <= 30) return "Warm and comfortable weather to go out.";
        if (temp <= 35) return "It's hot, stay hydrated.";
        return "Extreme heat! Drink plenty of water.";
    } else {
        // Rangos para Fahrenheit
        if (temp <= 32) return "Below zero temperatures, risk of frostbite. Wear thermal clothing.";
        if (temp <= 50) return "It's quite cold, dress warmly in several layers.";
        if (temp <= 59) return "Cool weather, a light jacket will suffice.";
        if (temp <= 77) return "Pleasant temperature, ideal for outdoor activities.";
        if (temp <= 86) return "Warm and comfortable weather to go out.";
        if (temp <= 95) return "It's hot, stay hydrated.";
        return "Extreme heat! Drink plenty of water.";
    }
};

//Mensaje Segun Humedad
export const obtenerMensajeHumedad = (humedad) => {
    if (humedad <= 25) return "Very dry environment, consider using a humidifier or moisturizer.";
    if (humedad <= 40) return "The environment is dry, which can cause dryness in the skin and throat.";
    if (humedad <= 60) return "Humidity at optimal levels for comfort.";
    if (humedad <= 75) return "Slightly high humidity, you may feel a bit muggy.";
    return "Very humid environment, feeling of oppressive heat and possible condensation.";
};

//Mensaje Segun Direccion Y Velocidad Del Viento
export const obtenerMensajeViento = (direccion, velocidad) => {
    if (velocidad < 5) return `Very soft breeze from the direction ${direccion}, faint.`;
    if (velocidad < 15) return `Light wind from the direction ${direccion}, pleasant and refreshing.`;
    if (velocidad < 25) return `Moderate wind from the direction ${direccion}, it is clearly felt.`;
    if (velocidad < 40) return `Strong wind from the direction ${direccion}, can make walking difficult.`;
    if (velocidad < 60) return `Very strong wind from the direction ${direccion}, caution outdoors.`;
    return `Dangerous winds from the direction ${direccion}, stay indoors if possible.`;
};

//Mensaje Segun Indice UV
export const obtenerMensajeUV = (uv) => {
    if (uv <= 2) return "Low UV index, minimal risk. You can stay outdoors without worry.";
    if (uv <= 5) return "Moderate solar radiation, wear sunglasses and some protection if you will be outside for a long time.";
    if (uv <= 7) return "High UV index, use SPF 30+ sunscreen, hat and sunglasses.";
    if (uv <= 10) return "Very high radiation, limit exposure, use full protection.";
    return "Extreme UV index, avoid going out during peak hours or use maximum protection.";
};