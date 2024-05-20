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
  signOut: () => Promise<void>;
  user: User | null;
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
  //   function setApiAuthorization(userToken: string) {
  //     api.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  //   }
  const [user, setUser] = useState<User | null>(null);

  async function signIn() {
    if (user) return alert("Você já está conectado");
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(firebaseAuthClient, provider);
      console.log("🚀 ~ signIn ~ user:", user);

      setUser(user);
    } catch {
      alert("Erro ao conectar usuário");
    }
  }
  async function signOut() {
    try {
      await firebaseAuthClient.signOut();
      setUser(null);
    } catch {
      alert("Erro ao desconectar usuário");
    }
  }
  useEffect(() => {
    async function getUser() {
      await firebaseAuthClient.authStateReady();
      const { currentUser } = firebaseAuthClient;
      if (!currentUser) return;
      setUser(currentUser);
    }
    getUser();
  }, []);
  return (
    <SessionContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
