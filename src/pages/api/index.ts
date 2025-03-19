import { type ApiRequestAuth, AuthMiddleware } from "@/api/middlewares/AuthMiddleware";
import { firebaseAuth } from "@/utils/firebaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";

function main(req: ApiRequestAuth, res: NextApiResponse) {
  const uid = req.userUid;
  res.status(200).json({ message: `Hello ${uid}` });
}
export default async function index(req: NextApiRequest, res: NextApiResponse) {
  return AuthMiddleware(main, req, res);
}
