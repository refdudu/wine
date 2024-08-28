import { AddressRepositoryFirebase } from "@/api/address/AddressRepository";
import {
  ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import { ShoppingCartService } from "@/api/shopping-cart/ShoppingCartService";
import { ShoppingCartProductDTO } from "@/interfaces/ProductShoppingCartI";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function index(req: NextApiRequest, res: NextApiResponse) {
  return AuthMiddleware(main, req, res);
}

async function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;

  const addressRepository = new AddressRepositoryFirebase(userUid);
  if (req.method === "POST") {
    const address = req.body;
    const addressId = await addressRepository.add(address);
    return res.status(200).json({ id: addressId });
  }

  if (req.method === "GET") {
    const addresses = await addressRepository.get();
    return res.status(200).json({ addresses });
  }
  return res.status(405);
}
