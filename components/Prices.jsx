import React, { useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import usePrices from "../hooks/usePrices";
import styles from "../styles/prices";
import Logo from "../assets/Logo-TucuTrack.png";

const CustomPicker = ({
  label,
  selectedValue,
  onValueChange,
  items,
  enabled,
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
        <Picker.Item label={`Seleccionar ${label.toLowerCase()}`} value="" />
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const Prices = () => {
  const [empresa, setEmpresa] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoViaje, setTipoViaje] = useState("");

  const {
    precio,
    ciudades,
    empresas,
    tiposViaje,
    loading,
    error,
    isValidSelection,
  } = usePrices(empresa, origen, destino, tipoViaje);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
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
      <CustomPicker
        label="Empresa"
        selectedValue={empresa}
        onValueChange={(value) => {
          setEmpresa(value);
          setOrigen("");
          setDestino("");
          setTipoViaje("");
        }}
        items={empresas.map((emp) => ({
          label: emp.NombreEmpresa,
          value: emp.IdEmpresa.toString(),
        }))}
        enabled={true}
      />
      <CustomPicker
        label="Ciudad Origen"
        selectedValue={origen}
        onValueChange={setOrigen}
        items={ciudades.map((ciudad) => ({
          label: ciudad.NombreCiudad,
          value: ciudad.IdCiudad.toString(),
        }))}
        enabled={!!empresa}
      />
      <CustomPicker
        label="Ciudad Destino"
        selectedValue={destino}
        onValueChange={setDestino}
        items={ciudades
          .filter((ciudad) => ciudad.IdCiudad.toString() !== origen)
          .map((ciudad) => ({
            label: ciudad.NombreCiudad,
            value: ciudad.IdCiudad.toString(),
          }))}
        enabled={!!origen}
      />
      <CustomPicker
        label="Tipo de Viaje"
        selectedValue={tipoViaje}
        onValueChange={setTipoViaje}
        items={tiposViaje.map((tipo) => ({
          label: tipo.NombreTipoViaje,
          value: tipo.IdTipoViaje.toString(),
        }))}
        enabled={!!destino}
      />
      {isValidSelection && precio !== null && (
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            Precio: ${precio.toLocaleString()}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Prices;
