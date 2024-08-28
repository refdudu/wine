import { firebaseAuth } from "@/utils/firebaseAdmin";
import { User } from "firebase/auth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { redirect } from "next/dist/server/api-utils";
function _return(props: object, redirect: boolean) {
  if (redirect) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props,
  };
}
export function WithAuth(
  func: (context: GetServerSidePropsContext) => object,
  redirect = false
): GetServerSideProps {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const token = req.cookies.token || ""; // Supondo que o token JWT esteja armazenado em cookies
    console.log("🚀 ~ return ~ token:", token);
    if (!token) return _return({}, redirect);

    try {
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      console.log("🚀 ~ return ~ decodedToken:", decodedToken);
      const user = {
        // email: decodedToken.email || "",
        // name: decodedToken.name,
        // uid: decodedToken.uid,
      };

      const props = func(context);
      return {
        props: { user, ...props }, // Aqui você passa o usuário como props para o componente
      };
    } catch (error) {
      console.log("Erro ao verificar o token", error);
    }
    return _return({}, redirect);
  };
}
