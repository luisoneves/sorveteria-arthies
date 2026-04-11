# Sorveteria Arthies — Regras de Desenvolvimento

## Stack

- Next.js 14 (App Router)
- TypeScript
- Supabase (Auth + PostgreSQL)
- Tailwind CSS

## Perfis de Usuário

- Admin — Dashboard completo
- Gerente — Gestão de produtos
- Vendedor — PDV e vendas
- Cliente — E-commerce

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variáveis

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Testes

```bash
npm test        # Unit tests
npm run test:e2e  # E2E tests
npm run build   # Build production
```

---

Consulte `.Contexto/` para contexto detalhado do projeto.