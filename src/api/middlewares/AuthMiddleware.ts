import { firebaseAuth } from "@/utils/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";

export interface ApiRequestAuth extends NextApiRequest {
  userUid: string;
}

//TODO isso aqui é um middleware
// Deve ser criado um WithAuth para buscar o usuário ssr
export const AuthMiddleware = async (
  main: (req: ApiRequestAuth, res: NextApiResponse) => void,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: "Unauthorized" });
  const userToken = authorization.replace("Bearer ", "");
  try {
    const user = await firebaseAuth.verifyIdToken(userToken);
    const reqAuth = {
      ...req,
      userUid: user.uid,
    } as ApiRequestAuth;

    return main(reqAuth, res);
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const { inner } = err as Yup.ValidationError;
      const errors: Record<string, string> = {};
      for (const { path, message } of inner) {
        if (path) errors[path] = message;
      }
      return res.status(404).json({ errors });
    }
    return res.status(404).json({ message: err });
  }
};
