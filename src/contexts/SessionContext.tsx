import { firebaseAuthClient, firebaseClient } from "@/utils/firebaseClient";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import { api } from "@/utils/api";

interface SessionContextProps {
  signIn: () => Promise<void>;
  user: User;
}
const SessionContext = createContext({} as SessionContextProps);

interface SessionProviderProps {
  children: React.ReactNode;
}
// interface Credential{
//     user:User;
//     token:string;
// }

export function SessionProvider({ children }: SessionProviderProps) {
  // const [credential, setCredential] = useState({})
  const [user, setUser] = useState({} as User);

  async function signIn() {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(firebaseAuthClient, provider);
      const userToken = await user.getIdToken();
      setUser(user);
      setApiAuthorization(userToken);
      api.get("").then(console.log);
    } catch {
      console.log("erro");
    }
  }
  function setApiAuthorization(userToken: string) {
    api.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  }
  useEffect(() => {
    async function getUser() {
      await firebaseAuthClient.authStateReady();
      const { currentUser } = firebaseAuthClient;
      if (!currentUser) return;
      const userToken = await currentUser.getIdToken();
      setUser(currentUser);
      setApiAuthorization(userToken);
      api.get("").then(console.log);
    }
    getUser();
  }, []);
  return (
    <SessionContext.Provider value={{ signIn, user }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
