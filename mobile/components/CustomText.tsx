import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { CustomTextProps } from "@/types/Text.types";

export default function CustomText({
  type = "primary",
  variant,
  content,
  style,
  required = false,
}: CustomTextProps) {
  const textColor = type === "primary" ? "#193063" : "#eb2917";
  const asteriskColor = "#eb2917";

  return (
    <View style={styles.container}>
      <Text variant={variant} style={[style, { color: textColor }]}>
        {content}
      </Text>
      {required && <Text style={{ color: asteriskColor }}>*</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
