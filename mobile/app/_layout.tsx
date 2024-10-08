import { SessionProvider } from "@/providers/SessionProvider";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
export default function RootLayout() {
  return (
    <SessionProvider>
      <PaperProvider>
        <Stack>
          <Stack.Screen
            name="confirm-password"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="create-user" options={{ headerShown: false }} />
          <Stack.Screen
            name="create-password"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="add-vehicle" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="success" options={{ headerShown: false }} />
          <Stack.Screen name="fuels/[id]" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </SessionProvider>
  );
}
