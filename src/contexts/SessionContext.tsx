import { firebaseAuthClient } from "@/utils/firebaseClient";
import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  type User,
  signInWithRedirect,
} from "firebase/auth";
import { api } from "@/utils/api";
import { useCookies } from "react-cookie";
import { useLayout } from "@/components/Layout";

interface SessionContextProps {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
  isAuthorized: boolean;
  isLoadingAuthorization: boolean;
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
  const { isMobile } = useLayout();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [cookies, setCookies, deleteCookies] = useCookies(["token"]);
  const [isLoadingAuthorization, setIsLoadingAuthorization] = useState(true);
  const [user, _setUser] = useState<User | null>(null);

  async function signIn() {
    if (user) return alert("Você já está conectado");
    const provider = new GoogleAuthProvider();
    try {
      //   if (isMobile) {
      //     const { user } = await signInWithRedirect(firebaseAuthClient, provider);
      //     console.log("🚀 ~ signIn ~ user:", user);
      //     alert(user);
      //     setUser(user);
      //   } else {

      //   }
      const { user } = await signInWithPopup(firebaseAuthClient, provider);
      setUser(user);
    } catch (e) {
      console.error(e);
    }
  }
  async function signOut() {
    try {
      await firebaseAuthClient.signOut();
      setUser(null);
      deleteCookies("token");
    } catch {
      alert("Erro ao desconectar usuário");
    }
  }
  useEffect(() => {
    async function getUser() {
      await firebaseAuthClient.authStateReady();
      const { currentUser } = firebaseAuthClient;
      if (!currentUser) {
        setIsLoadingAuthorization(false);
        return;
      }
      await setUser(currentUser);
    }
    getUser();
  }, []);

  async function setUser(user: User | null) {
    if (user) {
      try {
        setIsLoadingAuthorization(true);
        const token = await user.getIdToken();
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // setCookies("token", token, { path: "/" });
        setIsAuthorized(true);
      } catch {}
      setIsLoadingAuthorization(false);
    } else {
      api.defaults.headers.common["Authorization"] = ``;
      setIsAuthorized(false);
    }
    _setUser(user);
  }
  //   useEffect(() => {

  //     setUserToken();
  //   }, [user]);

  return (
    <SessionContext.Provider
      value={{ signIn, signOut, user, isAuthorized, isLoadingAuthorization }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
