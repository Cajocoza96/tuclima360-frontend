import React, { createContext, useContext, useState } from "react";

const FonVivoFormHoraTempContext = createContext();

export const useFonVivoFormHoraTemp = () => {
    const context = useContext(FonVivoFormHoraTempContext);
    if (!context) {
        throw new Error('useFonVivoFormHoraTemp debe ser usado dentro de FonVivoFormHoraTempProvider');
    }
    return context;
};

// Función para obtener el estado inicial desde localStorage del fondoVivo
const getInitialStateFondoVivo = () => {
    try {
        const estadoGuardado = localStorage.getItem('fondoVivo');
        if (estadoGuardado !== null) {
            return JSON.parse(estadoGuardado);
        }
        return true; // valor por defecto
    } catch (error) {
        console.error('Error al leer localStorage:', error);
        return true; // valor por defecto en caso de error
    }
};

// Función para obtener el estado inicial desde localStorage del formatoHora
const getInitialStateFormatoHora = () => {
    try {
        const estadoGuardado = localStorage.getItem('formatoHora');
        if (estadoGuardado !== null) {
            return JSON.parse(estadoGuardado);
        }
        return false; // valor por defecto
    } catch (error) {
        console.error('Error al leer localStorage:', error);
        return false; // valor por defecto en caso de error
    }
};

// Función para obtener el estado inicial desde localStorage del temperaturaModo
const getInitialStateTemperaturaModo = () => {
    try {
        const estadoGuardado = localStorage.getItem('temperaturaModo');
        if (estadoGuardado !== null) {
            return JSON.parse(estadoGuardado);
        }
        return true; // valor por defecto
    } catch (error) {
        console.error('Error al leer localStorage:', error);
        return true; // valor por defecto en caso de error
    }
};

export const FonVivoFormHoraTempProvider = ({ children }) => {
    // Inicializar directamente desde localStorage el Fondo Vivo
    const [encendidoFondoVivo, setEncendidoFondoVivo] = useState(getInitialStateFondoVivo);

    // Guardar el estado en localStorage cada vez que cambie el Fondo Vivo
    const toggleEncendidoFondoVivo = () => {
        const nuevoEstado = !encendidoFondoVivo;
        setEncendidoFondoVivo(nuevoEstado);
        try {
            localStorage.setItem('fondoVivo', JSON.stringify(nuevoEstado));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    };

    // Inicializar directamente desde localStorage el Formato Hora
    const [encendidoFormatoHora, setEncendidoFormatoHora] = useState(getInitialStateFormatoHora);

    // Guardar el estado en localStorage cada vez que cambie el Formato Hora
    const toggleEncendidoFormatoHora = () => {
        const nuevoEstado = !encendidoFormatoHora;
        setEncendidoFormatoHora(nuevoEstado);
        try {
            localStorage.setItem('formatoHora', JSON.stringify(nuevoEstado));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    };


    // Inicializar directamente desde localStorage el Temperatura Modo
    const [encendidoTemperaturaModo, setEncendidoTemperaturaModo] = useState(getInitialStateTemperaturaModo);

    // Guardar el estado en localStorage cada vez que cambie el Temperatura Modo
    const toggleEncendidoTemperaturaModo = () => {
        const nuevoEstado = !encendidoTemperaturaModo;
        setEncendidoTemperaturaModo(nuevoEstado);
        try {
            localStorage.setItem('temperaturaModo', JSON.stringify(nuevoEstado));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    };

    // Combinar ambos valores en un solo objeto
    const contextValue = {
        // Propiedades del fondo vivo
        encendidoFondoVivo,
        toggleEncendidoFondoVivo,
        // Propiedades del formato hora
        encendidoFormatoHora,
        toggleEncendidoFormatoHora,
        // Propiedad del temperatura modo
        encendidoTemperaturaModo,
        toggleEncendidoTemperaturaModo

    };

    return (
        <FonVivoFormHoraTempContext.Provider value={contextValue}>
            {children}
        </FonVivoFormHoraTempContext.Provider>
    );
};