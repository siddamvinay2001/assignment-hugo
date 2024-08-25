import React, { useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import CustomText from "@/components/CustomText";
import { useVehicleFormStore, useVehicleStore } from "@/store/VehicleStore";
import { z } from "zod";
import { debounce } from "lodash";
import { vehicleSchema } from "@/utils/validationSchema";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useProfileStore } from "@/store/ProfileStore";

const vehicleTypes = [
  { label: "2 Wheeler", value: 2 },
  { label: "3 Wheeler", value: 3 },
  { label: "4 Wheeler", value: 4 },
];

export default function AddVehicle() {
  const {
    name,
    type,
    engineCC,
    errors,
    setName,
    setType,
    setEngineCC,
    setErrors,
    clearVehicleForm,
  } = useVehicleFormStore();
  const { currentProfile } = useProfileStore();
  const { addVehicle, loadCurrentVehicles } = useVehicleStore();
  const router = useRouter();

  const validate = useCallback(
    debounce(() => {
      try {
        vehicleSchema.parse({ name, type, engineCC });
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
    [name, type, engineCC]
  );

  useEffect(() => {
    validate();
  }, [validate]);

  const isFormValid = !Object.keys(errors).length;

  const handleAddVehicle = async () => {
    if (isFormValid) {
      try {
        const newVehicle = {
          name,
          profileId: currentProfile?.id,
          type,
          engineCC,
        };
        await addVehicle(newVehicle);
        await loadCurrentVehicles(currentProfile?.id);
        router.replace("/success");
      } catch (err) {
        console.log("Failed to add a vehicle", err);
      }
    }
  };

  const handleCancel = () => {
    clearVehicleForm();
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
              <View style={styles.iconButtonContainer}>
                <IconButton
                  icon="arrow-left"
                  size={24}
                  onPress={handleCancel}
                  style={styles.iconButton}
                />
              </View>
              <CustomText
                type="primary"
                variant="displaySmall"
                content="Add Vehicle"
                style={styles.titleText}
              />
            </View>
            <View style={styles.heroSection}>
              <Image
                style={styles.heroImage}
                source={require("@/assets/images/favicon.png")}
              />
              <View style={styles.inputContainer}>
                <CustomText
                  type="primary"
                  variant="titleLarge"
                  content="Name"
                  required
                  style={styles.inputLabel}
                />
                <TextInput
                  mode="outlined"
                  outlineColor={errors.name ? "#eb2917" : "white"}
                  activeOutlineColor={errors.name ? "#eb2917" : "white"}
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    validate();
                  }}
                  textColor="#193063"
                  placeholder="Enter vehicle name"
                  style={[styles.textInput, errors.name && styles.errorInput]}
                />
                {errors.name && (
                  <CustomText
                    type="secondary"
                    content={`* ${errors.name}`}
                    style={styles.errorText}
                  />
                )}
              </View>

              <View style={styles.inputContainer}>
                <CustomText
                  type="primary"
                  variant="titleLarge"
                  content="Vehicle Type"
                  required
                  style={styles.inputLabel}
                />
                <Dropdown
                  style={[styles.dropdown, errors.type && styles.errorInput]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  containerStyle={styles.dropdownContainer}
                  data={vehicleTypes}
                  labelField="label"
                  valueField="value"
                  placeholder="Select vehicle type"
                  value={type}
                  onChange={(item) => {
                    setType(item.value);
                  }}
                />
                {errors.type && (
                  <CustomText
                    type="secondary"
                    content={`* ${errors.type}`}
                    style={styles.errorText}
                  />
                )}
              </View>

              <View style={styles.inputContainer}>
                <CustomText
                  type="primary"
                  variant="titleLarge"
                  content="Engine CC"
                  required
                  style={styles.inputLabel}
                />
                <TextInput
                  mode="outlined"
                  outlineColor={errors.engineCC ? "#eb2917" : "white"}
                  activeOutlineColor={errors.engineCC ? "#eb2917" : "white"}
                  value={engineCC}
                  onChangeText={(text) => {
                    setEngineCC(Number(text));
                    validate(); // Validate immediately on change
                  }}
                  textColor="#193063"
                  placeholder="Enter engine CC"
                  style={[
                    styles.textInput,
                    errors.engineCC && styles.errorInput,
                  ]}
                />
                {errors.engineCC && (
                  <CustomText
                    type="secondary"
                    content={`* ${errors.engineCC}`}
                    style={styles.errorText}
                  />
                )}
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={handleAddVehicle}
                  style={styles.button}
                  disabled={!isFormValid}
                >
                  Add Vehicle
                </Button>
                <Button
                  mode="outlined"
                  onPress={handleCancel}
                  style={styles.cancelButton}
                >
                  Cancel
                </Button>
              </View>
            </View>
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
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: "#F6F6EC",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  iconButtonContainer: {
    position: "absolute",
    left: 0,
    top: 30,
  },
  iconButton: {
    marginTop: 0,
  },
  titleText: {
    color: "#193063",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  heroSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heroImage: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  inputLabel: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "white",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white", // Set background color to white
  },
  dropdownContainer: {
    backgroundColor: "white", // Ensure the container background is also white
  },
  errorInput: {
    borderColor: "#eb2917",
  },
  errorText: {
    color: "#eb2917",
    marginTop: 5,
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    marginBottom: 10,
    width: "100%",
  },
  cancelButton: {
    width: "100%",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "black",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 10,
  },
});
