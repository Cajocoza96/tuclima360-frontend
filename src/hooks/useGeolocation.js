import { useState } from "react";

export default function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | requesting | granted | denied | unavailable | error

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("unavailable");
      setError("La geolocalización no es compatible con este navegador.");
      return;
    }

    setStatus("requesting");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setStatus("granted");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus("denied");
        } else {
          setStatus("error");
        }
        setError(err.message);
      }
    );
  };

  return { position, status, error, requestLocation };
}