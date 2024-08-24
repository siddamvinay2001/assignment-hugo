import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { IconButton, Button } from "react-native-paper";
import CustomText from "@/components/CustomText";
import { PRIMARY_COLOR } from "@/constants/Style.constants";

export default function CreateAccount() {
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <Image
            style={styles.heroImage}
            source={require("@/assets/images/react-logo.png")}
          />
          <CustomText
            content="Mileage Tracker"
            variant="titleLarge"
            type="secondary"
          />
        </View>
        <View style={styles.content}>
          <CustomText
            variant="bodyLarge"
            style={styles.heroText}
            content="Create an account to get started"
          />
          <Button
            mode="contained"
            buttonColor={PRIMARY_COLOR}
            textColor="white"
            onPress={() => router.push("/create-user")}
          >
            Sign up
          </Button>
        </View>
        <CustomText
          variant="bodyLarge"
          style={styles.footerText}
          content="Track your miles towards a prosperous financial journey!"
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#F6F6EC",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  heroImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  heroText: {
    marginBottom: 30,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  footerText: {
    textAlign: "center",
    width: "100%",
  },
});
