import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useUserStore } from "@/store/UserStore";
import { useProfileStore } from "@/store/UserStore";
import { passwordSchema } from "@/utils/validationSchema";
import CustomInputBox from "@/components/CustomInputBox";
import CustomText from "@/components/CustomText";
import { Button, IconButton } from "react-native-paper";
import { z } from "zod";
import { useRouter } from "expo-router";
import { useSession } from "@/providers/SessionProvider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreatePassword() {
  const {
    password,
    confirmPassword,
    errors,
    setPassword,
    setConfirmPassword,
    setErrors,
    setStep,
    clearPasswordForm,
    name,
    email,
    nickname,
    setProtected,
  } = useUserStore();
  const { setAuthenticated } = useSession();
  const { addProfile, setCurrentProfile } = useProfileStore();
  const router = useRouter();
  const { authenticated } = useSession();
  if (authenticated) {
    router.replace("/");
  }
  const [passwordArray, setPasswordArray] = useState(Array(4).fill(""));
  const [confirmPasswordArray, setConfirmPasswordArray] = useState(
    Array(4).fill("")
  );

  const handlePasswordChange = (index: number, value: string) => {
    const newPasswordArray = [...passwordArray];
    newPasswordArray[index] = value;
    setPasswordArray(newPasswordArray);
    setPassword(newPasswordArray.join(""));
  };

  const handleConfirmPasswordChange = (index: number, value: string) => {
    const newConfirmPasswordArray = [...confirmPasswordArray];
    newConfirmPasswordArray[index] = value;
    setConfirmPasswordArray(newConfirmPasswordArray);
    setConfirmPassword(newConfirmPasswordArray.join(""));
  };

  const validatePassword = () => {
    try {
      passwordSchema.parse({ password, confirmPassword });
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
  };

  const handleFinish = (secure) => {
    if (secure) {
      validatePassword();
      setProtected(true);
    } else {
      setProtected(false);
    }
    const profile = {
      name: name,
      nickname: nickname,
      email: email,
      password: secure ? password : "",
      isProtected: secure,
    };
    console.log("Clicked");
    addProfile(profile);
    setCurrentProfile(profile);
    setAuthenticated(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => {
            clearPasswordForm();
            router.back();
          }}
        />
        <View style={styles.heroSection}>
          <CustomText
            type="primary"
            variant="displaySmall"
            content="Set a Password"
            style={{ marginBottom: 10 }}
          />
          <CustomText
            content="Set a password to protect your account or skip to continue without protection"
            variant="default"
            style={styles.noteText}
          />
          <CustomText
            content="Enter a 4-digit passcode"
            variant="titleLarge"
            style={styles.title}
          />
          <CustomInputBox
            value={passwordArray}
            onChange={handlePasswordChange}
            error={errors.password}
            style={styles.inputBox}
          />
          <CustomText
            content="Confirm passcode"
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
            onPress={() => handleFinish(true)}
          >
            Confirm
          </Button>
          <Button
            mode="outlined"
            style={styles.skipButton}
            onPress={() => handleFinish(false)}
          >
            Skip
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
  noteText: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  skipButton: {
    marginTop: 10,
  },
});
