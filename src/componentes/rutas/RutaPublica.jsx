import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RutaPublica({ children }) {
    const { tipoUsuario } = useAuth();

    if (tipoUsuario) {
        return <Navigate to="/" replace />;
    }
    return children;
}
