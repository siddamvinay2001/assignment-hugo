import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Menu, IconButton, Button, Divider } from "react-native-paper";
import CustomText from "./CustomText";
import { useVehicleStore } from "@/store/VehicleStore";
import { useProfileStore } from "@/store/ProfileStore";

const VehicleCard = ({ vehicle }) => {
  const [visible, setVisible] = useState(false);
  const { removeVehicle, loadCurrentVehicles } = useVehicleStore();
  const { currentProfile } = useProfileStore();

  const handleDelete = async () => {
    try {
      await removeVehicle(vehicle.id);
      await loadCurrentVehicles(currentProfile?.id);
    } catch (error) {
      console.error("Failed to remove vehicle:", error);
    } finally {
      setVisible(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.vehicleImage}
        />
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <IconButton
              icon="dots-vertical"
              size={24}
              onPress={() => setVisible(true)}
            />
          }
        >
          <Menu.Item onPress={handleDelete} title="Delete" />
          <Divider />
          <Menu.Item onPress={() => setVisible(false)} title="Cancel" />
        </Menu>
      </View>
      <View style={styles.vehicleDetails}>
        <View style={styles.detailsLeft}>
          <CustomText
            variant="titleMedium"
            style={{ fontSize: 18 }}
            content={vehicle.name}
          />
          <Text style={styles.vehicleType}>{vehicle.type} Wheeler</Text>
        </View>
        <View style={styles.detailsRight}>
          <Text style={styles.engineCC}>{vehicle.engineCC} CC</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
  },
  vehicleImage: {
    width: "85%",
    height: 100,
    borderRadius: 10,
  },
  vehicleDetails: {
    flex: 1,
    marginTop: 2,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  detailsLeft: {
    flex: 1,
    flexDirection: "column",
  },
  detailsRight: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  vehicleType: {
    fontSize: 14,
    color: "#7A8B97",
  },
  engineCC: {
    fontSize: 14,
    color: "#7A8B97",
  },
});

export default VehicleCard;
