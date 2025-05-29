import { ButtonCounter, Counter } from "@/components/Counter";
import { Layout } from "@/components/Layout";
import type { ProductI } from "@/interfaces/ProductI";
import type { ReviewI } from "@/interfaces/ReviewI"; // Importar a nova interface
import { ApiProductService } from "@/services/ProductsService";
import { api } from "@/utils/api";
import { CaretLeft, CaretRight, Images, Star } from "@phosphor-icons/react";
import type { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductDetailsProps {
  product: ProductI;
  reviews: ReviewI[]; // Adicionar prop para avaliações
}
const image =
  "https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_1l_153_1_20200525112308.png";
export function ProductDetails({ product, reviews }: ProductDetailsProps) {
  // Adicionar reviews às props desestruturadas
  console.log({ product });

  return (
    <Layout>
      <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
        <div className="max-w-[1120px] mx-auto">
          <Header />
          <main className="flex flex-col md:flex-row">
            <div className="flex flex-1 justify-center mb-6 md:mb-0">
              <img
                className="w-64"
                alt={product.name}
                src={product.image || image}
              />
            </div>
            <Details product={product} />
          </main>
          <div className="border-t border-custom-gray-light mt-8 pt-8">
            <h2 className="text-xl font-semibold mb-4">
              Avaliações dos clientes ({reviews.length})
            </h2>
            <div className="space-y-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <ClientRating key={review.id} review={review} />
                ))
              ) : (
                <p>Este produto ainda não possui avaliações.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface ClientRatingProps {
  review: ReviewI; // Prop para receber um objeto de avaliação
}

function ClientRating({ review }: ClientRatingProps) {
  return (
    <div className="border-b border-custom-gray-light pb-4">
      <div className="flex gap-2 items-center mb-2">
        {/* Idealmente, aqui você teria um avatar do usuário */}
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
          {review.userName.charAt(0).toUpperCase()}
        </div>
        <span className="font-semibold">{review.userName}</span>
      </div>
      <div className="mb-1">
        <RatingStars total={review.rating} />
      </div>
      <p className="font-bold mb-1">{review.comment}</p>
      <span className="text-sm text-custom-gray-light">
        {new Date(review.createdAt).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
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

interface DetailsProps {
  product: ProductI;
}

function Details({ product }: DetailsProps) {
  return (
    <div className="flex-1">
      <header className="flex gap-2 items-center mb-4 text-custom-violet">
        <span>Vinhos</span>
        <CaretRight width={16} className="text-custom-gray-light" />
        {/* Idealmente, mostrar a categoria/país do produto real */}
        <span>{"País do Vinho"}</span>
      </header>
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <div className="my-8 flex flex-col gap-1">
        <span className="text-custom-violet font-bold text-2xl">
          R${" "}
          <span className="text-4xl">
            {product.price.toFixed(2).replace(".", ",")}
          </span>
        </span>
        <span className="text-custom-gray-light md:text-2xs font-bold text-xs uppercase">
          NÃO SÓCIO WINE R$ {product.partnerPrice.toFixed(2).replace(".", ",")}
        </span>
      </div>
      <div className="flex flex-col gap-2 mb-8">
        <span className="font-bold text-lg">Descrição do produto</span>
        <span className="text-custom-gray-light">
          {"Descrição detalhada do produto não disponível."}
        </span>
      </div>
      <ButtonCounter
        handleAdd={() => console.log("Adicionar ao carrinho")}
        handleRemove={() => console.log("Remover do carrinho")}
        total={0} // Idealmente, isso viria do estado do carrinho
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

// Mock data for reviews - substitua isso pela busca real de dados
