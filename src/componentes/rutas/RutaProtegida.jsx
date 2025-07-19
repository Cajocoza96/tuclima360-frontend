import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RutaProtegida({ children }){
    const { tipoUsuario } = useAuth();

    if (!tipoUsuario) {
        return <Navigate to="/login" replace />;
    }
    return children;
}