import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useFilters from "../hooks/useFilters";
import styles from "../styles/tracking";

const DIRECTION_OPTIONS = [
  "Seleccionar dirección",
  "Norte a Sur",
  "Sur a Norte",
];

const Filters = ({
  selectedCity,
  setSelectedCity,
  selectedCompany,
  setSelectedCompany,
  selectedService,
  setSelectedService,
  selectedDirection,
  setSelectedDirection,
}) => {
  const { cities, companies, services, loading, error } = useFilters();

  const cityOptions = [
    "Seleccionar ciudad",
    ...cities.map((city) => city.NombreCiudad),
  ];

  // Obtener los servicios de la empresa seleccionada
  const serviceOptions = selectedCompany
    ? services
        .find((service) => service.IdEmpresa === selectedCompany)
        ?.servicios.map((servicio) => ({
          label: servicio.NombreTipoServicio,
          value: servicio.IdTipoServicio,
        })) || []
    : [];

  console.log("Empresa seleccionada:", selectedCompany);
  console.log("Servicios disponibles:", services);
  console.log("Servicios filtrados:", serviceOptions);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Error cargando datos: {error.message}</Text>;
  }

  return (
    <View style={styles.filtersContainer}>
      <View style={styles.filterRow}>
        <View style={styles.filterItem}>
          <Text style={styles.label}>Paradas</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={setSelectedCity}
              style={styles.picker}
            >
              {cityOptions.map((city, index) => (
                <Picker.Item key={index} label={city} value={city} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.filterItem}>
          <Text style={styles.label}>Empresas</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCompany}
              onValueChange={(value) => {
                setSelectedCompany(Number(value));
                setSelectedService(null); // Resetear el servicio al cambiar de empresa
              }}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar empresa" value={null} />
              {companies.map((company) => (
                <Picker.Item
                  key={company.IdEmpresa}
                  label={company.NombreEmpresa}
                  value={company.IdEmpresa}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.filterItem}>
          <Text style={styles.label}>Servicio</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedService}
              onValueChange={(value) => setSelectedService(Number(value))}
              style={styles.picker}
              enabled={!!selectedCompany} // Deshabilitar si no hay empresa seleccionada
            >
              <Picker.Item label="Seleccionar servicio" value={null} />
              {serviceOptions.map((service) => (
                <Picker.Item
                  key={service.value}
                  label={service.label}
                  value={service.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.filterItem}>
          <Text style={styles.label}>Dirección</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedDirection}
              onValueChange={setSelectedDirection}
              style={styles.picker}
            >
              {DIRECTION_OPTIONS.map((direction, index) => (
                <Picker.Item key={index} label={direction} value={direction} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Filters;
