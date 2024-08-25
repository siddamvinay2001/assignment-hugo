import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useVehicleFormStore, useVehicleStore } from "@/store/VehicleStore";
import CustomText from "@/components/CustomText";

export default function Success() {
  const router = useRouter();
  const { name, type, engineCC, clearVehicleForm } = useVehicleFormStore();
  const {loadCurrentVehicles} = useVehicleStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heroContainer}>
        <Image
          style={styles.image}
          source={require("@/assets/images/favicon.png")} // Update the image source as needed
        />
        <CustomText
          type="primary"
          content="Congratulations"
          style={styles.congratulationsText}
        />
        <CustomText
          type="primary"
          content={`Successfully added ${name} ${type}-wheeler vehicle with ${engineCC} CC. Keep tracking!`}
          style={styles.detailsText}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            clearVehicleForm();
            router.replace('/');
          }}
        >
          <Text  style={styles.buttonText}>
            Continue->
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6EC",
    paddingHorizontal: 20,
  },
  heroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00507D",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#7A8B97",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#00507D",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
