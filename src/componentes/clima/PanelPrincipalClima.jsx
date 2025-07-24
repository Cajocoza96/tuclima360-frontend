import React, { useContext, useEffect, useState } from "react";
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

import GraficoDiarioClima from "./GraficoDiarioClima";

export default function PanelPrincipalClima() {
    const { ciudadSeleccionada, obtenerCoordenadas, cargandoBusquedaCiudad } = useContext(BusquedaContext);
    const { clima, pronosticoHora, pronosticoDiario, cargandoClima } = useContext(ClimaContext);
    const { hora24, cargandoFechaHora, datosIniciales } = useContext(FechaHoraContext);
    const { encendidoFondoVivo } = useFonVivoFormHoraTemp();
    const isMobile = useIsMobile();
    const { obtenerImagenFondo, obtenerEstiloFondo } = useImagenFondo();
    const { isOnline, wasOffline, justReconnected, timeOffline, resetReconnectionState } = useConexionInternet();

    const [mostrarUbicacion, setMostrarUbicacion] = useState(false);
    const [mostrarMensajeSinConexion, setMostrarMensajeSinConexion] = useState(false);
    const [mostrarMensajeConConexion, setMostrarMensajeConConexion] = useState(false);
    const [reintentoAutomatico, setReintentoAutomatico] = useState(false);

    const mensajeCarga = InfoEstadoCargaConexion.cargando.carginfoClimaCiudad;
    const mensajeSinConexion = InfoEstadoCargaConexion.conexion.sinConexion;
    const mensajeConConexion = InfoEstadoCargaConexion.conexion.conConexion;

    // Obtener la imagen de fondo actual usando el hook
    const imagenFondo = encendidoFondoVivo && clima ?
        obtenerImagenFondo(clima.codigoClima, hora24, isMobile, true) : null;

    const estiloFondo = obtenerEstiloFondo(encendidoFondoVivo, imagenFondo);

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
            <div
                className={`${!encendidoFondoVivo || !imagenFondo ? 'fixed w-screen h-[100svh] inset-0 brightness-60 dark:brightness-50 bg-blue-500 dark:bg-black' : 'fixed w-screen h-[100svh] inset-0 brightness-40 dark:brightness-30 bg-blue-500 dark:bg-black'}`}
                style={estiloFondo}
            >
            </div>


            {datosCompletos && (
                <ConexionSinConexion />
            )}


            <div className={`min-h-[100svh] max-h-[100svh] flex flex-col 
                        items-center justify-start relative py-4 ${mostrarUbicacion ? 'overflow-hidden touch-none overscroll-none' : 'overflow-y-auto'}`}>

                {/* Overlay */}
                {mostrarUbicacion && (
                    <div className="fixed inset-0 z-50 bg-black/70" />
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
                                <div className="flex flex-col items-center w-full space-y-4">
                                    <div className="w-[95%] flex flex-col gap-1">
                                        <CabeceraCiudadClima onOpenUbicacion={() => setMostrarUbicacion(true)} />
                                        <ClimCentEstadFechaActual />
                                    </div>
                                    <CarruselHoraDiaClima />

                                    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                                        <p className="text-base text-white text-center
                                                        md:text-xl 2xl:text-4xl">
                                            Precipitations
                                        </p>
                                        <GraficoDiarioClima />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </>
            </div>
        </>
    );
}