import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Animated, Pressable, View, Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/main";

export const HoverableCard = ({ href, icon, title, description, onPress }) => {
  const router = useRouter();
  const scaleAnim = new Animated.Value(1);
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = () => {
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress();
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
