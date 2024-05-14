import { ApiRequestAuth } from "@/api/HOC/WithAuth";
import {
  type GetProductsFilter,
  ProductRepositoryJson,
} from "@/api/product/ProductRepository";
import {
  type GetProductsResponse,
  ProductService,
} from "@/api/product/ProductService";
import { ShoppingCartRepositoryJson } from "@/api/shopping-cart/ShoppingCartRepository";
import { ShoppingCartService } from "@/api/shopping-cart/ShoppingCartService";
import { ShoppingCartProductDTO } from "@/interfaces/ProductShoppingCartI";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<GetProductsResponse>
) {
  if (req.method !== "GET") return res.status(401);
  const filter = req.query as unknown as GetProductsFilter;

  const productService = new ProductService(productRepository);
  const response = productService.get(filter);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return res.status(200).json(response);
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
