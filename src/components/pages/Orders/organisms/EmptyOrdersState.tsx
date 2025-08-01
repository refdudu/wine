export const EmptyOrdersState = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="text-gray-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-label="Ícone de pedidos vazios"
        >
          <title>Nenhum pedido encontrado</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Nenhum pedido encontrado
      </h3>
      <p className="text-gray-600">
        Você ainda não fez nenhum pedido conosco.
      </p>
    </div>
  );
};
