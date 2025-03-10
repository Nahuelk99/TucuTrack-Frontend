import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL =
  Platform.OS === "web" ? "http://localhost:9000" : "http://192.168.1.39:9000";

const handleError = (error, action) => {
  console.error(`Error en ${action}:`, error);
  return null;
};

export const getCities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ciudades:", error);
    throw error;
  }
};

export const getCompanies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/companies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching empresas:", error);
    throw error;
  }
};

export const getTravelTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/travel-types`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tipos de viaje:", error);
    throw error;
  }
};

export const getPrices = async (
  idEmpresa,
  idCiudadOrigen,
  idCiudadDestino,
  idTipoViaje
) => {
  try {
    console.log("Enviando parámetros:", {
      idEmpresa,
      origen: idCiudadOrigen,
      destino: idCiudadDestino,
      idTipoViaje,
    });

    const response = await axios.get(`${API_BASE_URL}/prices`, {
      params: {
        idEmpresa,
        origen: idCiudadOrigen,
        destino: idCiudadDestino,
        idTipoViaje,
      },
    });

    console.log("Respuesta del servidor:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching precio:", error);
    throw error;
  }
};

export const getServiceTypesByCompanies = async (idEmpresa) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/service-types/${idEmpresa}`
    );
    console.log("Tipos de servicio obtenidos:", response.data);

    // Asegurarse que la respuesta es un array
    if (Array.isArray(response.data)) {
      return response.data.map((tipo) => ({
        IdTipoServicio: tipo.IdTipoServicio,
        IdEmpresa: tipo.IdEmpresa,
        IdEmpServ: tipo.IdEmpServ,
        NombreTipoServicio: tipo.NombreTipoServicio,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error en obtención de tipos de servicio:", error);
    return [];
  }
};

export const getScheduleTypesByCompanies = async (idEmpresa) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/schedules-types/${idEmpresa}`
    );
    console.log("Tipos de horario obtenidos:", response.data);

    if (Array.isArray(response.data)) {
      return response.data.map((tipo) => ({
        IdTipoHorario: tipo.IdTipoHorario,
        IdEmpresa: tipo.IdEmpresa,
        IdEmpHorario: tipo.IdEmpHorario,
        NombreTipoHorario: tipo.NombreTipoHorario,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error en obtención de tipos de horario:", error);
    return [];
  }
};

export const getSchedules = async (
  idEmpresa,
  idTipoServicio,
  idTipoHorario,
  ciudadOrigen,
  ciudadDestino
) => {
  try {
    if (!idEmpresa || !ciudadOrigen || !ciudadDestino) {
      throw new Error(
        "Los parámetros idEmpresa, ciudadOrigen y ciudadDestino son obligatorios"
      );
    }

    const params = {
      idEmpresa,
      idCiudadOrigen: ciudadOrigen,
      idCiudadDestino: ciudadDestino,
      ...(idTipoServicio && { idTipoServicio }),
      ...(idTipoHorario && { idTipoHorario }),
    };

    const response = await axios.get(`${API_BASE_URL}/schedules`, { params });
    return response.data;
  } catch (error) {
    return handleError(error, "obtención de horarios");
  }
};
