export interface OrderReviewI {
  id: string; // ID da avaliação
  orderId: string;
  userId: string;
  rating: number; // e.g., 1 a 5 estrelas para o pedido geral
  comment?: string; // Comentário opcional sobre o pedido
  createdAt: string; // ISO date string
  // Poderia incluir avaliações por item no futuro
}
