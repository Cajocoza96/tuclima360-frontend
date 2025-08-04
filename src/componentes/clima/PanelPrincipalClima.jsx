import React, { useContext, useEffect, useState, useMemo } from "react";
import CabeceraCiudadClima from "./CabeceraCiudadClima";
import CarruselHoraDiaClima from "./CarruselHoraDiaClima";
import ClimCentEstadFechaActual from "./ClimCentEstadFechaActual";
import GestioUbicaPrincipal from "../pedir_ubicacion/GestioUbicaPrincipal";

import EstadoCargaConexion from "../estado_de_carga/EstadoCargaConexion";
import InfoEstadoCargaConexion from "../../data/InfoEstadoCargaConexion.json";

import { BusquedaContext } from "../../context/BusquedaContext";
import { ClimaContext } from "../../context/ClimaContext";
import { FechaHoraContext } from "../../context/FechaHoraContext";
import { useFonVivoFormHoraTemp } from "../../context/FonVivoFormHoraTempContext";
import useIsMobile from "../../hooks/useIsMobile";
import useImagenFondo from "../../hooks/useImagenFondo";
import useConexionInternet from "../../hooks/useConexionInternet";

import ConexionSinConexion from "../conexion_sin_conexion/ConexionSinConexion";
import OptimizedImage, { IMAGE_CONFIGS } from "../common/OptimizedImage";

import { motion } from "framer-motion";

import GraficoDiarioClima from "./GraficoDiarioClima";

