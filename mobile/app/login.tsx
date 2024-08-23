import CustomText from "@/components/CustomText";
import LoginView from "@/components/LoginView";
import { PRIMARY_COLOR } from "@/constants/Style.constants";
import { useSession } from "@/providers/SessionProvider";
import { useProfileStore, useUserStore } from "@/store/UserStore";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { profiles, setCurrentProfile } = useProfileStore();
  const { step } = useUserStore();
  const { setAuthenticated } = useSession();

  const router = useRouter();
  const randomColor = () => {
    const colors = ["red", "yellow", "green", "pink"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ alignItems: "center" }}>
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
      <ScrollView contentContainerStyle={styles.profilesContainer}>
        <CustomText
          type="primary"
          variant="titleLarge"
          content="Who are you?"
          style={styles.title}
        />
        <View style={styles.profilesRow}>
          {profiles.map((profile, index) => (
            <TouchableOpacity
              key={index}
              style={styles.profileItem}
              onPress={() => {
                if (profile.isProtected) {
                  setCurrentProfile(profile);
                  router.push("/confirm-password");
                } else {
                  setCurrentProfile(profile);
                  setAuthenticated(true);
                }
              }}
            >
              <Avatar.Text
                size={60}
                label={profile.name.charAt(0).toUpperCase()}
                style={{ backgroundColor: randomColor() }}
              />
              <CustomText
                type="primary"
                variant="default"
                content={profile.name}
              />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.addProfileButton}
            onPress={() => router.push("/create-user")}
          >
            <Avatar.Icon size={60} icon="plus" color="white" />
            <CustomText type="primary" variant="default" content={"New User"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#F6F6EC",
  },
  heroImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  profilesContainer: {
    maeginTop: 50,
    paddingBottom: 30,
    width: "100%",
    alignItems: "center",
  },
  profilesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  profileItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  addProfileButton: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  title: {
    textAlign: "center",
    marginTop: 60,
  },
});
