# Orders Components

Esta pasta contém os componentes relacionados à página de pedidos, organizados seguindo o padrão de Atomic Design.

## Estrutura

### Atoms (Componentes Básicos)
- **StatusBadge**: Badge para exibir o status do pedido
- **OrderInfoField**: Campo de informação do pedido (label + valor)
- **AddressIcon**: Ícones para usuário e localização
- **ChevronIcon**: Ícone de seta para dropdown
- **CloseIcon**: Ícone de fechar
- **ProductImage**: Imagem do produto

### Molecules (Combinações de Atoms)
- **AddressInfo**: Combina ícone + informações de endereço
- **AddressDropdownButton**: Botão do dropdown de endereço
- **ProductInfo**: Informações do produto (nome + quantidade)
- **ProductPrice**: Preço total do item
- **OrderTotal**: Total do pedido

### Organisms (Componentes Complexos)
- **AddressDropdown**: Dropdown completo com endereço
- **OrderProductCard**: Card de produto no pedido
- **OrderHeader**: Header do card de pedido
- **OrderItemsList**: Lista de itens do pedido
- **OrderCard**: Card completo do pedido
- **EmptyOrdersState**: Estado vazio quando não há pedidos
- **ErrorState**: Estado de erro
- **OrdersList**: Lista de todos os pedidos

## Uso

```tsx
import { 
  OrdersList, 
  EmptyOrdersState, 
  ErrorState 
} from "@/components/pages/Orders";

// Em sua página ou componente
{error && <ErrorState error={error} onRetry={handleRetry} />}
{orders.length === 0 ? <EmptyOrdersState /> : <OrdersList orders={orders} />}
```

## Benefícios da Separação

1. **Reutilização**: Componentes podem ser reutilizados em outras partes da aplicação
2. **Manutenibilidade**: Cada componente tem uma responsabilidade específica
3. **Testabilidade**: Componentes menores são mais fáceis de testar
4. **Legibilidade**: Código mais organizado e fácil de entender
5. **Escalabilidade**: Facilita a adição de novos recursos
