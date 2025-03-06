import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Animated,
  Platform,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import About from "../components/About";
import styles from "../styles/main";

const Main = () => {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/Logo-TucuTrack.png")}
            style={styles.logo}
          />
        </View>

        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          <HoverableCard
            href="/tracking"
            icon="bus"
            title="Por donde viene"
            description="Localización."
          />
          <HoverableCard
            href="/prices"
            icon="logo-usd"
            title="Tarifas"
            description="Tarifas actuales del servicio."
          />
          <HoverableCard
            href="/schedules"
            icon="time"
            title="Horarios"
            description="Horarios vigentes del servicio."
          />
          <HoverableCard
            icon="chatbox-ellipses-sharp"
            title="Chat"
            description="Función próximamente."
          />
        </View>
        <About />
      </View>
    </ScrollView>
  );
};

const HoverableCard = ({ href, icon, title, description }) => {
  const router = useRouter();
  const scaleAnim = new Animated.Value(1);
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = () => {
    if (href) {
      router.push(href);
    }
  };

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.05,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleHoverIn = () => {
    setIsHovered(true);
    Animated.timing(scaleAnim, {
      toValue: 1.05,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={Platform.OS === "web" ? handleHoverIn : undefined}
      onHoverOut={Platform.OS === "web" ? handleHoverOut : undefined}
      style={[
        styles.card,
        { transform: [{ scale: scaleAnim }] },
        isHovered && styles.cardHovered,
      ]}
    >
      <View style={styles.cardContent}>
        <Ionicons
          name={icon}
          size={40}
          color="#fff"
          style={[styles.icon, isHovered && styles.iconHovered]}
        />
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </AnimatedPressable>
  );
};

export default Main;