export default function PanelPrincipalClima() {
    const { ciudadSeleccionada, obtenerCoordenadas, cargandoBusquedaCiudad } = useContext(BusquedaContext);
    const { clima, pronosticoHora, pronosticoDiario, cargandoClima } = useContext(ClimaContext);
    const { hora24, cargandoFechaHora, datosIniciales } = useContext(FechaHoraContext);
    const { encendidoFondoVivo } = useFonVivoFormHoraTemp();
    const isMobile = useIsMobile();
    const { obtenerImagenFondo } = useImagenFondo();
    const { isOnline, justReconnected, timeOffline, resetReconnectionState } = useConexionInternet();

    const [mostrarUbicacion, setMostrarUbicacion] = useState(false);
    const [mostrarMensajeSinConexion, setMostrarMensajeSinConexion] = useState(false);
    const [mostrarMensajeConConexion, setMostrarMensajeConConexion] = useState(false);
    const [reintentoAutomatico, setReintentoAutomatico] = useState(false);

    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mensajeCarga = InfoEstadoCargaConexion.cargando.carginfoClimaCiudad;
    const mensajeSinConexion = InfoEstadoCargaConexion.conexion.sinConexion;
    const mensajeConConexion = InfoEstadoCargaConexion.conexion.conConexion;

    // Memoizar la imagen de fondo para evitar recálculos innecesarios
    const imagenFondo = useMemo(() => {
        if (!encendidoFondoVivo || !clima || hora24 === null || hora24 === undefined) {
            return null;
        }
        return obtenerImagenFondo(clima.codigoClima, hora24, isMobile, true);
    }, [encendidoFondoVivo, clima, hora24, isMobile, obtenerImagenFondo]);

    // Memoizar las clases CSS del fondo para evitar cambios innecesarios
    const clasesFondoSinImagen = useMemo(() => {
        return 'fixed w-screen h-[100svh] inset-0 bg-violet-900 dark:bg-black brightness-60 dark:brightness-50';
    }, []);

    const estaCargando = cargandoBusquedaCiudad || cargandoClima || cargandoFechaHora;
    const datosCompletos = ciudadSeleccionada &&
        obtenerCoordenadas &&
        clima &&
        pronosticoHora &&
        pronosticoDiario &&
        datosIniciales &&
        (hora24 !== null && hora24 !== undefined);

    // Función para recargar todos los datos
    const recargarDatos = () => {
        console.log('Recargando página automáticamente...');
        // Limpiar cache de módulos de Vite si es necesario
        if (import.meta.hot) {
            import.meta.hot.invalidate();
        }
        window.location.reload();
    };

    // Efecto para manejar la pérdida de conexión
    useEffect(() => {
        if (!isOnline && !datosCompletos) {
            setMostrarMensajeSinConexion(true);
            setMostrarMensajeConConexion(false);
        } else {
            setMostrarMensajeSinConexion(false);
        }
    }, [isOnline, datosCompletos]);

    // Efecto para manejar la reconexión
    useEffect(() => {
        if (justReconnected && !datosCompletos) {
            setMostrarMensajeConConexion(true);
            setMostrarMensajeSinConexion(false);

            // Determinar tiempo de espera basado en cuánto tiempo estuvo offline
            const tiempoEspera = timeOffline > 30 ? 3000 : 2000; // 3 segundos si estuvo offline más de 30 segundos

            // Mostrar mensaje de reconexión por el tiempo determinado
            const timeoutId = setTimeout(() => {
                setMostrarMensajeConConexion(false);
                setReintentoAutomatico(true);

                // Pequeño delay adicional para asegurar que el estado se actualice
                setTimeout(() => {
                    recargarDatos();
                    resetReconnectionState();
                }, 300);
            }, tiempoEspera);

            // Limpiar timeout si el componente se desmonta
            return () => clearTimeout(timeoutId);
        } else if (justReconnected && datosCompletos) {
            // Si los datos ya están completos, no mostrar mensaje
            resetReconnectionState();
        }
    }, [justReconnected, datosCompletos, timeOffline]);

    // Efecto para resetear el estado de reintento
    useEffect(() => {
        if (reintentoAutomatico && datosCompletos) {
            setReintentoAutomatico(false);
        }
    }, [reintentoAutomatico, datosCompletos]);

    // Bloquear scroll al mostrar GestioUbicaPrincipal
    useEffect(() => {
        document.body.style.overflow = mostrarUbicacion ? 'hidden' : 'auto';
    }, [mostrarUbicacion]);

    return (
        <>
            {/* Fondo optimizado con OptimizedImage */}
            {encendidoFondoVivo && imagenFondo ? (
                <div 
                    key={`fondo-${isMobile}-${encendidoFondoVivo}-${imagenFondo}-${windowSize.width}x${windowSize.height}`}
                    className="fixed w-screen h-[100svh] inset-0 brightness-60 dark:brightness-50"
                >
                    <OptimizedImage
                        src={imagenFondo}
                        alt="weather background"
                        asBackground={true}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        minHeight="100svh"
                        className="w-screen h-[100svh] fixed inset-0"
                        showSkeleton={false}
                        {...IMAGE_CONFIGS.CRITICAL}
                    />
                </div>
            ) : (
                // Fondo por defecto sin imagen
                <div
                    key={`fondo-default-${windowSize.width}x${windowSize.height}`}
                    className={clasesFondoSinImagen}
                />
            )}

            {datosCompletos && (
                <ConexionSinConexion />
            )}

            <div className={`min-h-[100svh] max-h-[100svh] flex flex-col 
                        items-center justify-start relative py-4 ${mostrarUbicacion ? 'overflow-hidden touch-none overscroll-none' : 'overflow-y-auto'}`}>

                {/* Overlay */}
                {mostrarUbicacion && (
                    <div className="fixed inset-0 z-60 bg-black/70"
                    onClick={() => setMostrarUbicacion(false)}
                    />
                )}

                {/* Componente con animación */}
                <GestioUbicaPrincipal visible={mostrarUbicacion} onClose={() => setMostrarUbicacion(false)} />

                <>
                    {/* Mostrar mensaje de sin conexión */}
                    {mostrarMensajeSinConexion && (
                        <div className="flex-1 flex items-center justify-center">
                            <EstadoCargaConexion estadoMensajeConexionCiudadClima={mensajeSinConexion} />
                        </div>
                    )}

                    {/* Mostrar mensaje de reconexión */}
                    {mostrarMensajeConConexion && (
                        <div className="flex-1 flex items-center justify-center">
                            <EstadoCargaConexion estadoMensajeConexionCiudadClima={mensajeConConexion} />
                        </div>
                    )}

                    {!mostrarMensajeSinConexion && !mostrarMensajeConConexion && (
                        <>
                            {estaCargando || !datosCompletos || reintentoAutomatico ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <EstadoCargaConexion estadoMensajeCargaCiudadClima={mensajeCarga} />
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 1 }}
                                    className="flex flex-col items-center w-full space-y-4">
                                    <div className="w-[95%] flex flex-col gap-1">
                                        <CabeceraCiudadClima onOpenUbicacion={() => setMostrarUbicacion(true)} />
                                        <ClimCentEstadFechaActual />
                                    </div>
                                    <CarruselHoraDiaClima />
                                    
                                    <GraficoDiarioClima />
                                </motion.div>
                            )}
                        </>
                    )}
                </>
            </div>
        </>
    );
}