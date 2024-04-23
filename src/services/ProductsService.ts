import { GetProductsFilter } from "@/api/product/ProductRepository";
import { GetProductsResponse } from "@/api/product/ProductService";
import { api } from "@/utils/api";

export interface ProductServiceI {
	getProducts(props: GetProductsFilter): Promise<GetProductsResponse>;
}
export class ApiProductService implements ProductServiceI {
	public async getProducts(params: GetProductsFilter): Promise<GetProductsResponse> {
		const { data } = await api.get<GetProductsResponse>("products", {
			params
		});
		return data;
	}
}
export class MockProductService implements ProductServiceI {
	public async getProducts(props: GetProductsFilter): Promise<GetProductsResponse> {
		return {
			...props,
			pageIndex: 0,
			pageSize: 0,
			total: 0,
			products: []
		};
	}
}
