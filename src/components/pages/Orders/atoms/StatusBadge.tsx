import type { OrderI } from "@/interfaces/OrderI";

const statusTranslations = {
  pending: "Pendente",
  processing: "Processando",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

interface StatusBadgeProps {
  status: OrderI["status"];
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
    >
      {statusTranslations[status]}
    </span>
  );
};
