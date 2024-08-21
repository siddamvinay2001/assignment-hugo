import { SessionProvider } from "@/providers/SessionProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot/>
    </SessionProvider>
  );
}
