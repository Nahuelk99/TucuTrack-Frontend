// hooks/useLocationTracking.js
import { useState, useCallback } from "react";
import { Platform } from "react-native";

const DEFAULT_COORDS = [-27.2672018, -65.547817];

const useLocationTracking = () => {
  const [state, setState] = useState({
    location: null,
    errorMsg: null,
    loading: true,
  });

  const getWebLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });
    });
  }, []);

  const getCurrentLocation = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      if (Platform.OS === "web") {
        const position = await getWebLocation();
        setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          errorMsg: null,
          loading: false,
        });
      } else {
        // Lógica para móviles usando expo-location
      }
    } catch (error) {
      console.error("Error obteniendo ubicación:", error);
      setState({
        location: {
          latitude: DEFAULT_COORDS[0],
          longitude: DEFAULT_COORDS[1],
        },
        errorMsg: "No se pudo obtener tu ubicación.",
        loading: false,
      });
    }
  }, [getWebLocation]);

  return { ...state, getCurrentLocation };
};

export default useLocationTracking;
