import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AvatarButton = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleSwitchUser = () => {
    // Implement Switch User functionality
    setVisible(false);
  };

  const handleDeleteUser = () => {
    // Implement Delete User functionality
    setVisible(false);
  };

  const handleDeleteStorage = () => {
    // Implement Delete Storage functionality
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.avatarButton}
        onPress={() => setVisible(true)}
      >
        <Ionicons name="person-circle-outline" size={24} color="white" />
      </TouchableOpacity>
      <Modal visible={visible} transparent={true} animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.drawer}>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={handleSwitchUser}
            >
              <Text style={styles.drawerItemText}>Switch User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={handleDeleteUser}
            >
              <Text style={styles.drawerItemText}>Delete User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={handleDeleteStorage}
            >
              <Text style={styles.drawerItemText}>Delete Storage</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  avatarButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#00507D",
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  drawerItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  drawerItemText: {
    fontSize: 16,
  },
});

export default AvatarButton;
