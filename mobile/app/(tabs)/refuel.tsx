import React, { useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useRefuelStore } from "@/store/RefuelStore";
import { useVehicleStore } from "@/store/VehicleStore";
import { useProfileStore } from "@/store/ProfileStore";
import CustomText from "@/components/CustomText";
import RefuelCard from "@/components/RefuelCard";
import VehiclePicker from "@/components/VehiclePicker";
import EmptyVehicle from "@/components/EmptyVehicle";
import { useCurrentStore } from "@/store/CurrentStore";

export default function Refuel() {
  const router = useRouter();
  const {
    refuels,
    loadRefuels,
    loadVehicleRefuels,
    setSelectedVehicle,
    selectedVehicle,
  } = useRefuelStore();

  const { currentProfile, currentVehicleId } = useCurrentStore();
  const { vehicles } = useVehicleStore();
  const currentVehicles = vehicles.filter(
    (vehicle) => vehicle.profileId === currentProfile?.id
  );
  const currentRefuels = refuels.filter(
    (refuel) => refuel.vehicleId === currentVehicleId
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText
          type="primary"
          variant="displaySmall"
          content="Refuel Records"
          style={styles.titleText}
        />
      </View>

      {currentVehicles.length === 0 ? (
        <EmptyVehicle />
      ) : (
        <>
          <VehiclePicker />

          {currentRefuels.length === 0 ? (
            <View style={styles.emptyContainer}>
              <CustomText content="No refuelling records found." />
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/fuels/-1")}
              >
                <Text style={styles.buttonText}>Add Refuelling →</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={currentRefuels}
              renderItem={({ item }) => <RefuelCard refuel={item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.vehicleList}
            />
          )}

          {currentRefuels.length > 0 && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/fuels/-1")}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          )}
        </>
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
