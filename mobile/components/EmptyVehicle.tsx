import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import CustomText from "@/components/CustomText";

const EmptyVehicle = () => {
  const router = useRouter();

  return (
    <View style={styles.emptyContainer}>
      <CustomText content="No vehicles available. Please add a vehicle first." />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/add-vehicle")}
      >
        <Text style={styles.buttonText}>Add Vehicle →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00507D",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EmptyVehicle;
