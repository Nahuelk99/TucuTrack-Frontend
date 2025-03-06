import { useState, useEffect } from "react";
import { getSchedules } from "../services/api";

export const formatTime = (timeString) => {
  if (!timeString) return "";
  return timeString;
};

const useSchedules = (
  empresa,
  origen,
  destino,
  tipoServicio,
  tipoDia,
  handleResetFilters
) => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValidSelection, setIsValidSelection] = useState(false);

  useEffect(() => {
    const fetchHorarios = async () => {
      // Validación de parámetros requeridos
      if (!empresa || !origen || !destino || !tipoServicio || !tipoDia) {
        setIsValidSelection(false);
        return;
      }

      setIsValidSelection(true);
      setLoading(true);
      setError(null);

      try {
        const response = await getSchedules(
          parseInt(empresa),
          parseInt(tipoServicio),
          parseInt(tipoDia),
          parseInt(origen),
          parseInt(destino)
        );

        if (!response) {
          throw new Error("No se encontraron horarios");
        }

        if (!Array.isArray(response)) {
          throw new Error("Formato de respuesta inválido");
        }

        setHorarios(response);
      } catch (error) {
        console.error("Error al cargar horarios:", error);
        setError(
          error.message || "Error al cargar los horarios. Intente nuevamente."
        );
        setHorarios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, [empresa, origen, destino, tipoServicio, tipoDia]);

  return { horarios, loading, error, isValidSelection };
};

export { useSchedules as useHorarios };
