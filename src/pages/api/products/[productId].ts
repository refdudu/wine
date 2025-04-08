import {
  type GetProductsFilter,
  ProductRepositoryJson,
} from "@/api/product/ProductRepository";
import {
  type GetProductResponse,
  ProductService,
} from "@/api/product/ProductService";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<GetProductResponse>
) {
  const { productId } = req.query as unknown as { productId: string };
  if (req.method !== "GET") {
    res.status(401).end();
    return;
  }
  const productRepository = new ProductRepositoryJson();
  const productService = new ProductService(productRepository);
  const product = productService.find(productId);
  console.log("🚀 ~ product:", product);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return res.status(200).json({ product });
}
