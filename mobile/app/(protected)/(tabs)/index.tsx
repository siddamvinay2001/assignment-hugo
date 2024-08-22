import { useSession } from "@/providers/SessionProvider";
import { useProfileStore } from "@/store/UserStore";
import { useRootNavigationState, Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  const { authenticated } = useSession();
  const { profiles } = useProfileStore();
  const rootNavigator = useRootNavigationState();

  if (!authenticated) {
    if (profiles.length === 0) {
      return <Redirect href={"/signup"} />;
    } else {
      return <Redirect href={"/signup"} />;
    }
  }
  return (
    <View>
      <Text>...Loading</Text>
    </View>
  );
}
