import { useProfileStore, useUserStore } from "@/store/UserStore";
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

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const [authenticated, setIsAuthenticated] = useState<boolean>(false);
  const { profiles, loadProfiles, clearCurrentProfile } = useProfileStore();
  const { clearForm } = useUserStore();
  useEffect(() => {
    if (authenticated) {
      clearForm();
      if (navigation.canGoBack()) {
        router.dismissAll();
      }
      router.replace("/");
    } else {
      const initialize = async () => {
        clearCurrentProfile();
        clearForm();
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
