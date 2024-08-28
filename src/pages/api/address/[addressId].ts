import { AddressRepositoryFirebase } from "@/api/address/AddressRepository";
import {
  ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import { ProductRepositoryJson } from "@/api/product/ProductRepository";
import { GetProductsResponse } from "@/api/product/ProductService";
import { ShoppingCartRepositoryJson } from "@/api/shopping-cart/ShoppingCartRepositoryJson";
import { ShoppingCartService } from "@/api/shopping-cart/ShoppingCartService";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<GetProductsResponse>
) {
  return AuthMiddleware(main, req, res);
}
async function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;
  const { addressId } = req.query as { addressId: string };
  const addressRepository = new AddressRepositoryFirebase(userUid);

  if (req.method === "PUT") {
    const address = req.body;
    await addressRepository.update(addressId, address);
    return res.status(200).json({});
  }
  if (req.method === "DELETE") {
    await addressRepository.delete(addressId);
    return res.status(200).json({});
  }
  return res.status(200);
}
