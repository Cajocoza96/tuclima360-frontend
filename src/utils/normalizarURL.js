// 🔧 Función de normalización más flexible
export const normalizarTexto = (texto) => {
    return texto
        .toLowerCase()
        .replace(/'/g, "") // elimina comillas simples/apostrofes
        .replace(/'/g, "") // elimina comillas simples curvadas
        // Mapeo de caracteres especiales específicos por idioma
        .replace(/ç/g, "c").replace(/Ç/g, "c")
        .replace(/ğ/g, "g").replace(/Ğ/g, "g")
        .replace(/ı/g, "i").replace(/İ/g, "i")
        .replace(/ö/g, "o").replace(/Ö/g, "o")
        .replace(/ş/g, "s").replace(/Ş/g, "s")
        .replace(/ü/g, "u").replace(/Ü/g, "u")
        // Caracteres vietnamitas
        .replace(/đ/g, "d").replace(/Đ/g, "d")
        .replace(/ă/g, "a").replace(/Ă/g, "a")
        .replace(/â/g, "a").replace(/Â/g, "a")
        .replace(/ê/g, "e").replace(/Ê/g, "e")
        .replace(/ô/g, "o").replace(/Ô/g, "o")
        .replace(/ơ/g, "o").replace(/Ơ/g, "o")
        .replace(/ư/g, "u").replace(/Ư/g, "u")
        // Caracteres malteses
        .replace(/ċ/g, "c").replace(/Ċ/g, "c")
        .replace(/ġ/g, "g").replace(/Ġ/g, "g")
        .replace(/ħ/g, "h").replace(/Ħ/g, "h")
        .replace(/ż/g, "z").replace(/Ż/g, "z")
        // Caracteres árabes romanizados comunes
        .replace(/ā/g, "a").replace(/Ā/g, "a")
        .replace(/ī/g, "i").replace(/Ī/g, "i")
        .replace(/ū/g, "u").replace(/Ū/g, "u")
        // Otros caracteres especiales comunes
        .replace(/ß/g, "ss") // alemán
        .replace(/æ/g, "ae").replace(/Æ/g, "ae") // nórdico
        .replace(/ø/g, "o").replace(/Ø/g, "o") // nórdico
        .replace(/å/g, "a").replace(/Å/g, "a") // nórdico
        .replace(/œ/g, "oe").replace(/Œ/g, "oe") // francés
        .replace(/ł/g, "l").replace(/Ł/g, "l") // polaco
        .replace(/ń/g, "n").replace(/Ń/g, "n") // polaco
        .replace(/ś/g, "s").replace(/Ś/g, "s") // polaco
        .replace(/ź/g, "z").replace(/Ź/g, "z") // polaco
        .replace(/ż/g, "z").replace(/Ż/g, "z") // polaco
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
        .replace(/[–—]/g, "-") // convierte en-dash y em-dash a guión normal
        .replace(/[^\w\s-]/g, "") // elimina caracteres especiales excepto letras, números, espacios y guiones
        .replace(/[-\s]+/g, " ") // ⭐ CAMBIO CLAVE: convierte guiones Y espacios múltiples a espacios únicos
        .replace(/\s+/g, " ") // unifica espacios múltiples
        .trim();
};

// Función para normalizar texto y hacer URL amigable
export const normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula = (texto) => {
    return texto
        .toLowerCase()
        .replace(/'/g, "") // elimina comillas simples/apostrofes
        .replace(/'/g, "") // elimina comillas simples curvadas
        // Mapeo de caracteres especiales específicos por idioma
        .replace(/ç/g, "c").replace(/Ç/g, "c")
        .replace(/ğ/g, "g").replace(/Ğ/g, "g")
        .replace(/ı/g, "i").replace(/İ/g, "i")
        .replace(/ö/g, "o").replace(/Ö/g, "o")
        .replace(/ş/g, "s").replace(/Ş/g, "s")
        .replace(/ü/g, "u").replace(/Ü/g, "u")
        // Caracteres vietnamitas
        .replace(/đ/g, "d").replace(/Đ/g, "d")
        .replace(/ă/g, "a").replace(/Ă/g, "a")
        .replace(/â/g, "a").replace(/Â/g, "a")
        .replace(/ê/g, "e").replace(/Ê/g, "e")
        .replace(/ô/g, "o").replace(/Ô/g, "o")
        .replace(/ơ/g, "o").replace(/Ơ/g, "o")
        .replace(/ư/g, "u").replace(/Ư/g, "u")
        // Caracteres malteses
        .replace(/ċ/g, "c").replace(/Ċ/g, "c")
        .replace(/ġ/g, "g").replace(/Ġ/g, "g")
        .replace(/ħ/g, "h").replace(/Ħ/g, "h")
        .replace(/ż/g, "z").replace(/Ż/g, "z")
        // Caracteres árabes romanizados comunes
        .replace(/ā/g, "a").replace(/Ā/g, "a")
        .replace(/ī/g, "i").replace(/Ī/g, "i")
        .replace(/ū/g, "u").replace(/Ū/g, "u")
        // Otros caracteres especiales comunes
        .replace(/ß/g, "ss") // alemán
        .replace(/æ/g, "ae").replace(/Æ/g, "ae") // nórdico
        .replace(/ø/g, "o").replace(/Ø/g, "o") // nórdico
        .replace(/å/g, "a").replace(/Å/g, "a") // nórdico
        .replace(/œ/g, "oe").replace(/Œ/g, "oe") // francés
        .replace(/ł/g, "l").replace(/Ł/g, "l") // polaco
        .replace(/ń/g, "n").replace(/Ń/g, "n") // polaco
        .replace(/ś/g, "s").replace(/Ś/g, "s") // polaco
        .replace(/ź/g, "z").replace(/Ź/g, "z") // polaco
        .replace(/ż/g, "z").replace(/Ż/g, "z") // polaco
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
        .replace(/[–—]/g, "-") // convierte en-dash y em-dash a guión normal
        .replace(/[^\w\s-]/g, "") // elimina caracteres especiales excepto letras, números, espacios y guiones
        .replace(/\s+/g, "-") // reemplaza espacios por guiones
        .replace(/-+/g, "-") // unifica múltiples guiones en uno solo
        .replace(/^-+|-+$/g, ""); // elimina guiones al inicio y final
};

// 🔧 Función para Convertir URL de vuelta a formato comparable
export const desnormalizarURL = (textoURL) => {
    return textoURL
        .toLowerCase()
        .replace(/-/g, " ") // convierte guiones a espacios
        .trim();
};