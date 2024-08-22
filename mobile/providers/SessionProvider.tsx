import { useProfileStore } from "@/store/UserStore";
import { SessionContextType } from "@/types/Session.types";
import { useRouter } from "expo-router";
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
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const { profiles } = useProfileStore();
  const login = () => setSessionActive(true);
  const logout = () => setSessionActive(false);
  useEffect(() => {
    if (!sessionActive) {
      if (profiles.length === 0) {
        router.push("/signup");
      } else {
        router.push("/login");
      }
    }
  }, []);
  return (
    <SessionContext.Provider
      value={{
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be wrapped in a <SessionProvider/>");
  }
  return context;
};
