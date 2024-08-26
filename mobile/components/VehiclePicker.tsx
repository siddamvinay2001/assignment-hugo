import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRefuelStore } from "@/store/RefuelStore";

const VehiclePicker = ({ currentVehicles }) => {
  const { selectedVehicle, setSelectedVehicle } = useRefuelStore();

  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selectedVehicle}
        onValueChange={(itemValue) => setSelectedVehicle(itemValue)}
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
