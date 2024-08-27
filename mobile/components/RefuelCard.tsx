import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { Menu, IconButton, Button, Divider } from "react-native-paper";
import { useRefuelFormStore, useRefuelStore } from "@/store/RefuelStore";
import CustomText from "./CustomText";

const RefuelCard = ({ refuel }) => {
  const [visible, setVisible] = useState(false);
  const { clearRefuelForm } = useRefuelFormStore();
  const { removeRefuel, loadRefuels } = useRefuelStore();
  const router = useRouter();
  const deleteRefuel = async () => {
    await removeRefuel(refuel.id);
    await loadRefuels();
  };
  const formattedDate = new Date(refuel.date).toLocaleDateString();
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <CustomText
            type="secondary"
            content={`On ${formattedDate}`}
            variant="titleMedium"
          />
          <CustomText
            type="primary"
            content={`${refuel.fuelAdded} L`}
            variant="titleSmall"
          />
        </View>
      </View>
      <View style={styles.costContainer}>
        <CustomText
          type="primary"
          content={`+₹ ${refuel.cost}`}
          style={styles.costText}
          variant="titleSmall"
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
            onPress={() => {
              setVisible(false);
            }}
            title="Cancel"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              clearRefuelForm();
              router.push(`/fuels/${refuel.id}`);
            }}
            title="Edit"
          />
          <Divider />
          <Menu.Item onPress={deleteRefuel} title="Delete" />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  costContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  costText: {
    fontSize: 14,
    fontWeight: "100",
  },
});

export default RefuelCard;
