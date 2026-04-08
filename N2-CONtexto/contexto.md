# N2 — CONTEXTO DO PROJETO

**Projeto:** Sorveteria Arthies - Sistema de Gestão  
**Versão:** 2.0.0  
**Data:** 08/04/2026

---

## INFORMAÇÕES DO NEGÓCIO

| Campo | Valor |
|-------|-------|
| Nome | Sorveteria Arthies |
| Tipo | Sorveteria artesanal |
| Localização | [A definir] |
| Diferencial | Gelatos artesanais, ingredientes naturais |
| Público-alvo | Clientes locais, famílias |

---

## ROLES E PERMISSÕES

### 👑 ADMINISTRADOR
- Relatórios completos (faturamento, pedidos, status)
- Gestão de fornecedores e compras
- CRUD de usuários com permissões
- Configurações do sistema

### 👔 GERENTE
- Adicionar pedidos à lista de compras
- Editar preços dos produtos
- Criar promoções com descontos

### 🛒 VENDEDOR
- Realizar vendas diretas (PDV)
- Aplicar descontos de fidelidade
- Solicitar reposição de produtos

### 👤 CLIENTE
- Comprar produtos (e-commerce)
- Carrinho de compras
- Acumular pontos de fidelidade (20 pts = bônus)
- Ver promoções ativas

---

## STACK ESCOLHIDA

| Tecnologia | Propósito |
|------------|-----------|
| Next.js 14 | Framework full-stack |
| TypeScript | Tipagem estática |
| Tailwind CSS + shadcn/ui | UI components |
| Supabase | Auth + PostgreSQL + Storage |
| Zustand | State management |
| React Hook Form + Zod | Form validation |
| Vitest + Playwright | Testing |
| Vercel | Deploy + CDN |
| GitHub Actions | CI/CD |

---

## ARQUITETURA

### Rendering
- SSR para SEO (páginas públicas)
- SSG para páginas estáticas
- CSR para dashboard/admin

### Database (Supabase)
- PostgreSQL para dados relacionais
- Row Level Security (RLS) para permissões
- Realtime para atualizações ao vivo

### Auth (Supabase Auth)
- JWT com refresh tokens
- RBAC via custom claims
- OAuth (Google) opcional

---

## RESTRIÇÕES

| Restrição | Detalhe |
|-----------|---------|
| Prazo | 12 semanas máximo |
| Budget | Zero (ferramentas gratuitas) |
| Equipe | 1 desenvolvedor |
| Pagamento | Cash/PIX only (v1) |
| Mobile | PWA only (v1) |

---

## FONTES DE VERDADE

| Artefato | Local |
|----------|-------|
| Planejamento | planejamento.md |
| Decisões (ADR) | docs/adr/ |
| Sprint Logs | N3-Execucao/sprint-*.md |
| Contexto | Este arquivo |

---

## MVP vs v2

### MVP (12 semanas)
- Sistema web com 4 roles
- PDV para vendedores
- E-commerce básico
- Programa de fidelidade

### v2 (futuro)
- App React Native
- Pagamento online
- Delivery
- Dark mode

---

*Última atualização: 08/04/2026*
