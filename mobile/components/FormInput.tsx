import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import CustomText from "@/components/CustomText";

const FormInput = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  keyboardType,
}) => (
  <View style={styles.inputContainer}>
    <CustomText
      type="primary"
      variant="titleLarge"
      content={label}
      required
      style={styles.inputLabel}
    />
    <TextInput
      mode="outlined"
      outlineColor={error ? "#eb2917" : "white"}
      activeOutlineColor={error ? "#eb2917" : "white"}
      value={value}
      onChangeText={onChange}
      textColor="#193063"
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={[styles.textInput, error && styles.errorInput]}
    />
    {error && (
      <CustomText
        type="secondary"
        content={`* ${error}`}
        style={styles.errorText}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  errorInput: {
    borderColor: "#eb2917",
  },
  errorText: {
    color: "#eb2917",
    marginTop: 4,
  },
});

export default FormInput;
