import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="refuel" options={{ headerShown: false }} />
      <Tabs.Screen name="performance" options={{ headerShown: false }} />
      <Tabs.Screen name="vehicles" options={{ headerShown: false }} />
    </Tabs>
  );
}
