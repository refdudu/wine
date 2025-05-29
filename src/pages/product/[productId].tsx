import type { ProductI } from "@/interfaces/ProductI";
import type { ReviewI } from "@/interfaces/ReviewI";
import type { GetServerSideProps } from "next";

export { ProductDetails as default } from "src/components/pages/Product/ProductDetails";
// export { ProductPage as default } from "@/components/pages/Product";

const image =
  "https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_1l_153_1_20200525112308.png";

const mockReviews: ReviewI[] = [
  {
    id: "1",
    productId: "mockProductId",
    userId: "user123",
    userName: "Avaliador Anônimo",
    rating: 5,
    comment: "Excelente vinho, superou minhas expectativas! Recomendo.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    productId: "mockProductId",
    userId: "user456",
    userName: "Maria Silva",
    rating: 4,
    comment: "Muito bom, mas um pouco caro pelo que oferece.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 dias atrás
  },
];

export const getServerSideProps: GetServerSideProps<
  { product: ProductI; reviews: ReviewI[] }, // Adicionar reviews ao tipo de retorno
  { productId: string }
> = async ({ params }) => {
  const productId = params?.productId;

  if (!productId) {
    return { notFound: true };
  }

  // Mock de dados do produto - substitua pela busca real do produto
  const mockProduct: ProductI = {
    id: productId,
    image: image, // Usando a imagem mockada definida no topo do arquivo
    name: `Vinho Exemplo ${productId}`,
    price: Math.random() * 100 + 50, // Preço aleatório
    partnerPrice: Math.random() * 80 + 40,
    percentOff: 10,
  };

  // Aqui você faria a busca real das avaliações para o productId
  // Por enquanto, estamos usando o mockReviews
  const reviews = mockReviews.filter(
    (review) =>
      review.productId === "mockProductId" || review.productId === productId
  ); // Simula busca por productId

  return {
    props: {
      product: mockProduct,
      reviews: reviews,
    },
  };
};
