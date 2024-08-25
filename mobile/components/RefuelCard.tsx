import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { useRefuelStore } from "@/store/RefuelStore";

const RefuelCard = ({ refuel }) => {
  const [visible, setVisible] = useState(false);
  const { removeRefuel } = useRefuelStore();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await removeRefuel(refuel.id);
    } catch (error) {
      console.error("Failed to remove refuelling:", error);
    } finally {
      setVisible(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>{refuel.date}</Text>
          <Text style={styles.text}>{`${refuel.fuelAdded} L`}</Text>
        </View>
      </View>
      <View style={styles.costContainer}>
        <Text style={styles.costText}>{`+$ ${refuel.cost}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  costContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  costText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RefuelCard;
