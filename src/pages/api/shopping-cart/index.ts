import { ApiRequestAuth, WithAuth } from "@/api/HOC/WithAuth";
import { ProductRepositoryJson } from "@/api/product/ProductRepository";
import { ShoppingCartRepositoryJson } from "@/api/shopping-cart/ShoppingCartRepository";
import { ShoppingCartService } from "@/api/shopping-cart/ShoppingCartService";
import { ShoppingCartProductDTO } from "@/interfaces/ProductShoppingCartI";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function index(req: NextApiRequest, res: NextApiResponse) {
  return WithAuth(main, req, res);
}

function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;
  const productRepository = new ProductRepositoryJson();
  const shoppingCartRepository = new ShoppingCartRepositoryJson(userUid);
  const shoppingCartService = new ShoppingCartService(
    shoppingCartRepository,
    productRepository
  );
  if (req.method === "GET") return getProducts(shoppingCartService, res);
  if (req.method === "POST") {
    const shoppingCartProduct = req.body as ShoppingCartProductDTO;
    return addProduct(shoppingCartService, shoppingCartProduct, res);
  }
}
function getProducts(
  shoppingCartService: ShoppingCartService,
  res: NextApiResponse
) {
  const response = shoppingCartService.getProducts();
  return res.status(200).json(response);
}
function addProduct(
  shoppingCartService: ShoppingCartService,
  shoppingCartProduct: ShoppingCartProductDTO,
  res: NextApiResponse
) {
  shoppingCartService.addProduct(shoppingCartProduct);
  return res.status(200);
}
