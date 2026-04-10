# CONTEXT — Sorveteria Arthies

## Projeto
- **Nome**: Sorveteria Arthies
- **Stack**: Next.js 14 + TypeScript + Tailwind + Supabase
- **Tipo**: Sistema de gestão (E-commerce + PDV)
- **Complexidade**: P2 (Startup/SaaS pequeno)

## Perfis de Usuário
| Role | Descrição |
|------|-----------|
| Admin | Dashboard completo, relatórios, usuários |
| Gerente | Produtos, preços, promoções |
| Vendedor | PDV, vendas, programa de fidelidade |
| Cliente | E-commerce, carrinho, pedidos |

## Stack Técnica
| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14 (App Router) |
| Estado | Zustand |
| Validação | Zod |
| Backend | Supabase (Auth + PostgreSQL + RLS) |
| Deploy | Vercel |

## Regras do Ecossistema
- Regras em `.aiRules/` e `.devRules/` (locais, não versionados)
- Perfil: **P2** → Skill Matrix com níveis L1/L2

## Estado
- Em desenvolvimento
- Migrations prontas
- Contexto detalhado em `.Contexto/contexto.md`
- Planejamentos em `.Contexto/planejamento.md`
- Tarefas em `.Contexto/TASK.md`

## Pendências
- [ ] Sprint 2: Autenticação & UX
- [ ] Sprint 3: Dashboards e funcionalidades
- [ ] Sprint 4: Qualidade & Deploy
- [ ] Sprint 5: Supabase Real
