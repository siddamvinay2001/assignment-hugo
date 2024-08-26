import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomText from "@/components/CustomText";
import { useRefuelFormStore, useRefuelStore } from "@/store/RefuelStore";
import { z } from "zod";
import { debounce } from "lodash";
import { useProfileStore } from "@/store/ProfileStore";
import { Button, IconButton } from "react-native-paper";
import { refuelSchema } from "@/utils/validationSchema";

export default function AddRefuel() {
  const {
    fuelAdded,
    cost,
    date,
    odometerStart,
    odometerEnd,
    errors,
    setFuelAdded,
    setCost,
    setDate,
    setOdometerStart,
    setOdometerEnd,
    setErrors,
    clearRefuelForm,
  } = useRefuelFormStore();
  const { currentProfile } = useProfileStore();
  const {
    addRefuel,
    removeRefuel,
    loadVehicleRefuels,
    updateRefuel,
    selectedVehicle,
  } = useRefuelStore();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  console.log(selectedVehicle);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [selectedDate, setSelectedDate] = useState(new Date(date));

  const validate = useCallback(
    debounce(() => {
      try {
        refuelSchema.parse({
          fuelAdded,
          cost,
          date,
          odometerStart,
          odometerEnd,
        });
        setErrors({});
      } catch (e) {
        if (e instanceof z.ZodError) {
          const errorMessages: { [key: string]: string } = {};
          e.errors.forEach((err) => {
            if (err.path.length > 0) {
              errorMessages[err.path[0]] = err.message;
            }
          });
          setErrors(errorMessages);
        }
      }
    }, 300),
    [fuelAdded, cost, date, odometerStart, odometerEnd]
  );

  useEffect(() => {
    validate();
  }, [validate]);

  const isFormValid = !Object.keys(errors).length;

  const handleAddRefuel = async () => {
    if (isFormValid) {
      try {
        const newRefuel = {
          fuelAdded,
          cost,
          date,
          odometerStart,
          odometerEnd,
          vehicleId: Number(selectedVehicle),
        };
        if (id === "-1") {
          await addRefuel(newRefuel);
          await loadVehicleRefuels(selectedVehicle);
        } else {
          await updateRefuel({ ...newRefuel, id: Number(id) });
          await loadVehicleRefuels(selectedVehicle);
        }
        router.replace("/");
      } catch (err) {
        console.log("Failed to add refuel", err);
      }
    }
  };

  const handleDelete = async () => {
    if (id && id !== "-1") {
      try {
        await removeRefuel(Number(id));
        await loadVehicleRefuels(selectedVehicle);
        router.replace("/");
      } catch (err) {
        console.log("Failed to delete refuel", err);
      }
    }
  };

  const handleCancel = () => {
    clearRefuelForm();
    router.back();
  };

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setSelectedDate(date);
      setDate(date.toISOString().split("T")[0]);
    }
  };

  const showDatePickerModal = () => {
    setMode("date");
    setShowDatePicker(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaView style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerContainer}>
              <CustomText
                type="primary"
                variant="displaySmall"
                content={id === "-1" ? "Add Refuel" : "Edit Refuel"}
                style={styles.titleText}
              />
              <IconButton
                icon="arrow-left"
                size={24}
                onPress={handleCancel}
                style={{ width: "100%", alignItems: "flex-start" }}
              />
            </View>

            <View style={styles.heroSection}>
              <View style={styles.inputContainer}>
                <CustomText
                  type="primary"
                  variant="titleLarge"
                  content="Fuel Added(Liters)"
                  required
                  style={styles.inputLabel}
                />
                <TextInput
                  mode="outlined"
                  outlineColor={errors.fuelAdded ? "#eb2917" : "white"}
                  activeOutlineColor={errors.fuelAdded ? "#eb2917" : "white"}
                  value={fuelAdded}
                  onChangeText={(text) => {
                    setFuelAdded(Number(text));
                  }}
                  textColor="#193063"
                  placeholder="Enter fuel added"
                  keyboardType="numeric"
                  style={[
                    styles.textInput,
                    errors.fuelAdded && styles.errorInput,
                  ]}
                />
                {errors.fuelAdded && (
                  <CustomText
                    type="secondary"
                    content={`* ${errors.fuelAdded}`}
                    style={styles.errorText}
                  />
                )}
              </View>

              <View style={styles.inputContainer}>
                <CustomText
                  type="primary"
                  variant="titleLarge"
                  content="Cost (Rupees $)"
                  required
                  style={styles.inputLabel}
                />
                <TextInput
                  mode="outlined"
                  outlineColor={errors.cost ? "#eb2917" : "white"}
                  activeOutlineColor={errors.cost ? "#eb2917" : "white"}
                  value={cost}
                  onChangeText={(text) => {
                    setCost(Number(text));
                  }}
                  textColor="#193063"
                  placeholder="Enter cost"
                  keyboardType="numeric"
                  style={[styles.textInput, errors.cost && styles.errorInput]}
                />
                {errors.cost && (
                  <CustomText
                    type="secondary"
                    content={`* ${errors.cost}`}
                    style={styles.errorText}
                  />
                )}
              </View>

              <View style={styles.inputContainer}>
                <CustomText
                  type="primary"
                  variant="titleLarge"
                  content="Date"
                  required
                  style={styles.inputLabel}
                />
                <TouchableOpacity onPress={showDatePickerModal}>
                  <TextInput
                    mode="outlined"
                    outlineColor={errors.date ? "#eb2917" : "white"}
                    activeOutlineColor={errors.date ? "#eb2917" : "white"}
                    value={date}
                    editable={false}
                    placeholder="Select date"
                    style={[styles.textInput, errors.date && styles.errorInput]}
                  />
                </TouchableOpacity>
                {errors.date && (
                  <CustomText
                    type="secondary"
                    content={`* ${errors.date}`}
                    style={styles.errorText}
                  />
                )}
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode={mode}
                    display="default"
                    onChange={onDateChange}
                    testID="dateTimePicker"
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <CustomText
                  type="primary"
                  variant="titleLarge"
                  content="Odometer Start"
                  required
                  style={styles.inputLabel}
                />
                <TextInput
                  mode="outlined"
                  outlineColor={errors.odometerStart ? "#eb2917" : "white"}
                  activeOutlineColor={
                    errors.odometerStart ? "#eb2917" : "white"
                  }
                  value={odometerStart}
                  onChangeText={(text) => {
                    setOdometerStart(Number(text));
                  }}
                  textColor="#193063"
                  placeholder="Enter odometer start"
                  keyboardType="numeric"
                  style={[
                    styles.textInput,
                    errors.odometerStart && styles.errorInput,
                  ]}
                />

                {errors.odometerStart && (
                  <CustomText
                    type="secondary"
                    content={`* ${errors.odometerStart}`}
                    style={styles.errorText}
                  />
                )}
              </View>

              <View style={styles.inputContainer}>
                <CustomText
                  type="primary"
                  variant="titleLarge"
                  content="Odometer End"
                  required
                  style={styles.inputLabel}
                />
                <TextInput
                  mode="outlined"
                  outlineColor={errors.odometerEnd ? "#eb2917" : "white"}
                  activeOutlineColor={errors.odometerEnd ? "#eb2917" : "white"}
                  value={odometerEnd}
                  onChangeText={(text) => {
                    setOdometerEnd(Number(text));
                  }}
                  textColor="#193063"
                  placeholder="Enter odometer end"
                  keyboardType="numeric"
                  style={[
                    styles.textInput,
                    errors.odometerEnd && styles.errorInput,
                  ]}
                />
                {errors.odometerEnd && (
                  <CustomText
                    type="secondary"
                    content={`* ${errors.odometerEnd}`}
                    style={styles.errorText}
                  />
                )}
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleAddRefuel}
              disabled={!isFormValid}
              style={styles.submitButton}
            >
              {id === "-1" ? "Add Refuel" : "Update Refuel"}
            </Button>

            <Button
              mode="contained"
              onPress={() => {
                clearRefuelForm();
                router.back();
              }}
            >
              Cancel Refuel
            </Button>
            {id !== "-1" && (
              <Button
                mode="contained"
                onPress={handleDelete}
                style={styles.deleteButton}
              >
                Delete Refuel
              </Button>
            )}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#F6F6EC",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
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
  heroSection: {
    marginBottom: 20,
  },
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
