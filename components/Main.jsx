import React from "react";
import { View, Image, ScrollView } from "react-native";
import { HoverableCard } from "./HoverableCard";
import { useMain } from "../hooks/useMain";
import styles from "../styles/main";

const Main = () => {
  const { cards } = useMain(); // Usa el hook useMain

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
          {cards.map((card, index) => (
            <HoverableCard
              key={index}
              href={card.href}
              icon={card.icon}
              title={card.title}
              description={card.description}
              onPress={card.onPress}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Main;
