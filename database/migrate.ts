import fs from "node:fs/promises";
import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";

async function migrate() {
  const images = [
    "https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_1l_153_1_20200525112308.png",
    "https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_750ml_47_1_20200525112436.png",
    "https://worldwine.vteximg.com.br/arquivos/ids/159769-1000-1500/Vinho_Tinto_Chateau_Lafite_Rothschild_2006_012704.png?v=637320846781600000",
    "https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_2l_87_1_20200525111101.png",
  ];
  const uids = Array.from({ length: 1000 }, randomUUID);
  const products = uids.map((id) => {
    const price = Math.floor(Math.random() * 600);
    const percentOff = Math.floor(Math.random() * 100);
    const partnerPrice = price - (price * percentOff) / 100;

    return {
      id,
      image: images[Math.floor(Math.random() * images.length)],
      name: faker.commerce.productName(),
      partnerPrice,
      price,
      percentOff,
    };
  });
  try {
    await fs.writeFile(
      "./database/products.json",
      JSON.stringify(products, null, 4)
    );
  } catch {}
}

migrate();
