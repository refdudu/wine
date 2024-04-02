import { ProductI } from "@/interfaces/ProductI";
import { ProductNotFound } from "./ProductNotFound";
export interface ProductRepositoryI {
  getTotal: (filter: GetProductsFilter) => number;
  get: (filter: GetProductsFilter) => ProductI[];
  find: (id: string) => ProductI;
}
export class ProductRepositoryJson implements ProductRepositoryI {
  private products: ProductI[] = [];
  constructor() {
    this.products = require("../../../database/products.json");
  }
  private filterProduct(product: ProductI, min: string, max: string) {
    if (max === "*") return product.price >= Number(min);
    return product.price >= Number(min) && product.price <= Number(max);
  }
  public getTotal({ betweenPrices = "" }: GetProductsFilter): number {
    if (betweenPrices) {
      const [min, max] = betweenPrices.split("-");
      return this.products.filter((product) =>
        this.filterProduct(product, min, max)
      ).length;
    }
    return this.products.length;
  }
  private getFilteredProducts({
    betweenPrices = "",
    searchText = "",
  }: GetProductsFilter) {
    if (betweenPrices) {
      const [min, max] = betweenPrices.split("-");
      this.products = this.products.filter((product) =>
        this.filterProduct(product, min, max)
      );
    }
    if (searchText) {
      const normalize = (text: string) =>
        text.normalize("NFD").toLocaleLowerCase();
      searchText = normalize(searchText);
      this.products = this.products.filter((x) =>
        normalize(x.name).includes(searchText)
      );
    }
    return this.products;
  }
  public find(id: string): ProductI {
    const product = this.products.find((x) => x.id === id);
    if (!product) throw new ProductNotFound();
    return product;
  }
  public get(filter: GetProductsFilter): ProductI[] {
    this.products = this.getFilteredProducts(filter);
    const { pageIndex, pageSize } = filter;
    const start = pageIndex * pageSize;
    const end = start + Number(pageSize);
    const products = this.products.slice(start, end);
    return products;
  }
}
export interface GetProductsFilter {
  pageSize: number;
  pageIndex: number;
  betweenPrices: string;
  searchText: string;
}
