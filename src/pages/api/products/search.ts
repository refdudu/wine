import { ProductRepositoryJson } from "@/api/product/ProductRepository";
import { ProductService } from "@/api/product/ProductService";
import { ProductI } from "@/interfaces/ProductI";
import { NextApiRequest, NextApiResponse } from "next";

interface SearchProductsQuery {
	ids: string;
}

export default function index(req: NextApiRequest, res: NextApiResponse<ProductI[]>) {
	if (req.method !== "GET") return res.status(401);
	const query = req.query as unknown as SearchProductsQuery;
	const productRepository = new ProductRepositoryJson();
	const productService = new ProductService(productRepository);
	const ids = query.ids.split(",");
	const response = productService.search(ids);
	return res.status(200).json(response);
}
