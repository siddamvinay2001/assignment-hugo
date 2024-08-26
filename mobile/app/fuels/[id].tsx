import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useRefuelFormStore, useRefuelStore } from "@/store/RefuelStore";
import { z } from "zod";
import { debounce } from "lodash";
import { useProfileStore } from "@/store/ProfileStore";
import HeaderComponent from "@/components/HeaderComponent";
import FormInput from "@/components/FormInput";
import FormDatePicker from "@/components/FormDatePicker";
import FormButtons from "@/components/FormButtons";
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

  const [showDatePicker, setShowDatePicker] = useState(false);

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
          const errorMessages = e.errors.reduce((acc, err) => {
            if (err.path.length > 0) {
              acc[err.path[0]] = err.message;
            }
            return acc;
          }, {});
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
          await clearRefuelForm();
        } else {
          await updateRefuel({ ...newRefuel, id: Number(id) });
          await loadVehicleRefuels(selectedVehicle);
          await clearRefuelForm();
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
      setDate(date.toISOString().split("T")[0]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <HeaderComponent
              title={id === "-1" ? "Add Refuel" : "Edit Refuel"}
              onBackPress={handleCancel}
            />
            <View style={styles.heroSection}>
              <FormInput
                label="Fuel Added(Liters)"
                value={fuelAdded}
                onChange={(text) => setFuelAdded(Number(text))}
                error={errors.fuelAdded}
                placeholder="Enter fuel added"
                keyboardType="numeric"
              />
              <FormInput
                label="Cost (Rupees $)"
                value={cost}
                onChange={(text) => setCost(Number(text))}
                error={errors.cost}
                placeholder="Enter cost"
                keyboardType="numeric"
              />
              <FormDatePicker
                date={date}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                onDateChange={onDateChange}
              />
              <FormInput
                label="Odometer Start"
                value={odometerStart}
                onChange={(text) => setOdometerStart(Number(text))}
                error={errors.odometerStart}
                placeholder="Enter odometer start"
                keyboardType="numeric"
              />
              <FormInput
                label="Odometer End"
                value={odometerEnd}
                onChange={(text) => setOdometerEnd(Number(text))}
                error={errors.odometerEnd}
                placeholder="Enter odometer end"
                keyboardType="numeric"
              />
            </View>
          </ScrollView>
          <FormButtons
            onAddRefuel={handleAddRefuel}
            onCancel={handleCancel}
            onDelete={handleDelete}
            isFormValid={isFormValid}
            showDelete={id !== "-1"}
          />
        </View>
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
  heroSection: {
    marginBottom: 20,
  },
});
