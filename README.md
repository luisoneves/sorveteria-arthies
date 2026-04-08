# 🍨 Sorveteria Arthies - Sistema de Gestão

Sistema completo de gestão para Sorveteria Arthies, desenvolvido com Next.js 14, TypeScript e Supabase.

## 📋 Descrição

Sistema de gestão com 4 perfis de usuário:
- **Administrador**: Dashboard completo, gestão de usuários, relatórios, fornecedores, compras
- **Gerente**: Produtos, preços, promoções, reposições
- **Vendedor**: PDV (Ponto de Venda), vendas, programa de fidelidade
- **Cliente**: E-commerce com carrinho, pedidos e pontos

## 🚀 Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Estado | Zustand |
| Validação | Zod |
| Backend | Next.js API Routes |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase Auth + JWT |
| Deploy | Vercel |

## 📁 Estrutura

```
src/
├── app/
│   ├── (auth)/           # Login, Register
│   ├── (dashboard)/       # Dashboards por role
│   │   ├── admin/        # Admin
│   │   ├── gerente/       # Gerente
│   │   ├── vendedor/      # Vendedor
│   │   └── cliente/       # Cliente
│   └── api/              # API Routes
├── components/ui/        # Button, Input, Card, etc.
├── components/layout/    # Sidebar, Header
├── hooks/                # useAuth, useCart, usePermission
├── lib/                  # Utils, Constants, Supabase
├── types/                # TypeScript types
└── middleware.ts         # Auth + RBAC
```

## 🛠️ Como Rodar

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd sorveteria-arthies
npm install
```

### 2. Configurar ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais do Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 3. Rodar migrations

```bash
# Via Supabase CLI
supabase db push

# Ou execute o SQL manualmente
# supabase/migrations/001_initial_schema.sql
```

### 4. Iniciar

```bash
npm run dev      # Desenvolvimento
npm run build    # Build produção
npm run start    # Produção
```

## 🧪 Testes

```bash
npm test              # Unit tests (Vitest)
npm run test:coverage # Com coverage
npm run test:e2e     # E2E (Playwright)
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte o repo ao [Vercel](https://vercel.com)
2. Configure as env vars na Vercel
3. Deploy automático a cada push

### Variáveis de ambiente necessárias

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY (apenas server-side)
```

## 📝 Funcionalidades

### Cliente 🛒
- [x] Login/Registro
- [x] Catálogo de produtos
- [x] Carrinho de compras
- [x] Finalizar pedido
- [x] Programa de fidelidade (20 pts = R$10)
- [x] Histórico de pedidos
- [x] Ver pontos

### Vendedor 💳
- [x] PDV (Ponto de Venda)
- [x] Realizar vendas
- [x] Aplicar descontos de fidelidade

### Gerente 📊
- [x] Dashboard
- [x] CRUD de produtos
- [x] Editar preços
- [x] Criar promoções
- [x] Aprovar/rejeitar reposições

### Administrador ⚙️
- [x] Dashboard com métricas
- [x] CRUD de usuários
- [x] Relatórios de vendas
- [x] Gestão de fornecedores
- [x] Controle de compras

## 🔒 Segurança

- ✅ JWT com cookies httpOnly
- ✅ RBAC em todas as rotas
- ✅ Validação Zod em todas as APIs
- ✅ Sanitização de inputs
- ✅ Senhas hasheadas (bcrypt)
- ✅ CORS configurado
- ✅ Rate limiting (futuro)

## 📚 Documentação

- [planejamento.md](planejamento.md) - Planejamento completo
- [docs/adr/](docs/adr/) - Architecture Decision Records

## 📄 Licença

MIT
