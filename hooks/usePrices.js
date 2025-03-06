import { useState, useEffect } from "react";
import {
  getCities,
  getCompanies,
  getTravelTypes,
  getPrices,
  getSchedules,
} from "../services/api";

const usePrices = (empresa, origen, destino, tipoViaje) => {
  const [precio, setPrecio] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [tiposViaje, setTiposViaje] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isValidSelection, setIsValidSelection] = useState(false);

  // Efecto para cargar los datos iniciales
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [ciudadesData, empresasData, tiposViajeData] = await Promise.all([
          getCities(),
          getCompanies(),
          getTravelTypes(),
        ]);

        if (!ciudadesData || !empresasData || !tiposViajeData) {
          throw new Error("Datos vacíos o no válidos");
        }

        setCiudades(ciudadesData);
        setEmpresas(empresasData);
        setTiposViaje(tiposViajeData);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Efecto para cargar precios y horarios cuando se seleccionan todos los campos
  useEffect(() => {
    const fetchTarifas = async () => {
      if (!empresa || !origen || !destino || !tipoViaje) {
        setIsValidSelection(false);
        setPrecio(null);
        return;
      }

      setIsValidSelection(true);
      setLoading(true);
      setError(null);

      try {
        // Solo obtenemos el precio
        const precioResponse = await getPrices(
          empresa,
          origen,
          destino,
          tipoViaje
        );

        // Verificamos si tenemos un precio válido
        if (precioResponse && precioResponse.precio !== undefined) {
          setPrecio(precioResponse.precio);
        } else {
          throw new Error(
            "No se encontró el precio para la combinación seleccionada"
          );
        }
      } catch (error) {
        console.error("Error al cargar tarifas:", error);
        setError(
          "No se encontró información para la combinación seleccionada. Por favor, verifique los datos."
        );
        setPrecio(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTarifas();
  }, [empresa, origen, destino, tipoViaje]);

  return {
    precio,
    horarios,
    ciudades,
    empresas,
    tiposViaje,
    loading,
    error,
    isValidSelection,
  };
};

export default usePrices;
