import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useVehicleStore } from "@/store/VehicleStore";
import { useProfileStore } from "@/store/ProfileStore";
import CustomText from "@/components/CustomText";

export default function Vehicle() {
  const router = useRouter();
  const { vehicles, loadCurrentVehicles } = useVehicleStore();
  const { currentProfile } = useProfileStore();

  useEffect(() => {
    const initialize = async () => {
      if (currentProfile?.id) {
        console.log("Profile ID exists, loading vehicles...", currentProfile);
        try {
          await loadCurrentVehicles(currentProfile.id);
          console.log("Vehicles loaded successfully:", vehicles);
        } catch (error) {
          console.error("Error loading vehicles:", error);
        }
      } else {
        console.log("No profile ID found, skipping vehicle load.");
      }
    };

    initialize();
  }, [currentProfile]);

  const renderVehicleCard = ({ item }) => (
    <View style={styles.card}>
      {/* <Image source={{ uri: item.imageUri }} style={styles.vehicleImage} /> */}
      <View style={styles.vehicleDetails}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <Text style={styles.vehicleType}>{item.type} Wheeler</Text>
        <Text style={styles.engineCC}>{item.engineCC} CC</Text>
      </View>
    </View>
  );
  console.log("vehicles", vehicles);
  console.log("CurrentProfile", currentProfile);
  return (
    <SafeAreaView style={styles.container}>
      <CustomText
        type="primary"
        variant="displaySmall"
        content="Vehicles"
        style={{ marginTop: 20 }}
      />

      {vehicles.length === 0 ? (
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
      ) : (
        <FlatList
          data={vehicles}
          renderItem={renderVehicleCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.vehicleList}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-vehicle")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  vehicleList: {
    paddingVertical: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
  },
  vehicleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  vehicleDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  vehicleType: {
    fontSize: 14,
    color: "#7A8B97",
  },
  engineCC: {
    fontSize: 14,
    color: "#7A8B97",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#00507D",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});
