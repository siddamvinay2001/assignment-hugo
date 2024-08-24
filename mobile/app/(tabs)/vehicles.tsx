import CustomText from "@/components/CustomText";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Vehicle() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <CustomText
        type="primary"
        variant="displaySmall"
        content="Vehicles"
        style={{ marginTop: 20 }}
      />
      <View style={styles.heroContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("@/assets/images/icon.png")}
          />
        </View>
        <Text style={styles.subtitle}>
          Add a vehicle to start tracking its refuelling & performance
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/add-vehicle");
          }}
        >
          <Text style={styles.buttonText}>Add Vehicle →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F0F4F7",
    paddingHorizontal: 20,
  },
  heroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  subtitle: {
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
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
