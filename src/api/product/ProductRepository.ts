import { ProductI } from "@/interfaces/ProductI";
import { ProductNotFound } from "./ProductNotFound";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

// export class ProductRepositoryList implements ProductRepositoryI {
//   private products: ProductI[] = [];

//   constructor() {
//     const images = [
//       "https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_1l_153_1_20200525112308.png",
//       "https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_750ml_47_1_20200525112436.png",
//       "https://worldwine.vteximg.com.br/arquivos/ids/159769-1000-1500/Vinho_Tinto_Chateau_Lafite_Rothschild_2006_012704.png?v=637320846781600000",
//       "https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_2l_87_1_20200525111101.png",
//     ];
//     const uids = Array.from({ length: 100 }, randomUUID);
//     this.products = uids.map((id) => {
//       const price = Math.floor(Math.random() * 1000);
//       const percentOff = Math.floor(Math.random() * 100);
//       const partnerPrice = price - (price * percentOff) / 100;

//       return {
//         id,
//         image: images[Math.floor(Math.random() * images.length)],
//         name: faker.commerce.productName(),
//         partnerPrice,
//         price,
//         percentOff,
//       };
//     });
//   }

//   public find(id: string): ProductI {
//     const product = this.products.find((x) => x.id === id);
//     if (!product) throw new ProductNotFound();
//     return product;
//   }

//   public get(): ProductI[] {
//     return this.products;
//   }
// }
export interface ProductRepositoryI {
  getTotal: () => number;
  get: (filter: GetProductsFilter) => ProductI[];
  find: (id: string) => ProductI;
}
export class ProductRepositoryJson implements ProductRepositoryI {
  private products: ProductI[] = [];
  constructor() {
    this.products = require("../../../database/products.json");
  }
  public getTotal(): number {
    return this.products.length;
  }

  public find(id: string): ProductI {
    const product = this.products.find((x) => x.id === id);
    if (!product) throw new ProductNotFound();
    return product;
  }

  public get({
    pageIndex = 0,
    pageSize = 15,
    betweenPrices = "",
  }: GetProductsFilter): ProductI[] {
    const start = pageIndex * pageSize;
    const end = start + Number(pageSize);
    const products = this.products.slice(start, end);
    if (betweenPrices) {
      const [min, max] = betweenPrices.split("-");
      return products.filter(
        (x) => x.price >= Number(min) && x.price <= Number(max)
      );
    }
    return products;
  }
}
export interface GetProductsFilter {
  pageSize: number;
  pageIndex: number;
  betweenPrices: string;
}
