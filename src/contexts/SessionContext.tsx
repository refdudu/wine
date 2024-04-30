import { firebaseAuthClient, firebaseClient } from "@/utils/firebaseClient";
import { createContext, useContext, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

interface SessionContextProps {
  signIn: () => Promise<void>;
}
const SessionContext = createContext({} as SessionContextProps);

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  async function signIn() {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuthClient, provider);
    const userToken = user.getIdToken();
    console.log(userToken);
  }
  useEffect(() => {
    async function getUser() {
      await firebaseAuthClient.authStateReady();
      const { currentUser } = firebaseAuthClient;
      if (!currentUser) return;
      const token = await currentUser.getIdToken();
      console.log(token);
    }
    getUser();
  }, []);
  return (
    <SessionContext.Provider value={{ signIn }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
