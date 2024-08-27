import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { format } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useRefuelStore } from "@/store/RefuelStore";
import { useVehicleStore } from "@/store/VehicleStore";
import { useProfileStore } from "@/store/ProfileStore";
import CustomText from "@/components/CustomText";
import RefuelCard from "@/components/RefuelCard";
import VehiclePicker from "@/components/VehiclePicker";
import BarChartComponent from "@/components/BarChartComponent";
import ProfileIcon from "@/components/ProfileIcon";
import { useSession } from "@/providers/SessionProvider";
import { useCurrentStore } from "@/store/CurrentStore";

const screenWidth = Dimensions.get("window").width - 20;

export default function Home() {
  const router = useRouter();
  const { vehicles } = useVehicleStore();
  const { deleteProfile, deleteAllAccounts } = useProfileStore();
  const { refuels } = useRefuelStore();
  const { setAuthenticated } = useSession();
  const { currentProfile, currentVehicleId, setCurrentProfile } =
    useCurrentStore();

  const handleSwitchUser = () => {
    setCurrentProfile(null);
    setAuthenticated(false);
  };

  const handleDeleteAccount = async () => {
    await deleteProfile(currentProfile?.id);
    setAuthenticated(false);
  };

  const handleDeleteAllAccounts = async () => {
    await deleteAllAccounts();
    setAuthenticated(false);
  };

  const currentVehicles = vehicles.filter(
    (vehicle) => vehicle.profileId === currentProfile?.id
  );

  const currentRefuels = refuels.filter(
    (refuel) => refuel.vehicleId === currentVehicleId
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ProfileIcon
          onSwitchUser={handleSwitchUser}
          onDeleteAccount={handleDeleteAccount}
          onDeleteAllAccounts={handleDeleteAllAccounts}
        />
        <View style={styles.header}>
          <CustomText
            content={`Hi ${currentProfile?.name}, here is everything about you`}
            style={styles.greetingText}
          />
        </View>
        {currentVehicles.length === 0 ? (
          <View style={styles.emptyContainer}>
            <CustomText content="No Vehicle records found." />
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/add-vehicle")}
            >
              <Text style={styles.buttonText}>Add Vehicles →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <VehiclePicker currentVehicles={currentVehicles} />
            {currentRefuels.length === 0 ? (
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
                <BarChartComponent
                  data={refuels.map((item) => item.cost)}
                  labels={refuels.map((item) =>
                    format(new Date(item.date), "MMM")
                  )}
                  width={screenWidth}
                />
                <CustomText
                  content="Refuelling History"
                  style={styles.historyTitle}
                />
                <View style={styles.vehicleList}>
                  {currentRefuels.map((refuel) => (
                    <RefuelCard key={refuel.id} refuel={refuel} />
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 20,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  greetingText: {
    fontSize: 18,
    marginTop: 80,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
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
  vehicleList: {
    paddingVertical: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
});
