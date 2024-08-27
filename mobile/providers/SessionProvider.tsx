import { useUserStore } from "@/store/UserStore";
import { useProfileStore } from "@/store/ProfileStore";
import { SessionContextType } from "@/types/Session.types";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePasswordStore } from "@/store/PasswordStore";
import { useCurrentStore } from "@/store/CurrentStore";
import { useRefuelFormStore } from "@/store/RefuelStore";
import { useVehicleFormStore } from "@/store/VehicleStore";

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const [authenticated, setIsAuthenticated] = useState<boolean>(false);
  const { profiles, loadProfiles } = useProfileStore();
  const { setCurrentProfile, setCurrentVehicleId } = useCurrentStore();
  const { clearRefuelForm } = useRefuelFormStore();
  const { clearVehicleForm } = useVehicleFormStore();
  const { clearUserForm } = useUserStore();
  const { clearPasswordForm } = usePasswordStore();
  useEffect(() => {
    setCurrentVehicleId(null);
    clearUserForm();
    clearPasswordForm();
    clearRefuelForm();
    if (authenticated) {
      if (navigation.canGoBack()) {
        router.dismissAll();
      }
      router.replace("/");
    } else {
      const initialize = async () => {
        setCurrentProfile(null);

        await loadProfiles();
        const updatedProfiles = useProfileStore.getState().profiles;
        if (updatedProfiles.length === 0) {
          if (navigation.canGoBack()) {
            router.dismissAll();
          }
          router.replace("/signup");
        } else {
          if (navigation.canGoBack()) {
            router.dismissAll();
          }
          router.replace("/login");
        }
      };
      initialize();
    }
  }, [authenticated]);
  const setAuthenticated = (auth) => {
    setIsAuthenticated(auth);
  };
  return (
    <SessionContext.Provider
      value={{
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a <SessionProvider/>");
  }
  return context;
};
