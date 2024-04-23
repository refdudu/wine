import type { ProductI } from "@/interfaces/ProductI";
import type { GetProductsFilter, ProductRepositoryI } from "./ProductRepository";
export interface GetProductsResponse {
	total: number;
	products: ProductI[];
	pageIndex: number;
	pageSize: number;
}
export class ProductService {
	constructor(private productRepository: ProductRepositoryI) {}
	public get(filter: GetProductsFilter): GetProductsResponse {
		const products = this.productRepository.get(filter);
		const total = this.productRepository.getTotal(filter);
		return {
			...filter,
			pageIndex: filter.pageIndex ? Number(filter.pageIndex) : 0,
			pageSize: filter.pageSize ? Number(filter.pageSize) : 0,
			total,
			products
		};
	}
	public search(ids: string[]) {
		const products = this.productRepository.search(ids);
		return products;
	}
}
