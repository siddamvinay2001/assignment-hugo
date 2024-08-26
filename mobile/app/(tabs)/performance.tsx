import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import CustomText from "@/components/CustomText";
import EmptyVehicle from "@/components/EmptyVehicle";
import VehiclePicker from "@/components/VehiclePicker";
import BarChartComponent from "@/components/BarChartComponent";
import LineChartComponent from "@/components/LineChartComponent";
import { format } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";
import { useVehicleStore } from "@/store/VehicleStore";
import { useProfileStore } from "@/store/ProfileStore";
import { useRefuelStore } from "@/store/RefuelStore";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width - 20;

const Performance = () => {
  const { currentProfile } = useProfileStore();
  const { selectedVehicle, setSelectedVehicle, refuels, loadVehicleRefuels } =
    useRefuelStore();
  const { vehicles, loadCurrentVehicles, currentVehicles } = useVehicleStore();
  const router = useRouter();
  useEffect(() => {
    const init = async () => {
      await loadCurrentVehicles(currentProfile?.id);
    };
    init();
  }, [currentProfile?.id]);

  useEffect(() => {
    const initialize = async () => {
      if (selectedVehicle === null) {
        if (currentVehicles.length > 0) {
          const initialVehicleId = currentVehicles[0].id;
          setSelectedVehicle(initialVehicleId);
          await loadVehicleRefuels(initialVehicleId);
        }
      } else if (selectedVehicle) {
        await loadVehicleRefuels(selectedVehicle);
      }
    };
    initialize();
  }, [currentVehicles, selectedVehicle]);

  const moneySpentData = refuels.map((item) => item.cost);
  const dates = refuels.map((item) => format(new Date(item.date), "MMM"));
  const mileageData = refuels.map(
    (item) => item.odometerEnd - item.odometerStart
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CustomText
          type="primary"
          variant="displaySmall"
          content="Performance"
          style={styles.headerText}
        />
        {currentVehicles.length === 0 ? (
          <View style={styles.emptyVehicleContainer}>
            <EmptyVehicle />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <VehiclePicker currentVehicles={currentVehicles} />
            {refuels.length === 0 ? (
              <View style={styles.emptyContainer}>
                <CustomText content="No refuelling records found." />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push("/fuels/-1")}
                >
                  <Text style={styles.buttonText}>Add Refuelling →</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <BarChartComponent data={moneySpentData} labels={dates} />
                <LineChartComponent data={mileageData} labels={dates} />
              </>
            )}
          </View>
          // <View style={{ flex: 1 }}>
          //   <VehiclePicker currentVehicles={currentVehicles} />
          //   <BarChartComponent data={moneySpentData} labels={dates} />
          //   <LineChartComponent data={mileageData} labels={dates} />
          // </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: "#F3F4F6",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    width: "100%",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyVehicleContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00507D",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Performance;
