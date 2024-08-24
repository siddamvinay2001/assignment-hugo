// import React, { useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { TextInput, Button, Card } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";
// import { useProfileStore } from "@/store/ProfileStore";
// import { useVehicleStore } from "@/store/VehicleStore";

// export default function AddVehicle() {
//   const {name, type, engineCC, setName , setType, setEngineCC }

//   const { currentProfile } = useProfileStore();
//   const addVehicle = useVehicleStore((state) => state.addVehicle);
//   const navigation = useNavigation();

//   const handleAddVehicle = async () => {
//     if (!vehicleName || !vehicleType || !engineCC) {
//       // Handle validation error
//       return;
//     }

//     const vehicle = {
//       name: vehicleName,
//       type: vehicleType,
//       engineCC: parseInt(engineCC),
//       profileId: currentProfile.id,
//     };

//     await addVehicle(vehicle);
//     navigation.navigate("VehicleAdded", { vehicleName });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Card style={styles.card}>
//         <Card.Title title="Add Vehicle" />
//         <Card.Content>
//           <TextInput
//             label="Vehicle Name"
//             value={vehicleName}
//             onChangeText={setVehicleName}
//             style={styles.input}
//           />
//           <TextInput
//             label="Vehicle Type"
//             value={vehicleType}
//             onChangeText={setVehicleType}
//             style={styles.input}
//             right={<TextInput.Icon icon="menu-down" />}
//           />
//           <TextInput
//             label="Engine CC"
//             value={engineCC}
//             onChangeText={setEngineCC}
//             style={styles.input}
//             keyboardType="numeric"
//           />
//           <Button
//             mode="contained"
//             onPress={handleAddVehicle}
//             style={styles.button}
//           >
//             Add Vehicle
//           </Button>
//         </Card.Content>
//       </Card>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#F0F4F7",
//   },
//   card: {
//     width: "100%",
//   },
//   input: {
//     marginBottom: 16,
//   },
//   button: {
//     marginTop: 20,
//   },
// });
