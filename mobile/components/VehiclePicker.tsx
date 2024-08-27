import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useVehicleStore } from "@/store/VehicleStore";
import { useCurrentStore } from "@/store/CurrentStore";

const VehiclePicker = () => {
  const { vehicles } = useVehicleStore();
  const { currentProfile, currentVehicleId, setCurrentVehicleId } =
    useCurrentStore();

  const currentVehicles = vehicles.filter(
    (vehicle) => vehicle.profileId === currentProfile?.id
  );

  useEffect(() => {
    if (currentVehicleId === null) {
      if (currentVehicles.length > 0) {
        setCurrentVehicleId(currentVehicles[0].id);
      }
    }
  }, []);

  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={currentVehicleId}
        onValueChange={async (itemValue) => {
          setCurrentVehicleId(itemValue);
        }}
        style={styles.picker}
      >
        {currentVehicles.map((vehicle) => (
          <Picker.Item
            key={vehicle.id}
            label={vehicle.name}
            value={vehicle.id}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});

export default VehiclePicker;
