import React from "react";
import TerminosYCondiciones from "./TerminosYCondiciones.jsx";
import YaNoTienesCuenta from "./YaNoTienesCuenta.jsx";

function FooterCompleto({ footerInfoCuenta, footerAccion, footerAccionInvisible, controls }) {
    return (
        <div className="mt-7 flex flex-col items-center justify-center gap-2  bg-amber-50 dark:bg-black">
            <TerminosYCondiciones 
            controls={controls}
            />
            <YaNoTienesCuenta
                footerInfoCuenta={footerInfoCuenta}
                footerAccion={footerAccion}
                footerAccionInvisible={footerAccionInvisible}
                controls={controls}
            />
        </div>
    );
}

export default FooterCompleto;