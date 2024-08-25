import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Menu, IconButton, Divider } from "react-native-paper";
import { useRouter } from "expo-router";
import { useRefuelStore } from "@/store/RefuelStore";
import CustomText from "./CustomText";

const RefuellingCard = ({ refuelling }) => {
  const [visible, setVisible] = useState(false);
  const { removeRefuelling } = useRefuellingStore();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await removeRefuelling(refuelling.id);
    } catch (error) {
      console.error("Failed to remove refuelling:", error);
    } finally {
      setVisible(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomText
          variant="titleMedium"
          content={`Fuel: ${refuelling.fuelType}`}
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
          <Menu.Item
            onPress={() => router.push(`/edit-refuelling/${refuelling.id}`)}
            title="Edit"
          />
          <Divider />
          <Menu.Item onPress={handleDelete} title="Delete" />
        </Menu>
      </View>
      <View style={styles.details}>
        <CustomText content={`Amount: ${refuelling.amount}`} />
        <CustomText content={`Date: ${refuelling.date}`} />
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
  details: {
    marginTop: 8,
  },
});

export default RefuellingCard;
