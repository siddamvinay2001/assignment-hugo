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
import { useVehicleFormStore } from "@/store/VehicleStore";
import { z } from "zod";
import { debounce } from "lodash";
import { vehicleSchema } from "@/utils/validationSchema";

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

  const handleAddVehicle = () => {
    if (isFormValid) {
      router.push("/success-page");
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
                    validate(); // Validate immediately on change
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
                  content="2,3,4 Wheeler?"
                  required
                  style={styles.inputLabel}
                />
                <TextInput
                  mode="outlined"
                  outlineColor={errors.type ? "#eb2917" : "white"}
                  activeOutlineColor={errors.type ? "#eb2917" : "white"}
                  value={type}
                  onChangeText={(text) => {
                    setType(Number(text));
                  }}
                  textColor="#193063"
                  placeholder="Enter (2,3,4)"
                  style={[styles.textInput, errors.type && styles.errorInput]}
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
});
