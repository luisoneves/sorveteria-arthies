# 🍨 Sorveteria Arthies — Sistema de Gestão

Sistema completo de gestão para Sorveteria Arthies.

## 🚀 Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Estado | Zustand |
| Validação | Zod |
| Backend | Supabase (Auth + PostgreSQL + RLS) |
| Deploy | Vercel |

## 👥 Perfis

| Role | Descrição |
|------|-----------|
| **Admin** | Dashboard completo, relatórios, gestão de usuários |
| **Gerente** | Produtos, preços, promoções |
| **Vendedor** | PDV (Ponto de Venda), vendas, fidelidade |
| **Cliente** | E-commerce, carrinho, pedidos, pontos |

## 🛠️ Setup

```bash
# Install
npm install

# Environment
cp .env.example .env.local
# Edit .env.local with Supabase credentials

# Run
npm run dev
```

## Variáveis

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY  # server-only
```

## 🧪 Testes

```bash
npm test              # Unit (Vitest)
npm run test:coverage # With coverage
npm run test:e2e     # E2E (Playwright)
```

## 📚 Documentação

- [planejamento.md](planejamento.md) — Planejamento completo
- [docs/adr/](docs/adr/) — Architecture Decision Records
- [CONTEXT.md](CONTEXT.md) — Contexto do projeto
- [AGENTS.md](AGENTS.md) — Regras de desenvolvimento

## 🔒 Segurança

- JWT com cookies httpOnly
- RBAC por role (middleware.ts)
- RLS em todas as tabelas
- Zod validation em todas as APIs
- Secrets em variáveis de ambiente

## 📄 Licença

MIT
