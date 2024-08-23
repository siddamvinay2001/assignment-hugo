import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useUserStore } from "@/store/UserStore";
import { useProfileStore } from "@/store/UserStore";
import CustomInputBox from "@/components/CustomInputBox";
import CustomText from "@/components/CustomText";
import { Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSession } from "@/providers/SessionProvider";

export default function ConfirmPassword() {
  const { confirmPassword, errors, setConfirmPassword, setErrors, clearForm } =
    useUserStore();
  const { profiles, currentProfile, clearCurrentProfile, setCurrentProfile } =
    useProfileStore();
  const { setAuthenticated } = useSession();
  const router = useRouter();

  const [confirmPasswordArray, setConfirmPasswordArray] = useState(
    Array(4).fill("")
  );

  const handleConfirmPasswordChange = (index: number, value: string) => {
    const newConfirmPasswordArray = [...confirmPasswordArray];
    newConfirmPasswordArray[index] = value;
    setConfirmPasswordArray(newConfirmPasswordArray);
    setConfirmPassword(newConfirmPasswordArray.join(""));
  };

  const handleConfirmPassword = () => {
    if (currentProfile?.password === confirmPassword) {
      setCurrentProfile(currentProfile);
      setAuthenticated(true);
    } else {
      setErrors({ confirmPassword: "Passwords do not match" });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => {
            clearForm();
            clearCurrentProfile();
            router.back();
          }}
        />
        <View style={styles.heroSection}>
          <CustomText
            type="primary"
            variant="displaySmall"
            content="Confirm Password"
            style={{ marginBottom: 10 }}
          />
          <CustomText
            content="Enter your 4-digit passcode to continue"
            variant="titleLarge"
            style={styles.title}
          />
          <CustomInputBox
            value={confirmPasswordArray}
            onChange={handleConfirmPasswordChange}
            error={errors.confirmPassword}
            style={styles.inputBox}
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleConfirmPassword}
          >
            Confirm
          </Button>
        </View>
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
  },
  heroSection: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    marginBottom: 20,
  },
  inputBox: {
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
  },
});
