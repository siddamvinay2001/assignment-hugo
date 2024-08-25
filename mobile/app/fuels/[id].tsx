import React, { useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, IconButton } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomText from "@/components/CustomText";
import { useRefuelFormStore, useRefuelStore } from "@/store/RefuelStore";
import { z } from "zod";
import { debounce } from "lodash";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useProfileStore } from "@/store/ProfileStore";

// Define the Zod schema for validation
const refuelSchema = z
  .object({
    fuelAdded: z.number().positive("Fuel added must be greater than 0"),
    cost: z.number().positive("Cost must be greater than 0"),
    date: z.string().min(1, "Date is required"), // Assuming date is a string in ISO format
    odometerStart: z.number().int("Odometer start must be an integer"),
    odometerEnd: z.number().int("Odometer end must be an integer"),
  })
  .refine((data) => data.odometerEnd >= data.odometerStart, {
    message: "Odometer end must be greater than or equal to odometer start",
    path: ["odometerEnd"],
  });

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
  const { addRefuel, removeRefuel } = useRefuelStore();
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Fetch the id from the route parameters

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

  useEffect(() => {
    if (id && id !== "-1") {
      // Load existing refuel data if editing
      const loadRefuel = async () => {
        const refuel = await useRefuelStore
          .getState()
          .refuels.find((r) => r.id === parseInt(id));
        if (refuel) {
          setFuelAdded(refuel.fuelAdded);
          setCost(refuel.cost);
          setDate(refuel.date);
          setOdometerStart(refuel.odometerStart);
          setOdometerEnd(refuel.odometerEnd);
        }
      };
      loadRefuel();
    }
  }, [id]);

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
          vehicleId: currentProfile?.id, // Assuming currentProfile contains the vehicle ID
        };
        if (id === "-1") {
          await addRefuel(newRefuel);
        } else {
          // Update existing refuel logic here
          // await updateRefuel(id, newRefuel); // Implement updateRefuel if necessary
        }
        router.replace("/success");
      } catch (err) {
        console.log("Failed to add refuel", err);
      }
    }
  };

  const handleDelete = async () => {
    if (id && id !== "-1") {
      try {
        await removeRefuel(parseInt(id));
        router.replace("/success");
      } catch (err) {
        console.log("Failed to delete refuel", err);
      }
    }
  };

  const handleCancel = () => {
    clearRefuelForm();
    router.back();
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
              <IconButton
                icon="arrow-left"
                size={24}
                onPress={handleCancel}
                style={styles.iconButton}
              />
              {id && id !== "-1" && (
                <IconButton
                  icon="delete"
                  size={24}
                  onPress={handleDelete}
                  style={styles.deleteButton}
                />
              )}
              <CustomText
                type="primary"
                variant="displaySmall"
                content={id === "-1" ? "Add Refuel" : "Edit Refuel"}
                style={styles.titleText}
              />
            </View>

            <View style={styles.heroSection}>
              <View style={styles.inputContainer}>
                <CustomText
                  type="primary"
                  variant="titleLarge"
                  content="Fuel Added"
                  required
                  style={styles.inputLabel}
                />
                <TextInput
                  mode="outlined"
                  outlineColor={errors.fuelAdded ? "#eb2917" : "white"}
                  activeOutlineColor={errors.fuelAdded ? "#eb2917" : "white"}
                  value={fuelAdded}
                  onChangeText={(text) => {
                    setFuelAdded(text);
                    validate(); // Validate immediately on change
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
                  content="Cost"
                  required
                  style={styles.inputLabel}
                />
                <TextInput
                  mode="outlined"
                  outlineColor={errors.cost ? "#eb2917" : "white"}
                  activeOutlineColor={errors.cost ? "#eb2917" : "white"}
                  value={cost}
                  onChangeText={(text) => {
                    setCost(text);
                    validate(); // Validate immediately on change
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
                <TextInput
                  mode="outlined"
                  outlineColor={errors.date ? "#eb2917" : "white"}
                  activeOutlineColor={errors.date ? "#eb2917" : "white"}
                  value={date}
                  onChangeText={(text) => {
                    setDate(text);
                    validate(); // Validate immediately on change
                  }}
                  textColor="#193063"
                  placeholder="Enter date (YYYY-MM-DD)"
                  style={[styles.textInput, errors.date && styles.errorInput]}
                />
                {errors.date && (
                  <CustomText
                    type="secondary"
                    content={`* ${errors.date}`}
                    style={styles.errorText}
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
                    setOdometerStart(text);
                    validate(); // Validate immediately on change
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
                    setOdometerEnd(text);
                    validate(); // Validate immediately on change
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

            <Button
              mode="contained"
              onPress={handleAddRefuel}
              disabled={!isFormValid}
              style={styles.submitButton}
            >
              {id === "-1" ? "Add Refuel" : "Update Refuel"}
            </Button>
          </ScrollView>
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
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginRight: 10,
  },
  titleText: {
    flex: 1,
    textAlign: "center",
  },
  heroSection: {
    alignItems: "center",
  },
  heroImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  inputLabel: {
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "white",
  },
  errorInput: {
    borderColor: "#eb2917",
  },
  errorText: {
    color: "#eb2917",
    marginTop: 4,
  },
  submitButton: {
    marginTop: 20,
  },
});
