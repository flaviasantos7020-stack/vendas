# Naninhas Store

Catálogo simples (Angular standalone) para venda de naninhas e fraldas bordadas. Não há carrinho, login nem checkout: cada produto tem um botão **"Comprar no WhatsApp"** que abre uma conversa no WhatsApp com uma mensagem pré-preenchida citando o produto e o preço.

## Configurar a loja

Edite [src/app/core/config/site-config.ts](src/app/core/config/site-config.ts):

- `whatsappNumber`: número do WhatsApp da loja, formato internacional só com dígitos (ex: `5511999999999`).
- `storeName`, `tagline`, `instagramUrl`: dados exibidos no cabeçalho/rodapé.

## Editar o catálogo

Os produtos ficam em [src/app/core/data/products.ts](src/app/core/data/products.ts) — é um array estático, sem backend. Para adicionar um produto:

1. Adicione um item ao array com `category: 'naninha'` ou `'fralda-bordada'`.
2. Coloque uma imagem em `public/products/` e referencie em `images`.

## Desenvolvimento

```bash
npm install
npm start      # ng serve, http://localhost:4200
npm run build  # build de produção em dist/
npm test       # testes com Vitest
```
