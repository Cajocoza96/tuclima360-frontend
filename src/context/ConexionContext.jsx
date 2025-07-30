import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ConexionContext = createContext();

export const useConexion = () => {
    const context = useContext(ConexionContext);
    if (!context) {
        throw new Error('useConexion debe ser usado dentro de ConexionProvider');
    }
    return context;
};

export const ConexionProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [wasOffline, setWasOffline] = useState(false);
    const [justReconnected, setJustReconnected] = useState(false);
    const [timeOffline, setTimeOffline] = useState(0);
    const [mostrandoMensajeReconexion, setMostrandoMensajeReconexion] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        let offlineTimer = null;

        const handleOnline = () => {
            if (!isOnline) {
                // Solo marcar como reconectado si realmente estaba offline
                setJustReconnected(true);
                setWasOffline(true);
                
                // Limpiar el timer de tiempo offline
                if (offlineTimer) {
                    clearInterval(offlineTimer);
                    offlineTimer = null;
                }
            }
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setWasOffline(true);
            setJustReconnected(false);
            setTimeOffline(0);
            setMostrandoMensajeReconexion(false); // Reset mensaje reconexión
            
            // Limpiar timer si existe
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            
            // Iniciar contador de tiempo offline
            offlineTimer = setInterval(() => {
                setTimeOffline(prev => prev + 1);
            }, 1000);
        };

        // Verificar conexión inicial
        if (!navigator.onLine) {
            handleOffline();
        }

        // Agregar event listeners
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Limpiar event listeners y timer
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            if (offlineTimer) {
                clearInterval(offlineTimer);
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isOnline]);

    // Efecto centralizado para manejar la reconexión
    useEffect(() => {
        if (justReconnected && isOnline) {
            console.log("Reconectado a internet, mostrando mensaje centralizado...");
            setMostrandoMensajeReconexion(true);

            // Limpiar timer anterior si existe
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Después de 3 segundos, resetear estados
            timerRef.current = setTimeout(() => {
                console.log("3 segundos pasados, reseteando estados...");
                setMostrandoMensajeReconexion(false);
                setJustReconnected(false);
                setWasOffline(false);
                setTimeOffline(0);
            }, 3000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [justReconnected, isOnline]);

    // Función para resetear el estado de reconexión manualmente si es necesario
    const resetReconnectionState = () => {
        setJustReconnected(false);
        setWasOffline(false);
        setTimeOffline(0);
        setMostrandoMensajeReconexion(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    // Estados derivados centralizados
    const shouldShowOfflineMessage = !isOnline;
    const shouldShowReconnectionMessage = mostrandoMensajeReconexion && isOnline;

    const value = {
        isOnline,
        wasOffline,
        justReconnected,
        timeOffline,
        mostrandoMensajeReconexion,
        shouldShowOfflineMessage,
        shouldShowReconnectionMessage,
        resetReconnectionState
    };

    return (
        <ConexionContext.Provider value={value}>
            {children}
        </ConexionContext.Provider>
    );
};