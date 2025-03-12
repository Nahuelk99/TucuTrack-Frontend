export const useMain = () => {
  // Función para manejar el clic en el chat
  const handleChatPress = () => {
    alert("Función a implementar próximamente");
  };

  // Datos de las tarjetas
  const cards = [
    {
      href: "/tracking",
      icon: "bus",
      title: "Por donde viene",
      description: "Localización.",
    },
    {
      href: "/prices",
      icon: "logo-usd",
      title: "Tarifas",
      description: "Tarifas actuales del servicio.",
    },
    {
      href: "/schedules",
      icon: "time",
      title: "Horarios",
      description: "Horarios vigentes del servicio.",
    },
    {
      icon: "chatbox-ellipses-sharp",
      title: "Chat",
      description: "Función próximamente.",
      onPress: handleChatPress,
    },
  ];

  return { cards };
};
