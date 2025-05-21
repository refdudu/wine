export interface ReviewI {
  id: string;
  productId: string;
  userId: string; // Ou talvez um objeto UserSimpleI { id: string, name: string, avatarUrl?: string }
  userName: string; // Adicionado para simplificar a exibição
  rating: number; // e.g., 1 a 5
  comment: string;
  createdAt: string; // ISO date string
}
