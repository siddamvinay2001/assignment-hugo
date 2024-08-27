import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const FormButtons = ({
  onAddRefuel,
  onCancel,
  onDelete,
  isFormValid,
  showDelete,
}) => (
  <View style={styles.buttonContainer}>
    <Button
      mode="contained"
      onPress={onAddRefuel}
      disabled={!isFormValid}
      style={styles.submitButton}
    >
      {showDelete ? "Update Refuel" : "Add Refuel"}
    </Button>
    <Button mode="contained" onPress={onCancel}>
      Cancel Refuel
    </Button>
    {showDelete && (
      <Button mode="contained" onPress={onDelete} style={styles.deleteButton}>
        Delete Refuel
      </Button>
    )}
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 16,
  },
  submitButton: {
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#eb2917",
    marginTop: 10,
  },
});

export default FormButtons;
