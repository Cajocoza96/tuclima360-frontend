import React from "react";
import RegisIniSeccion from "./RegisIniSeccion";
import infoRegIniSeccion from "../../data/infoRegIniSeccion.json";

const IniciarSeccion = () => {
    const { titulo, lema, iconoUsuario, continuarComoInvitado, footerInfoCuenta, footerAccion, footerAccionInvisible } =
    {...infoRegIniSeccion.iniciarSesion, 
    footerInfoCuenta: infoRegIniSeccion.iniciarSesion.footerInfoCuenta,
    footerAccion: infoRegIniSeccion.iniciarSesion.footerAccion,
    footerAccionInvisible: infoRegIniSeccion.iniciarSesion.footerAccionInvisible};

    return (
        <>
            <RegisIniSeccion
                titulo={titulo}
                lema={lema}
                iconoUsuario={iconoUsuario}
                continuarComoInvitado={continuarComoInvitado}
                footerInfoCuenta={footerInfoCuenta}
                footerAccion={footerAccion}
                footerAccionInvisible={footerAccionInvisible}
            />
        </>

    );
}
export default IniciarSeccion;