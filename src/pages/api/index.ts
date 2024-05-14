import { ApiRequestAuth, WithAuth } from "@/api/HOC/WithAuth";
import { firebaseAuth } from "@/utils/firebaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";

function main(req: ApiRequestAuth, res: NextApiResponse) {
  const uid = req.userUid;
  res.status(200).json({ message: `Hello ${uid}` });
}
export default async function index(req: NextApiRequest, res: NextApiResponse) {
  return WithAuth(main, req, res);
}
