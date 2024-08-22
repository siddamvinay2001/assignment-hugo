import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, TextInput, Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/UserStore";
import CustomText from "@/components/CustomText";
import { formSchema } from "@/utils/validationSchema";
import { z } from "zod";

export default function CreateAccount() {
  const router = useRouter();
  const {
    name,
    nickname,
    email,
    isChecked,
    errors,
    setName,
    setNickname,
    setEmail,
    setChecked,
    setErrors,
    clearForm,
  } = useUserStore();

  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

  useEffect(() => {
    const validate = () => {
      try {
        formSchema.parse({
          name,
          nickname,
          email,
          isChecked,
        });
        setErrors({});
        setIsFormValid(true);
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
        setIsFormValid(false);
      }
    };

    validate();
  }, [name, nickname, email, isChecked]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <IconButton
        icon="arrow-left"
        size={30}
        onPress={() => {
          clearForm();
          router.push("/signup");
        }}
      />
      <View style={styles.heroSection}>
        <CustomText
          type="primary"
          variant="displaySmall"
          content="Create Account"
          style={styles.textColor}
        />

        <View style={styles.inputContainer}>
          <CustomText
            type="primary"
            variant="titleLarge"
            content="Name"
            required
            style={styles.inputLabel}
          />
          <TextInput
            mode="outlined"
            outlineColor={errors.name ? "#eb2917" : "white"}
            activeOutlineColor={errors.name ? "#eb2917" : "white"}
            value={name}
            onChangeText={(text) => setName(text)}
            textColor="#193063"
            placeholder="Enter your name"
            style={[styles.textInput, errors.name && styles.errorInput]}
          />
          {errors.name && (
            <CustomText
              type="secondary"
              content={`* ${errors.name}`}
              style={styles.errorText}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <CustomText
            type="primary"
            variant="titleLarge"
            content="Nickname"
            style={styles.inputLabel}
          />
          <TextInput
            mode="outlined"
            outlineColor="white"
            activeOutlineColor="white"
            value={nickname}
            onChangeText={(text) => setNickname(text)}
            textColor="#193063"
            placeholder="Enter your nickname"
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputContainer}>
          <CustomText
            type="primary"
            variant="titleLarge"
            content="Email"
            required
            style={styles.inputLabel}
          />
          <TextInput
            mode="outlined"
            outlineColor={errors.email ? "#eb2917" : "white"}
            activeOutlineColor={errors.email ? "#eb2917" : "white"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            textColor="#193063"
            placeholder="Enter your email"
            style={[styles.textInput, errors.email && styles.errorInput]}
          />
          {errors.email && (
            <CustomText
              type="secondary"
              content={`* ${errors.email}`}
              style={styles.errorText}
            />
          )}
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => setChecked(!isChecked)}
            color={errors.isChecked ? "#eb2917" : undefined}
          />
          <CustomText
            type="primary"
            content="Please accept it if you are above 18"
            style={styles.checkboxText}
          />
        </View>

        <Button
          mode="contained"
          onPress={() => alert("EVENT")}
          style={styles.button}
          disabled={!isFormValid}
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  heroSection: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  textColor: {
    color: "#193063",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "white",
  },
  errorInput: {
    borderColor: "#eb2917",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: "#eb2917",
    marginTop: 5,
    fontSize: 14,
  },
});
