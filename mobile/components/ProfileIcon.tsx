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

const ProfileIcon = ({
  onSwitchUser,
  onDeleteAccount,
  onDeleteAllAccounts,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => setVisible(true)}
      >
        <Ionicons name="person-circle-outline" size={30} color="white" />
      </TouchableOpacity>
      <Modal visible={visible} transparent={true} animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.drawer}>
            <TouchableOpacity style={styles.drawerItem} onPress={onSwitchUser}>
              <Text style={styles.drawerItemText}>Switch User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={onDeleteAccount}
            >
              <Text style={styles.drawerItemText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={onDeleteAllAccounts}
            >
              <Text style={styles.drawerItemText}>Delete All Accounts</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  profileButton: {
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

export default ProfileIcon;
