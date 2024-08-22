import { BACKGROUND_COLOR, PRIMARY_COLOR } from "@/constants/Style.constants";
import { View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CustomText from "@/components/CustomText";

export default function Singup() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.mainscreen}>
      <View style={styles.heroSection}>
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
      <View style={styles.mainContent}>
        <CustomText
          variant="bodyLarge"
          style={styles.heroText}
          content="Create an account to get started"
        />
        <Button
          mode="contained"
          buttonColor={PRIMARY_COLOR}
          textColor="white"
          onPress={() => router.push("/create-account")}
        >
          Sign up
        </Button>
      </View>
      <View style={styles.footer}>
        <CustomText
          variant="bodyLarge"
          style={styles.footerText}
          content="Track your miles towards a prosperous financial journey!"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainscreen: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 40,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: "space-between",
  },
  heroSection: {
    alignItems: "center",
  },
  heroImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  mainContent: {
    alignItems: "center", // Center content horizontally
  },
  heroText: {
    marginBottom: 30,
  },
  footer: {
    marginBottom: 40,
  },
  footerText: {
    textAlign: "center",
  },
});
