# Desafio E-commerce Wine (Next.js)

[![Deploy with Vercel](https://vercel.com/button)](https://wine-orcin.vercel.app/)

Projeto de e-commerce desenvolvido como parte de um desafio, utilizando designs de tela da Wine como base para a interface de listagem e detalhes de produtos. Funcionalidades adicionais como carrinho de compras, gerenciamento de endereços/cartões e fluxo de finalização de pedido foram implementadas para criar uma experiência de compra mais completa.

**🚀 Demo ao Vivo:** [https://wine-orcin.vercel.app/](https://wine-orcin.vercel.app/)

## 📸 Screenshots

[Imagem das telas do E-commerce Wine]
*(Você pode adicionar a imagem diretamente no GitHub ou manter esta linha como referência)*

## ✨ Funcionalidades Implementadas

* **Listagem de Produtos:** Visualização dos vinhos disponíveis com dados mockados.
* **Filtro:** Filtragem de produtos por faixa de preço.
* **Paginação:** Navegação entre páginas de produtos.
* **Cache:** Utilização do React Query para otimizar o carregamento e cache de dados da listagem, filtros e paginação.
* **Detalhes do Produto:** Página dedicada com informações sobre um vinho específico.
* **Autenticação:** Login utilizando conta Google (Firebase Authentication).
* **Carrinho de Compras:** Adição/remoção de produtos, visualização em um drawer lateral.
* **Gerenciamento de Endereços:**
    * Criação e listagem de endereços de entrega.
    * Integração com a API do IBGE para buscar cidade/estado automaticamente a partir do CEP.
* **Gerenciamento de Cartões:** Criação e listagem de cartões de crédito para pagamento.
* **Fluxo de Checkout:**
    1.  Seleção de endereço de entrega.
    2.  Seleção de método de pagamento (Pix ou Cartão de Crédito).
    3.  Revisão final do pedido antes da confirmação.
* **Persistência de Dados:** Carrinho, endereços e cartões são salvos no Firebase Firestore para usuários logados.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** Next.js (React Framework)
* **Estilização:** Tailwind CSS
* **Gerenciamento de Estado (Server-Side):** React Query / TanStack Query (Fetch, Cache e Sincronização de dados)
* **Autenticação:** Firebase Authentication (Google Provider)
* **Banco de Dados (NoSQL):** Firebase Firestore (para carrinho, endereços, cartões)
* **APIs Externas:** API de CEP (IBGE via ViaCEP ou similar - *confirme qual usou*)
* **Deployment:** Vercel

## 🚀 Rodando o Projeto Localmente

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento:

**Pré-requisitos:**

* Node.js (versão 16 ou superior recomendada)
* Yarn (gerenciador de pacotes)
* Uma conta no Firebase com um projeto configurado (Authentication e Firestore habilitados)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    cd SEU_REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    yarn install
    ```

3.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo chamado `.env.local` na raiz do projeto.
    * Adicione as credenciais do seu projeto Firebase a este arquivo. Você pode encontrar essas credenciais no console do Firebase (Configurações do projeto > Geral > Seus apps > Configuração do SDK).
    * Exemplo de variáveis necessárias (substitua pelos seus valores):
        ```plaintext
        NEXT_PUBLIC_FIREBASE_API_KEY=SUA_API_KEY
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=SEU_SENDER_ID
        NEXT_PUBLIC_FIREBASE_APP_ID=SEU_APP_ID
        # Adicione outras variáveis se necessário (ex: API do IBGE, se usar chave)
        ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    yarn dev
    ```
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

5.  **(Opcional) Build de Produção:**
    Para criar uma build otimizada para produção:
    ```bash
    yarn build
    yarn start
    ```

## 📄 Licença

Este projeto pode ser distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes (se você adicionar um).

---

_Projeto desenvolvido por [Seu Nome/Usuário]_
