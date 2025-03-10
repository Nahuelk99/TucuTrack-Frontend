import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
} from "react-native";
import Filters from "../components/Filters";
import useLocationTracking from "../hooks/useLocationTracking";
import { BUS_STOPS_SaN } from "../data/busStops";
import { ROUTES } from "../data/routes";
import styles from "../styles/tracking";
import About from "../components/About";

const DEFAULT_COORDS = [-27.2672018, -65.547817];

const Tracking = () => {
  const { location, errorMsg, loading, getCurrentLocation } =
    useLocationTracking();

  const [mapInitialized, setMapInitialized] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Seleccionar ciudad");
  const [selectedCompany, setSelectedCompany] = useState("Seleccionar empresa");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDirection, setSelectedDirection] = useState(
    "Seleccionar dirección"
  );
  const [filteredRoute, setFilteredRoute] = useState(null); // Estado para el recorrido filtrado

  // Efecto para filtrar el recorrido cuando cambian los filtros
  useEffect(() => {
    if (selectedCompany && selectedService && selectedDirection) {
      const route = ROUTES.find(
        (route) =>
          route.IdEmpresa === selectedCompany &&
          route.IdTipoServicio === selectedService &&
          route.Dirección === selectedDirection
      );

      if (route) {
        setFilteredRoute(route);
      } else {
        setFilteredRoute(null);
      }
    } else {
      setFilteredRoute(null);
    }
  }, [selectedCompany, selectedService, selectedDirection]);

  // Efecto para actualizar el mapa cuando cambia el recorrido filtrado
  useEffect(() => {
    if (!window.leafletMap || !mapInitialized || !filteredRoute) return;

    const L = window.L;

    // Limpiar marcadores y polilíneas anteriores
    window.leafletMap.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        window.leafletMap.removeLayer(layer);
      }
    });

    // Dibujar la ruta filtrada
    const polyline = L.polyline(
      filteredRoute.coordenadas.map((coord) => [coord[1], coord[0]]),
      { color: "red" }
    ).addTo(window.leafletMap);

    // Centrar el mapa en la ruta
    window.leafletMap.fitBounds(polyline.getBounds());

    // Agregar marcadores para las paradas de la ciudad seleccionada
    const ciudadSeleccionada = BUS_STOPS_SaN.find(
      (ciudad) => ciudad.ciudad === selectedCity
    );

    if (ciudadSeleccionada) {
      ciudadSeleccionada.paradas.forEach((parada) => {
        L.marker([parada.lat, parada.lon])
          .addTo(window.leafletMap)
          .bindPopup(ciudadSeleccionada.ciudad);
      });
    }
  }, [filteredRoute, selectedCity, mapInitialized]);

  // Función para inicializar el mapa (solo web)
  const initializeMap = useCallback(() => {
    if (!window.L) return;

    const L = window.L;
    const mapContainer = document.getElementById("leaflet-map");
    if (!mapContainer) return;

    const map = L.map("leaflet-map").setView(DEFAULT_COORDS, 13);
    window.leafletMap = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const LocationControl = L.Control.extend({
      options: { position: "bottomright" },
      onAdd: function (map) {
        const container = L.DomUtil.create(
          "div",
          "leaflet-bar leaflet-control"
        );
        const button = L.DomUtil.create(
          "a",
          "leaflet-control-location",
          container
        );
        button.href = "#";
        button.title = "Mi ubicación";
        button.innerHTML = "⦿";

        L.DomEvent.on(button, "click", (e) => {
          L.DomEvent.stopPropagation(e);
          getCurrentLocation();
        });

        return container;
      },
    });

    map.addControl(new LocationControl());

    if (location) {
      const userCoords = [location.latitude, location.longitude];
      map.setView(userCoords, 15);
      L.marker(userCoords).addTo(map).bindPopup("Tu ubicación").openPopup();
    }

    return map;
  }, [location, getCurrentLocation]);

  // Efecto para cargar Leaflet (solo web)
  useEffect(() => {
    if (Platform.OS !== "web" || loading || errorMsg || mapInitialized) return;

    const loadLeafletResources = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => {
        initializeMap();
        setMapInitialized(true);
      };
      document.body.appendChild(script);

      return { link, script };
    };

    const resources = loadLeafletResources();

    return () => {
      if (resources.link) document.head.removeChild(resources.link);
      if (resources.script) document.body.removeChild(resources.script);
      if (window.leafletMap) window.leafletMap.remove();
      setMapInitialized(false);
    };
  }, [loading, errorMsg, initializeMap]);

  // Efecto para la carga inicial
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <View style={styles.containerWithMargins}>
      <Filters
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        selectedDirection={selectedDirection}
        setSelectedDirection={setSelectedDirection}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : errorMsg ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
          <Pressable style={styles.retryButton} onPress={getCurrentLocation}>
            <Text style={styles.retryButtonText}>
              Usar ubicación predeterminada
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.mapContainerWithMargins}>
          {Platform.OS === "web" && (
            <div
              id="leaflet-map"
              style={{ height: "100%", width: "100%", borderRadius: 8 }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Tracking;
