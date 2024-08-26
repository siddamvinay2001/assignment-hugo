import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import CustomText from "@/components/CustomText";

const HeaderComponent = ({ title, onBackPress }) => (
  <View style={styles.headerContainer}>
    <CustomText
      type="primary"
      variant="displaySmall"
      content={title}
      style={styles.titleText}
    />
    <IconButton
      icon="arrow-left"
      size={24}
      onPress={onBackPress}
      style={styles.backButton}
    />
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  titleText: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#193063",
  },
  backButton: {
    width: "100%",
    alignItems: "flex-start",
  },
});

export default HeaderComponent;
