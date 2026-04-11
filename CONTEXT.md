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

### Sprint 1: Fundamentos (Concluído)
- [IA] ✅ Implementado & Testado | [HUMANO] ⏳ Validado em Produção: Lei 19 (Preço server-side)
- [IA] ✅ Implementado & Testado | [HUMANO] ⏳ Validado em Produção: Sistema de mock local
- [IA] ✅ Implementado & Testado | [HUMANO] ⏳ Validado em Produção: RBAC (4 roles)
- [IA] ✅ Implementado & Testado | [HUMANO] ⏳ Validado em Produção: Programa de Fidelidade
- [IA] ✅ Implementado & Testado | [HUMANO] ⏳ Validado em Produção: Homepage pública

### Sprint 2: Autenticação & UX
- [ ] Autenticação completa (login/logout)
- [ ] UI/UX refinada

### Sprint 3: Dashboards e Funcionalidades
- [ ] Dashboard Admin
- [ ] Dashboard Gerente
- [ ] Dashboard Vendedor (PDV)
- [ ] E-commerce completo

### Sprint 4: Qualidade & Deploy
- [ ] Testes E2E
- [ ] Deploy produção

### Sprint 5: Supabase Real
- [ ] Migrar de mock para Supabase real
