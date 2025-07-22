import React from "react";
import { Route, Routes } from "react-router-dom";
import Registrar from "../autenticacion/Registrar";
import IniciarSeccion from "../autenticacion/IniciarSeccion";
import AnimacionBienvenida from "../animacion_bienvenida/AnimacionBienvenida";
import PedirUbicacion from "../pedir_ubicacion/PedirUbicacion";
import AgregarCiudadClima from "../clima/AgregarCiudadClima";
import PanelPrincipalClimas from "../clima/PanelPrincipalClima";
import GestionUbicaEditAgre from "../pedir_ubicacion/GestionUbicaEditAgre";

import TerminosDeServicios from "../termino_politica_ayuda/TerminosDeServicios";
import PoliticaDePrivacidad from "../termino_politica_ayuda/PoliticaDePrivacidad";
import Ayuda from "../termino_politica_ayuda/Ayuda";
import ProblemasConocidos from "../problemas-conocidos/ProblemasConocidos";

import RutaProtegida from "./RutaProtegida";
import RutaPublica from "./RutaPublica";
import Error from "../error/Error";

import InfoError from "../../data/InfoError.json";

import ScrollToTop from "../scroll_control/ScrollToTop";

const infoErrorPagina = InfoError.paginaNoEncontrada;

export default function Rutas() {
    return (
        <Routes>
            <ScrollToTop />
            <Route path="*" element={
                <Error
                    numeroError={infoErrorPagina.numeroErrorPagina}
                    tituloError={infoErrorPagina.tituloNoPagina}
                    mensajeError={infoErrorPagina.mensajeNoPagina}
                />}>
            </Route>

            <Route path="/error" element={
                <Error
                    numeroError={infoErrorPagina.numeroErrorPagina}
                    tituloError={infoErrorPagina.tituloNoPagina}
                    mensajeError={infoErrorPagina.mensajeNoPagina}
                />}>
            </Route>

            <Route path="/" element={<AnimacionBienvenida />}></Route>

            <Route path="/register"
                element={
                    <RutaPublica>
                        <Registrar />
                    </RutaPublica>
                }>
            </Route>

            <Route path="/login"
                element={
                    <RutaPublica>
                        <IniciarSeccion />
                    </RutaPublica>
                }>
            </Route>

            <Route path="/order-location"
                element={
                    <RutaProtegida>
                        <PedirUbicacion />
                    </RutaProtegida>
                }>
            </Route>

            <Route path="/add-city-weather"
                element={
                    <RutaProtegida>
                        <AgregarCiudadClima />
                    </RutaProtegida>
                }>
            </Route>

            <Route path="/:ciudad/:departamento/:pais"
                element={
                    <RutaProtegida>
                        <PanelPrincipalClimas />
                    </RutaProtegida>
                }>
            </Route>

            <Route path="/manage-location"
                element={
                    <RutaProtegida>
                        <GestionUbicaEditAgre />
                    </RutaProtegida>
                }>
            </Route>


            <Route path="/terms-of-service" element={<TerminosDeServicios />}> </Route>

            <Route path="/privacy-policy" element={<PoliticaDePrivacidad />}> </Route>

            <Route path="/help" element={<Ayuda />}> </Route>

            <Route path="/known-issues" element={<ProblemasConocidos />}> </Route>


        </Routes>
    );
}