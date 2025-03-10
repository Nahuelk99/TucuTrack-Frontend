import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useHorarios } from "../hooks/useSchedules";
import styles from "../styles/schedules";
import {
  getCities,
  getServiceTypesByCompanies,
  getScheduleTypesByCompanies,
} from "../services/api";
import Logo from "../assets/Logo-TucuTrack.png";
import About from "../components/About";

const CustomPicker = ({
  label,
  selectedValue,
  onValueChange,
  items,
  enabled = true,
  placeholder,
}) => {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>{label}:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        enabled={enabled}
        style={styles.picker}
      >
        <Picker.Item
          label={placeholder || `Seleccionar ${label.toLowerCase()}`}
          value=""
        />
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const Schedules = () => {
  // State management
  const [empresa, setEmpresa] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [tipoDia, setTipoDia] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [loadingMasterData, setLoadingMasterData] = useState(true);
  const [errorMasterData, setErrorMasterData] = useState(null);
  const [tiposServicioLocal, setTiposServicioLocal] = useState([]);
  const [tiposHorarioLocal, setTiposHorarioLocal] = useState([]);
  const [loadingTiposServicio, setLoadingTiposServicio] = useState(false);
  const [loadingTiposHorario, setLoadingTiposHorario] = useState(false);

  const ciudadesPermitidas = [1, 2, 3, 10, 12, 15, 18, 24, 25, 31];

  const empresas = [
    { IdEmpresa: "1", Descripcion: "Exprebus" },
    { IdEmpresa: "3", Descripcion: "Tesa" },
  ];

  const handleResetFilters = useCallback(() => {
    setTipoServicio("");
    setTipoDia("");
  }, []);

  const { horarios, loading, error, isValidSelection } = useHorarios(
    empresa,
    origen,
    destino,
    tipoServicio,
    tipoDia,
    handleResetFilters
  );

  // Fetch tipos de servicio cuando cambia la empresa
  useEffect(() => {
    const fetchTiposServicio = async () => {
      if (!empresa) {
        setTiposServicioLocal([]);
        return;
      }

      setLoadingTiposServicio(true);
      try {
        const response = await getServiceTypesByCompanies(parseInt(empresa));
        setTiposServicioLocal(response || []);
      } catch (error) {
        console.error("Error al cargar tipos de servicio:", error);
        setTiposServicioLocal([]);
      } finally {
        setLoadingTiposServicio(false);
      }
    };

    fetchTiposServicio();
  }, [empresa]);

  // Fetch tipos de horario cuando cambia la empresa
  useEffect(() => {
    const fetchTiposHorario = async () => {
      if (!empresa) {
        setTiposHorarioLocal([]);
        return;
      }

      setLoadingTiposHorario(true);
      try {
        const response = await getScheduleTypesByCompanies(parseInt(empresa));
        setTiposHorarioLocal(response || []);
      } catch (error) {
        console.error("Error al cargar tipos de horario:", error);
        setTiposHorarioLocal([]);
      } finally {
        setLoadingTiposHorario(false);
      }
    };

    fetchTiposHorario();
  }, [empresa]);

  // Fetch ciudades
  useEffect(() => {
    const fetchCiudades = async () => {
      setLoadingMasterData(true);
      setErrorMasterData(null);
      try {
        const ciudadesData = await getCities();
        const ciudadesFiltradas = ciudadesData.filter((ciudad) =>
          ciudadesPermitidas.includes(Number(ciudad.IdCiudad))
        );
        setCiudades(ciudadesFiltradas);
      } catch (error) {
        console.error("Error al cargar ciudades:", error);
        setErrorMasterData("Error al cargar las ciudades.");
      } finally {
        setLoadingMasterData(false);
      }
    };

    fetchCiudades();
  }, []);

  const renderHorarios = () => {
    if (!isValidSelection) {
      return (
        <Text style={styles.noHorarios}>
          Seleccione todos los campos para ver los horarios disponibles.
        </Text>
      );
    }

    if (loading) {
      return (
        <View style={styles.loadingTableContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Cargando horarios...</Text>
        </View>
      );
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (!horarios || horarios.length === 0) {
      return (
        <Text style={styles.noHorarios}>
          No hay horarios disponibles para la selección actual.
        </Text>
      );
    }

    // Obtener la hora actual
    const horaActual = new Date();
    const horaActualString = `${horaActual.getHours().toString().padStart(2, "0")}:${horaActual
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // Filtrar los horarios posteriores a la hora actual
    const horariosPosteriores = horarios.filter(
      (horario) => horario.HoraSalida > horaActualString
    );

    // Si no hay más horarios para hoy, mostrar los primeros 5 del día siguiente
    const horariosToShow =
      horariosPosteriores.length === 0
        ? horarios.slice(0, 5)
        : horariosPosteriores;

    if (horariosToShow.length === 0) {
      return (
        <Text style={styles.noHorarios}>
          No hay horarios disponibles para la selección actual.
        </Text>
      );
    }

    return (
      <View style={styles.tableContent}>
        {horariosToShow.map((horario, index) => (
          <View
            key={`${horario.HoraSalida}-${index}`}
            style={[
              styles.row,
              index % 2 === 0 ? styles.evenRow : styles.oddRow,
            ]}
          >
            <Text style={styles.horarioText}>{horario.HoraSalida}</Text>
            <Text style={styles.horarioText}>{horario.HoraLlegada}</Text>
          </View>
        ))}
      </View>
    );
  };

  if (loadingMasterData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  if (errorMasterData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMasterData}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      {/* Empresa Picker */}
      <CustomPicker
        label="Empresa"
        selectedValue={empresa}
        onValueChange={(itemValue) => {
          setEmpresa(itemValue);
          setOrigen("");
          setDestino("");
          setTipoServicio("");
          setTipoDia("");
        }}
        items={empresas.map((emp) => ({
          label: emp.Descripcion,
          value: emp.IdEmpresa,
        }))}
        placeholder="Selecciona una empresa"
      />

      {/* Ciudad Origen Picker */}
      <CustomPicker
        label="Ciudad Origen"
        selectedValue={origen}
        onValueChange={(itemValue) => {
          setOrigen(itemValue);
          setDestino("");
          setTipoServicio("");
          setTipoDia("");
        }}
        items={ciudades.map((city) => ({
          label: city.NombreCiudad,
          value: city.IdCiudad.toString(),
        }))}
        enabled={!!empresa}
        placeholder="Selecciona una ciudad"
      />

      {/* Ciudad Destino Picker */}
      <CustomPicker
        label="Ciudad Destino"
        selectedValue={destino}
        onValueChange={(itemValue) => {
          setDestino(itemValue);
          setTipoServicio("");
          setTipoDia("");
        }}
        items={ciudades
          .filter((city) => city.IdCiudad.toString() !== origen)
          .map((city) => ({
            label: city.NombreCiudad,
            value: city.IdCiudad.toString(),
          }))}
        enabled={!!origen}
        placeholder="Selecciona una ciudad"
      />

      {/* Tipo de Servicio Picker */}
      <CustomPicker
        label="Tipo de Servicio"
        selectedValue={tipoServicio}
        onValueChange={(itemValue) => {
          setTipoServicio(itemValue);
          setTipoDia("");
        }}
        items={tiposServicioLocal.map((tipo) => ({
          label: tipo.NombreTipoServicio || tipo.Descripcion,
          value: tipo.IdTipoServicio.toString(),
        }))}
        enabled={!!destino && !loadingTiposServicio}
        placeholder="Selecciona un tipo de servicio"
      />

      {/* Tipo de Día Buttons */}
      {tipoServicio && !loadingTiposHorario && tiposHorarioLocal.length > 0 && (
        <View style={styles.tiposDiaContainer}>
          <Text style={styles.label}>Tipo de Día:</Text>
          <View style={styles.buttonGroupContainer}>
            {tiposHorarioLocal.map((tipoHorario) => (
              <TouchableOpacity
                key={tipoHorario.IdTipoHorario}
                style={[
                  styles.groupButton,
                  tipoDia === tipoHorario.IdTipoHorario.toString() &&
                    styles.selectedGroupButton,
                ]}
                onPress={() => setTipoDia(tipoHorario.IdTipoHorario.toString())}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.groupButtonText,
                    tipoDia === tipoHorario.IdTipoHorario.toString() &&
                      styles.selectedGroupButtonText,
                  ]}
                >
                  {tipoHorario.NombreTipoHorario}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Horarios Table */}
      {tipoDia && (
        <View style={styles.horariosContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Salida</Text>
            <Text style={styles.headerCell}>Llegada</Text>
          </View>
          {renderHorarios()}
        </View>
      )}
    </ScrollView>
  );
};

export default Schedules;
