import React from "react";
import RegisIniSeccion from "./RegisIniSeccion";
import infoRegIniSeccion from "../../data/infoRegIniSeccion.json";

const Registrar = () => {
    const { titulo, lema, iconoUsuario, footerInfoCuenta, footerAccion, footerAccionInvisible } = 
    {...infoRegIniSeccion.registrate, 
        footerInfoCuenta: infoRegIniSeccion.registrate.footerInfoCuenta,
        footerAccion: infoRegIniSeccion.registrate.footerAccion,
        footerAccionInvisible: infoRegIniSeccion.registrate.footerAccionInvisible};

    return (
        <>
            <RegisIniSeccion
                titulo={titulo}
                lema={lema}
                iconoUsuario={iconoUsuario}
                footerInfoCuenta={footerInfoCuenta}
                footerAccion={footerAccion}
                footerAccionInvisible={footerAccionInvisible}
            />
        </>

    );
}
export default Registrar;