import { ButtonCounter, Counter } from "@/components/Counter";
import { Layout } from "@/components/Layout";
import type { ProductI } from "@/interfaces/ProductI";
import { ApiProductService } from "@/services/ProductsService";
import { api } from "@/utils/api";
import { CaretLeft, CaretRight, Images, Star } from "@phosphor-icons/react";
import type { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductDetailsProps {
  product: ProductI;
}
const image =
  "https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_1l_153_1_20200525112308.png";
export function ProductDetails({ product }: ProductDetailsProps) {
  console.log({ product });

  return (
    <Layout>
      <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
        <div className="max-w-[1120px] mx-auto">
          <Header />
          <main className="flex">
            <div className="flex flex-1 justify-center">
              <img className="w-64" alt="" src={image} />
            </div>
            <Details />
          </main>
          <div className="border-t border-custom-gray-light mt-8 pt-8">
            <span>Avaliações dos clientes</span>
            <div className="">
              <ClientRating />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ClientRating() {
  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full bg-black" />
        <span>Nome do cliente</span>
      </div>
      <div>
        <RatingStars total={5} />
        <span className="font-bold">Muito show esse vinho</span>
      </div>
      <span>Data da avaliação</span>
    </div>
  );
}
interface RatingStarsProps {
  total: number;
}
function RatingStars({ total }: RatingStarsProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
        <Star
          key={i}
          size={16}
          weight={total >= i ? "fill" : "regular"}
          color="#FBBF24"
        />
      ))}
    </div>
  );
}
function Details() {
  return (
    <div className="flex-1">
      <header className="flex gap-2 items-center mb-4 text-custom-violet">
        <span>Vinhos</span>
        <CaretRight width={16} className="text-custom-gray-light" />
        <span>Estados Unidos</span>
      </header>
      <h1 className="text-3xl font-bold">Nome do Produto</h1>

      <div className="my-8 flex flex-col gap-1">
        <span className="text-custom-violet font-bold text-2xl">
          R$ <span className="text-4xl">20</span>,20
        </span>
        <span className="text-custom-gray-light md:text-2xs font-bold text-xs uppercase">
          não sócio wine R$ 20,20
        </span>
      </div>
      <div className="flex flex-col gap-2 mb-8">
        <span className="font-bold text-lg">Descrição do produto</span>
        <span className="text-custom-gray-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          ante eu lacus vulputate hendrerit. Integer eget lectus eget mauris
          tincidunt dictum. Praesent vulputate justo quis tincidunt fringilla.
          Aliquam erat volutpat. Sed efficitur ipsum eget justo semper, id
          pulvinar libero tincidunt. Curabitur hendrerit dolor eu justo laoreet,
          sed finibus quam vehicula. Nullam eget tincidunt nunc. Sed auctor,
          urna eu tristique tincidunt, nunc nisl semper dolor, eu ultrices nisl
          nunc eu nunc. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </span>
      </div>
      <ButtonCounter
        handleAdd={() => console.log}
        handleRemove={() => console.log}
        total={0}
      />
    </div>
  );
}
function Header() {
  return (
    <header className="mb-4">
      <Link className="flex items-center gap-2" href="/">
        <CaretLeft width={16} />
        <span>Voltar</span>
      </Link>
    </header>
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
