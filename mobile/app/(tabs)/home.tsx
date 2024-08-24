import { useProfileStore } from "@/store/ProfileStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { currentProfile } = useProfileStore();
  return (
    <SafeAreaView>
      <View>
        <Text>HIHIH</Text>
        <Button
          onPress={async () => {
            try {
              await AsyncStorage.clear();
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Clear Storage
        </Button>
        <Button
          onPress={async () => {
            console.log(currentProfile);
          }}
        >
          Show Current Profile
        </Button>
      </View>
    </SafeAreaView>
  );
}
