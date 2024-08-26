import React from "react";
import { TouchableOpacity, TextInput, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomText from "./CustomText";

const FormDatePicker = ({
  date,
  showDatePicker,
  setShowDatePicker,
  onDateChange,
}) => (
  <View style={styles.inputContainer}>
    <CustomText
      type="primary"
      variant="titleLarge"
      content={"Date Added"}
      required
    />
    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
      <TextInput
        mode="outlined"
        value={date}
        editable={false}
        placeholder="Select date"
        style={styles.textInput}
      />
    </TouchableOpacity>
    {showDatePicker && (
      <DateTimePicker
        value={new Date(date)}
        mode="date"
        display="default"
        onChange={onDateChange}
        testID="dateTimePicker"
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default FormDatePicker;
