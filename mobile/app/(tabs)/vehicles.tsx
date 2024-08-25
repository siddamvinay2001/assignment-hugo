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
import VehicleCard from "@/components/VehicleCard";

export default function Vehicle() {
  const router = useRouter();
  const { vehicles, currentVehicles, loadCurrentVehicles, loadVehicles } =
    useVehicleStore();
  const { currentProfile } = useProfileStore();

  useEffect(() => {
    const initialize = async () => {
      if (currentProfile?.id) {
        try {
          await loadCurrentVehicles(currentProfile.id);
        } catch (error) {
          console.error("Error loading current vehicles:", error);
        }
      } else {
        console.log("No profile ID found, skipping vehicle load.");
      }
    };

    initialize();
  }, [currentProfile, vehicles]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText
          type="primary"
          variant="displaySmall"
          content="Vehicles"
          style={styles.titleText}
        />
      </View>

      {currentVehicles.length === 0 ? (
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
          data={currentVehicles}
          renderItem={({ item }) => <VehicleCard vehicle={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.vehicleList}
        />
      )}
      {currentVehicles.length != 0 && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/add-vehicle")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F7",
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
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
