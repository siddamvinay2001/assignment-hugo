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
import { useUserStore } from "@/store/UserStore";
import EmptySignup from "@/components/EmptySignup";
import UserForm from "@/components/UserForm";
import PasswordForm from "@/components/PasswordForm";
import { IconButton, Button } from "react-native-paper";
import { useSession } from "@/providers/SessionProvider";
import CustomText from "@/components/CustomText";
import { PRIMARY_COLOR } from "@/constants/Style.constants";

export default function CreateAccount() {
  const { step, clearForm, clearPasswordForm, setStep } = useUserStore();
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <View>
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
        <View>
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
  heroImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  heroText: {
    marginBottom: 30,
  },
  footerText: {
    textAlign: "center",
  },
});
