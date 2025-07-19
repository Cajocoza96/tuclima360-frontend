import React, { useContext } from "react";
import { BusquedaContext } from "../BusquedaContext";

const ContadorPeticionesApiGeonames = ({
  mostrarIcono = true,
  mostrarTexto = true,
  className = "",
  estilo = "simple"
}) => {
  const { peticionesHoy } = useContext(BusquedaContext);

  // Diferentes estilos de visualización
  const renderSimple = () => (
    <p className={`contador-peticiones ${className}`}>
      {mostrarIcono && "🌐 "}
      {mostrarTexto && "API calls hoy: "}
      <strong>{peticionesHoy}</strong>
    </p>
  );

  const renderBadge = () => (
    <span className={`badge contador-badge ${className}`}
      style={{
        backgroundColor: peticionesHoy > 50 ? '#ff4444' : peticionesHoy > 20 ? '#ffaa00' : '#4CAF50',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
      {mostrarIcono && "🌐 "}{peticionesHoy}
    </span>
  );

  const renderDetallado = () => (
    <div className={`contador-detallado ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
      <span style={{ fontSize: '18px' }}>🌐</span>
      <div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {mostrarTexto ? "Peticiones GeoNames" : "API"}
        </div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
          {peticionesHoy}
        </div>
      </div>
    </div>
  );

  const renderMinimal = () => (
    <span className={`contador-minimal ${className}`}
      style={{
        fontSize: '12px',
        color: '#666',
        opacity: 0.8
      }}>
      {mostrarIcono && "🌐"}({peticionesHoy})
    </span>
  );

  // Seleccionar estilo según la prop
  switch (estilo) {
    case 'badge':
      return renderBadge();
    case 'detallado':
      return renderDetallado();
    case 'minimal':
      return renderMinimal();
    default:
      return renderSimple();
  }
};

export default ContadorPeticionesApiGeonames;