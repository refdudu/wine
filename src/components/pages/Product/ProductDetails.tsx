import { Counter } from "@/components/Counter";
import { Layout } from "@/components/Layout";
import type { ProductI } from "@/interfaces/ProductI";
import { ApiProductService } from "@/services/ProductsService";
import { api } from "@/utils/api";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductDetailsProps {
  product: ProductI;
}
export function ProductDetails({ product }: ProductDetailsProps) {
  console.log({ product });

  return (
    <Layout>
      <div className="w-full max-w-[1120px] py-10 mx-auto px-3 overflow-auto h-full">
        <header className="mb-4">
          <Link className="flex items-center gap-2" href="/">
            <CaretLeft width={16} />
            <span>Voltar</span>
          </Link>
        </header>
        <main className="flex">
          <div className="flex-1">
            <div className="h-64 w-full bg-gray-200" />
            {/* <Image alt="Produlct Image" src={"https://example.com/image.jpg"} /> */}
          </div>
          <div className="flex-1">
            <header className="flex gap-2 items-center mb-4 text-custom-violet">
              <span>Vinhos</span>
              <CaretRight width={16} className="text-custom-gray-light" />
              <span>Estados Unidos</span>
            </header>
            <h1 className="text-3xl font-bold mb-8">Nome do Produto</h1>

            <div className="mb-1 flex gap-2 items-end">
              <span className="text-custom-gray-dark md:text-2xs text-xs uppercase">
                Sócio wine
              </span>
              <span className="text-custom-violet md:text-2xs text-xs">
                R${" "}
                <span className="md:text-xl text-lg">
                  {/* {partnerPriceFormatted.integer} */}
                </span>
                {/* ,{partnerPriceFormatted.decimal} */}
              </span>
            </div>
            <span className="md:text-2xs text-xs text-custom-gray uppercase">
              {/* Não sócio {priceFormatted} */}
            </span>
            <div>
              <span>Descrição do produto</span>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod ante eu lacus vulputate hendrerit. Integer eget lectus
                eget mauris tincidunt dictum. Praesent vulputate justo quis
                tincidunt fringilla. Aliquam erat volutpat. Sed efficitur ipsum
                eget justo semper, id pulvinar libero tincidunt. Curabitur
                hendrerit dolor eu justo laoreet, sed finibus quam vehicula.
                Nullam eget tincidunt nunc. Sed auctor, urna eu tristique
                tincidunt, nunc nisl semper dolor, eu ultrices nisl nunc eu
                nunc. Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </span>
            </div>
            <Counter
              handleAdd={() => console.log}
              handleRemove={() => console.log}
              total={0}
            />
          </div>
        </main>
      </div>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps<
  { product?: ProductI },
  { productId: string }
> = async ({ params }) => {
  console.log(params);
  return {
    props: {
      product: {
        id: "",
        image: "",
        name: "Renan",
        percentOff: 0,
        price: 0,
        partnerPrice: 0,
      }, // Mock data for product
    },
  };
//   if (!params) {
//     return { props: { product: undefined }, redirect: { destination: "/" } };
//   }
  //   const productService = new ApiProductService();
  //   const productId = params.productId; // Use the productId from params
  //   const product = await productService.getProduct(productId);
  //   if (!product) {
  //     return { props: { product: undefined }, redirect: { destination: "/" } };
  //   }
  //   return {
  //     revalidate: 1,
  //     props: { product },
  //   };
};
// export const getStaticPaths = async () => {
//   const productService = new ApiProductService();
//   const products = await productService.getProducts({
//     pageIndex: 0,
//     pageSize: 10,
//     betweenPrices: "",
//     searchText: "",
//   });
//   console.log(products, "products");

//   return {
//     paths: [""],
//     fallback: true, // Ou 'blocking'
//   };
// };
