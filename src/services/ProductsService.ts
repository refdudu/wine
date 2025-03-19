import type { GetProductsFilter } from "@/api/product/ProductRepository";
import type { GetProductsResponse } from "@/api/product/ProductService";
import type { ProductI } from "@/interfaces/ProductI";
import { api } from "@/utils/api";

export interface ProductServiceI {
  getProducts(props: GetProductsFilter): Promise<GetProductsResponse>;
  searchProducts(ids: string[]): Promise<ProductI[]>;
}
export class ApiProductService implements ProductServiceI {
  public async searchProducts(ids: string[]): Promise<ProductI[]> {
    const { data } = await api.get<ProductI[]>("products/search", {
      params: {
        ids: ids.join(","),
      },
    });
    return data;
  }
  public async getProducts(
    params: GetProductsFilter
  ): Promise<GetProductsResponse> {
    const { data } = await api.get<GetProductsResponse>("products", {
      params,
    });
    return data;
  }
}
export class MockProductService implements ProductServiceI {
  searchProducts(ids: string[]): Promise<ProductI[]> {
    throw new Error("Method not implemented.");
  }
  public async getProducts(
    props: GetProductsFilter
  ): Promise<GetProductsResponse> {
    return {
      ...props,
      pageIndex: 0,
      pageSize: 0,
      total: 0,
      products: [],
    };
  }
}
