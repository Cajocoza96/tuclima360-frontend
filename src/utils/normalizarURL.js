// Función para normalizar texto y hacer URL amigable
export const normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula = (texto) => {
    return texto
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
        .replace(/'/g, "") // elimina comillas simples/apostrofes
        .replace(/'/g, "") // elimina comillas simples curvadas
        .replace(/[^\w\s-]/g, "") // elimina caracteres especiales excepto letras, números, espacios y guiones
        .replace(/\s+/g, "-") // reemplaza espacios por guiones
        .replace(/-+/g, "-") // unifica múltiples guiones en uno solo
        .replace(/^-+|-+$/g, ""); // elimina guiones al inicio y final
};

// Función para normalizar texto para comparación (sin afectar URL)
export const normalizarParaComparacion = (texto) => {
    return texto
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
        .replace(/'/g, "") // elimina comillas simples/apostrofes
        .replace(/'/g, "") // elimina comillas simples curvadas
        .replace(/[^\w\s]/g, "") // elimina caracteres especiales excepto letras, números y espacios
        .replace(/\s+/g, " ") // unifica espacios múltiples
        .trim();
};

// Función para convertir URL de vuelta a formato comparable
export const desnormalizarURL = (textoURL) => {
    return textoURL
        .toLowerCase()
        .replace(/-/g, " ") // convierte guiones a espacios
        .trim();
};