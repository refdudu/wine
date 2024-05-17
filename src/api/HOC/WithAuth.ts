import { firebaseAuth } from "@/utils/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

export interface ApiRequestAuth extends NextApiRequest {
  userUid: string;
}

//TODO isso aqui é um middleware
// Deve ser criado um WithAuth para buscar o usuário ssr
export const WithAuth = async (
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
    return res.status(404).json({ message: err });
  }
};
