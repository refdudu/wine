import { Layout } from '@/components/Layout';
import { OrderI, OrderItemI } from '@/interfaces/OrderI';
import { UserProfileI } from '@/interfaces/UserProfileI';
import { OrderReviewI } from '@/interfaces/OrderReviewI'; // Importar OrderReviewI
import { RatingStars } from '@/components/RatingStars'; // Importar RatingStars
import { Button } from '@/components/Button';
import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from '@/contexts/SessionContext';
// SIMULAÇÃO: Em um app real, você teria um serviço para avaliações de pedidos
// import { orderReviewService } from '@/services/OrderReviewService';

interface ProfileSettingsPageProps {
  userProfile: UserProfileI | null;
  orders: OrderI[];
  // SIMULAÇÃO: Em um app real, você buscaria as avaliações existentes junto com os pedidos
  existingReviews: OrderReviewI[]; 
}

// Mock para simular um serviço de avaliação de pedidos
const mockOrderReviewService = {
  createReview: async (reviewData: Omit<OrderReviewI, 'id' | 'createdAt'>): Promise<OrderReviewI> => {
    console.log("Simulando criação de avaliação:", reviewData);
    return new Promise(resolve => setTimeout(() => {
      const newReview: OrderReviewI = {
        ...reviewData,
        id: `review-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      resolve(newReview);
    }, 500));
  },
  getReviewsByOrderIds: async (orderIds: string[]): Promise<OrderReviewI[]> => {
    // Retorna vazio por enquanto, para simular que não há reviews pré-existentes no mock inicial de getServerSideProps
    return []; 
  }
};

export default function ProfileSettingsPage({ userProfile, orders: initialOrders, existingReviews: initialExistingReviews }: ProfileSettingsPageProps) {
  const { user } = useSession(); // Para obter o userId real se necessário para submit
  const [orders, setOrders] = useState<OrderI[]>(initialOrders);
  const [existingReviews, setExistingReviews] = useState<OrderReviewI[]>(initialExistingReviews);
  const [reviewingOrderId, setReviewingOrderId] = useState<string | null>(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    setOrders(initialOrders);
    setExistingReviews(initialExistingReviews);
  }, [initialOrders, initialExistingReviews]);

  const handleOpenReviewForm = (orderId: string) => {
    setReviewingOrderId(orderId);
    setCurrentRating(0); // Resetar estado do formulário
    setComment('');
  };

  const handleCloseReviewForm = () => {
    setReviewingOrderId(null);
    setCurrentRating(0);
    setComment('');
  };

  const handleSubmitReview = async () => {
    if (!user || !reviewingOrderId || currentRating === 0) {
      alert('Por favor, selecione uma avaliação (estrelas) para o pedido.');
      return;
    }
    setIsSubmittingReview(true);
    try {
      const reviewData = {
        orderId: reviewingOrderId,
        userId: user.uid, // Usar o ID do usuário da sessão
        rating: currentRating,
        comment: comment,
      };
      // Em uma aplicação real, você chamaria seu serviço: await orderReviewService.createReview(reviewData);
      const newReview = await mockOrderReviewService.createReview(reviewData);
      setExistingReviews(prevReviews => [...prevReviews, newReview]);
      handleCloseReviewForm();
      alert('Avaliação enviada com sucesso!');
    } catch (error) {
      console.error("Erro ao enviar avaliação do pedido:", error);
      alert('Falha ao enviar avaliação. Tente novamente.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const canReviewOrder = (order: OrderI) => {
    return order.status === 'delivered' && !existingReviews.some(r => r.orderId === order.id);
  };

  if (!userProfile && !user) { // Verifica props e contexto, para o caso de SSR vs CSR
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-xl">Por favor, faça login para ver seu perfil.</p>
        </div>
      </Layout>
    );
  }
  const displayUser = userProfile || user; // Prioriza userProfile das props (SSR), fallback para context (CSR)

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10"><h1 className="text-3xl font-bold">Configurações do Perfil</h1></header>

        {displayUser && (
          <section className="mb-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Minhas Informações</h2>
            <div className="flex items-center space-x-4">
              {displayUser.avatarUrl && (
                <Image 
                  src={displayUser.avatarUrl} 
                  alt={displayUser.name || 'Avatar'} 
                  width={80} 
                  height={80} 
                  className="rounded-full" 
                />
              )}
              <div>
                <p className="text-xl font-medium">{displayUser.name}</p>
                <p className="text-custom-gray-light">{displayUser.email}</p>
              </div>
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-6">Meus Pedidos</h2>
          {orders.length === 0 ? (
            <p className="p-6 bg-white shadow-md rounded-lg text-custom-gray-light">Você ainda não fez nenhum pedido.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="p-6 bg-white shadow-md rounded-lg">
                  {/* ... (código de exibição do pedido existente) ... */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-lg font-semibold">Pedido #{order.id.substring(0, 8)}</p>
                      <p className="text-sm text-custom-gray-light">
                        Realizado em: {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span 
                      className={`px-3 py-1 text-sm rounded-full font-semibold ${ 
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-100 text-yellow-700' 
                      }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="mb-4 border-t pt-4">
                    <h4 className="font-medium mb-2">Itens do Pedido:</h4>
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center space-x-3">
                          {item.productImage && 
                            <Image 
                              src={item.productImage} 
                              alt={item.productName} 
                              width={40} 
                              height={40} 
                              className="rounded object-cover" 
                            />}
                          <div>
                            <p className="text-sm font-medium">{item.productName}</p>
                            <p className="text-xs text-custom-gray-light">Qtd: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm">R$ {(item.pricePerItem * item.quantity).toFixed(2).replace('.',',')}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 flex justify-between items-end">
                     <p className="text-md font-semibold text-right">
                       Total do Pedido: R$ {order.totalAmount.toFixed(2).replace('.',',')}
                     </p>
                  </div>

                  {/* Seção de Avaliação do Pedido */}
                  {reviewingOrderId === order.id ? (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-md font-semibold mb-2">Avalie este pedido:</h4>
                      <RatingStars 
                        interactive 
                        currentRating={currentRating} 
                        onRate={setCurrentRating} 
                        size={24}
                      />
                      <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Deixe um comentário sobre o seu pedido (opcional)" 
                        className="w-full mt-2 p-2 border rounded min-h-[80px] text-sm"
                      />
                      <div className="mt-3 flex gap-2 justify-end">
                        <Button onClick={handleCloseReviewForm} styleType="secondary" size="sm" disabled={isSubmittingReview}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSubmitReview} styleType="primary" size="sm" disabled={isSubmittingReview || currentRating === 0}>
                          {isSubmittingReview ? 'Enviando...' : 'Enviar Avaliação'}
                        </Button>
                      </div>
                    </div>
                  ) : existingReviews.some(r => r.orderId === order.id) ? (
                    <div className="mt-4 pt-4 border-t text-sm text-custom-gray-light"><p>Você já avaliou este pedido.</p>
                     {/* Poderia mostrar a avaliação aqui */}
                    </div>
                  ) : canReviewOrder(order) && (
                    <div className="mt-4 pt-4 border-t flex justify-end">
                      <Button onClick={() => handleOpenReviewForm(order.id)} styleType="outline" size="sm">
                        Avaliar Pedido
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<ProfileSettingsPageProps> = async (context) => {
  const userId = 'mockUserId'; // SIMULAÇÃO: Obtenha da sessão
  let userProfile: UserProfileI | null = null;
  let orders: OrderI[] = [];
  let existingReviews: OrderReviewI[] = [];

  if (userId) {
    userProfile = {
      id: userId,
      name: 'Usuário Exemplo Perfil',
      email: 'usuario.perfil@exemplo.com',
      avatarUrl: 'https://i.pravatar.cc/80?u=userprofile',
    };
    orders = [
      {
        id: 'order123xyz',
        userId: userId,
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), 
        items: [
          { productId: 'prodA', productName: 'Vinho Tinto Clássico', quantity: 2, pricePerItem: 75.00, productImage: 'https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_1l_153_1_20200525112308.png' },
          { productId: 'prodB', productName: 'Vinho Branco Fresco', quantity: 1, pricePerItem: 55.50, productImage: 'https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_1l_153_1_20200525112308.png' },
        ],
        totalAmount: 205.50,
        shippingAddress: { id: 'addr1', street: 'Rua das Palmeiras, 123', city: 'São Paulo', state: 'SP', zipCode: '01000-000', country: 'Brasil', isPrimary: true, number:'123', neighborhood: 'Centro', complement: 'Apto 101' },
        status: 'delivered',
      },
      {
        id: 'order456abc',
        userId: userId,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), 
        items: [
          { productId: 'prodC', productName: 'Espumante Brut Rosé', quantity: 3, pricePerItem: 90.00, productImage: 'https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_1l_153_1_20200525112308.png' },
        ],
        totalAmount: 270.00,
        shippingAddress: { id: 'addr2', street: 'Av. Principal, 789', city: 'Rio de Janeiro', state: 'RJ', zipCode: '20000-000', country: 'Brasil', isPrimary: false, number:'789', neighborhood: 'Copacabana', complement: '' },
        status: 'shipped',
      },
      {
        id: 'order789def',
        userId: userId,
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), 
        items: [{ productId: 'prodD', productName: 'Vinho do Porto', quantity: 1, pricePerItem: 120.00, productImage: 'https://images.tcdn.com.br/img/img_prod/796852/vinho_tinto_suave_bordo_san_martin_1l_153_1_20200525112308.png' }],
        totalAmount: 120.00,
        shippingAddress: { id: 'addr1', street: 'Rua das Palmeiras, 123', city: 'São Paulo', state: 'SP', zipCode: '01000-000', country: 'Brasil', isPrimary: true, number:'123', neighborhood: 'Centro', complement: 'Apto 101' },
        status: 'delivered',
      },
    ];
    // SIMULAÇÃO: Buscar avaliações existentes. Em um app real, você faria uma query no Firestore.
    // existingReviews = await mockOrderReviewService.getReviewsByOrderIds(orders.map(o => o.id));
    // Para o mock, vamos simular uma avaliação existente para o primeiro pedido entregue.
    if (orders.find(o => o.id === 'order123xyz' && o.status === 'delivered')) {
        existingReviews = [{
            id: 'revMock1',
            orderId: 'order123xyz',
            userId: userId,
            rating: 5,
            comment: 'Entrega rápida e produtos conforme esperado!',
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 dias atrás
        }];
    }
  }

  return {
    props: {
      userProfile,
      orders,
      existingReviews,
    },
  };
};
