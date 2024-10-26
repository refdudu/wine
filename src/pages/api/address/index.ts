import { AddressRepositoryFirebase } from "@/api/address/AddressRepository";
import {
  ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import { addressValidationSchema } from "@/validation/address";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function index(req: NextApiRequest, res: NextApiResponse) {
  return AuthMiddleware(main, req, res);
}

async function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;

  const addressRepository = new AddressRepositoryFirebase(userUid);
  if (req.method === "POST") {
    const address = req.body;
    console.log("🚀 ~ main ~ address:", address)
    await addressValidationSchema.validate(address, { abortEarly: false });
    await addressRepository.add(address);
    const addresses = await addressRepository.get();

    return res.status(200).json({ addresses });
  }

  if (req.method === "GET") {
    const addresses = await addressRepository.get();
    return res.status(200).json({ addresses });
  }
  return res.status(405);
}
