import {
  ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import { ProductRepositoryJson } from "@/api/product/ProductRepository";
import { ShoppingCartRepositoryJson } from "@/api/shopping-cart/ShoppingCartRepository";
import { ShoppingCartService } from "@/api/shopping-cart/ShoppingCartService";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function index(req: NextApiRequest, res: NextApiResponse) {
  return AuthMiddleware(main, req, res);
}
function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;
  const productRepository = new ProductRepositoryJson();
  const shoppingCartRepository = new ShoppingCartRepositoryJson(userUid);
  const shoppingCartService = new ShoppingCartService(
    shoppingCartRepository,
    productRepository
  );
  if (req.method !== "DELETE") return res.status(405);
  const { productId } = req.query as { productId: string };
  shoppingCartService.removeProduct(productId);
  return res.status(200);
}
