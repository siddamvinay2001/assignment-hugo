import { ThemedText } from "@/components/ThemedText";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Singup() {
  return (
    <SafeAreaView style={styles.mainscreen}>
      <View>
        <ThemedText type="defaultSemiBold">Header</ThemedText>
      </View>
      <View>
        <ThemedText style={styles.heroText} type="subtitle">
          Create an account to get started
        </ThemedText>
        <Button title="Sign up" onPress={() => {}} />
      </View>
      <View style={styles.footer}>
        <ThemedText style={styles.footerText} type="subtitle">
          Track your miles towards a prosperous financial journey!
        </ThemedText>
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
    backgroundColor: "#d7f5f0",
    justifyContent: "space-between",
  },
  footer: {
    marginBottom: 40,
  },
  heroText: {
    marginBottom: 30,
  },
  footerText: {
    textAlign: "center",
  },
});
