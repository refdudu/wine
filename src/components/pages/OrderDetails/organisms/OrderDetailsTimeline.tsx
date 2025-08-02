import type { OrderI } from "@/interfaces/OrderI";

interface OrderDetailsTimelineProps {
  order: OrderI;
}

interface TimelineStep {
  status: string;
  title: string;
  description: string;
  date?: Date;
  isCompleted: boolean;
  isCurrent: boolean;
}

export const OrderDetailsTimeline = ({ order }: OrderDetailsTimelineProps) => {
  const getTimelineSteps = (): TimelineStep[] => {
    const baseSteps = [
      {
        status: "pending",
        title: "Pedido Confirmado",
        description: "Seu pedido foi confirmado e está sendo processado",
        date: order.createdAt,
        isCompleted: true,
        isCurrent: order.status === "pending",
      },
      {
        status: "processing",
        title: "Preparando para Envio",
        description: "Estamos separando seus produtos",
        date: undefined,
        isCompleted: ["processing", "shipped", "delivered"].includes(order.status),
        isCurrent: order.status === "processing",
      },
      {
        status: "shipped",
        title: "Em Transporte",
        description: "Seu pedido está a caminho",
        date: undefined,
        isCompleted: ["shipped", "delivered"].includes(order.status),
        isCurrent: order.status === "shipped",
      },
      {
        status: "delivered",
        title: "Entregue",
        description: "Pedido entregue com sucesso",
        date: undefined,
        isCompleted: order.status === "delivered",
        isCurrent: order.status === "delivered",
      },
    ];

    // Se o pedido foi cancelado, adicionar step de cancelamento
    if (order.status === "cancelled") {
      return [
        ...baseSteps.slice(0, 1), // Apenas o primeiro step (confirmado)
        {
          status: "cancelled",
          title: "Pedido Cancelado",
          description: "Seu pedido foi cancelado",
          date: undefined,
          isCompleted: true,
          isCurrent: true,
        },
      ];
    }

    return baseSteps;
  };

  const steps = getTimelineSteps();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Acompanhe seu Pedido
      </h2>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.status} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.isCompleted
                    ? step.status === "cancelled"
                      ? "bg-red-500"
                      : "bg-green-500"
                    : step.isCurrent
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
              >
                {step.isCompleted && step.status !== "cancelled" ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : step.status === "cancelled" ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className={`w-0.5 h-12 mt-2 ${
                  step.isCompleted ? "bg-green-300" : "bg-gray-300"
                }`} />
              )}
            </div>

            <div className="flex-1 pb-6">
              <h3 className={`font-medium ${
                step.isCompleted || step.isCurrent
                  ? step.status === "cancelled"
                    ? "text-red-900"
                    : "text-gray-900"
                  : "text-gray-500"
              }`}>
                {step.title}
              </h3>
              
              <p className={`text-sm mt-1 ${
                step.isCompleted || step.isCurrent
                  ? step.status === "cancelled"
                    ? "text-red-600"
                    : "text-gray-600"
                  : "text-gray-400"
              }`}>
                {step.description}
              </p>
              
              {step.date && (
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(step.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {order.status === "shipped" && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Código de Rastreamento</h4>
            <p className="text-sm text-blue-700 font-mono">BR123456789BR</p>
            <p className="text-xs text-blue-600 mt-2">
              Use este código para rastrear sua encomenda no site dos Correios
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
