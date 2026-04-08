# SORVETERIA ARTHIES - PLANEJAMENTO DO PROJETO

**Versão:** 2.0.0  
**Data:** 08/04/2026  
**Status:** PLANEJAMENTO  
**Complexidade:** **COMPLEXO+** (Sistema de Gestão com 4 roles)

---

## 1. NÍVEL N1 — CONSTITUIÇÃO (Regras Universais)

### 1.1 Classificação do Projeto

| Atributo | Valor | Justificativa |
|----------|-------|---------------|
| **Tipo** | Sistema de Gestão (E-commerce + Admin + CRM) | Múltiplos módulos com roles |
| **Complexidade** | **COMPLEXO+** | Autenticação, autorização, BD, múltiplos módulos |
| **Prazo Estimado** | 8-12 semanas | Sistema completo |
| **Usuários Esperados** | < 500 | Negócio local, fase inicial |
| **Roles** | 4 (Admin, Gerente, Vendedor, Cliente) | Hierarquia de permissões |

### 1.2 Pilares Aplicados (N1 Obrigatório)

#### 🔴 PILAR 1 — Segurança e Resiliência

| Item | Status | Ação |
|------|--------|------|
| Validação de entrada | ✅ OBRIGATÓRIO | Zod + server-side validation |
| Sanitização de dados | ✅ OBRIGATÓRIO | Sanitizar todos inputs |
| Proteção OWASP Top 10 | ✅ OBRIGATÓRIO | CSP, XSS, CSRF, SQL Injection |
| Autenticação básica | ✅ OBRIGATÓRIO | JWT + bcrypt |
| Autorização/controle de acesso | ✅ OBRIGATÓRIO | RBAC por role |
| Secrets fora do código | ✅ OBRIGATÓRIO | .env para tudo |
| Não expor secrets no frontend | ✅ OBRIGATÓRIO | API keys server-side only |
| Evitar libs vulneráveis | ✅ OBRIGATÓRIO | npm audit + Snyk |
| Logs de eventos críticos | ✅ OBRIGATÓRIO | Auditoria de ações |
| Rollback possível | ✅ OBRIGATÓRIO | Git tags + migrations |
| Controle de sessão | ✅ OBRIGATÓRIO | JWT com expiry |
| Backup de dados | ✅ OBRIGATÓRIO | PostgreSQL backup diário |

#### 🔴 PILAR 2 — Qualidade e Confiabilidade

| Item | Status | Ação |
|------|--------|------|
| Critérios mínimos de qualidade | ✅ DEFINIR | DoD documentado |
| Definição de "pronto" | ✅ DEFINIR | Checklist de entrega |
| Teste mínimo do fluxo principal | ✅ OBRIGATÓRIO | Playwright E2E |
| Teste unitário em lógica crítica | ✅ OBRIGATÓRIO | Vitest para services |
| Teste de integração | ✅ OBRIGATÓRIO | API routes tests |
| Build validado automaticamente | ✅ OBRIGATÓRIO | CI/CD com testes |
| Lint/check mínimo | ✅ OBRIGATÓRIO | ESLint + TypeScript strict |
| Reproduzir bug | ✅ PROCESSO | Bug report template |
| Registro de bugs | ✅ PROCESSO | GitHub Issues |
| Cobertura mínima | ✅ META | > 70% coverage |

#### 🔴 PILAR 3 — Engenharia e Arquitetura

| Item | Status | Ação |
|------|--------|------|
| Organização de diretórios | ✅ OBRIGATÓRIO | Feature-based modules |
| Separação de responsabilidades | ✅ OBRIGATÓRIO | Services, Controllers, Models |
| Padrão de nomes consistente | ✅ OBRIGATÓRIO | Conventional commits |
| Código legível | ✅ OBRIGATÓRIO | Code review |
| Evitar duplicação | ✅ OBRIGATÓRIO | DRY, shared utilities |
| Arquitetura de camadas | ✅ OBRIGATÓRIO | UI/Logic/Data separation |
| Build funcionando | ✅ VERIFICAR | npm run build |
| Deploy funcionando | ✅ VERIFICAR | CI/CD pipeline |
| Logs mínimos | ✅ OBRIGATÓRIO | Pino + structured logging |
| Rastrear erros críticos | ✅ OBRIGATÓRIO | Sentry |
| Evitar travamentos | ✅ OBRIGATÓRIO | Error boundaries |
| Refatoração progressiva | ✅ PLANEJADO | Technical debt tracking |
| Documentação de arquitetura | ✅ OBRIGATÓRIO | ADR para decisões |
| Revisão básica de código | ✅ PROCESSO | PR reviews obrigatórios |

#### 🟡 PILAR 4 — Pensamento Sistêmico e Decisão

| Item | Status | Ação |
|------|--------|------|
| Problema claramente descrito | ✅ DOCUMENTADO | Seção 2 |
| Objetivo claro | ✅ DEFINIDO | Seção 2.3 |
| Priorização | ✅ APLICADA | MVP primeiro |
| Registro de decisão | ✅ DOCUMENTADO | ADR |
| Trade-offs documentados | ✅ DOCUMENTADO | Seção 5.2 |
| Identificar riscos | ✅ IDENTIFICADO | Seção 7 |
| ADR para decisões técnicas | ✅ OBRIGATÓRIO | /docs/adr/ |

#### 🟡 PILAR 5 — UX e Acessibilidade

| Item | Status | Ação |
|------|--------|------|
| Texto legível | ✅ OBRIGATÓRIO | Font-size mínimo 16px |
| Contraste mínimo | ✅ OBRIGATÓRIO | WCAG AA (4.5:1) |
| Navegação funcional | ✅ OBRIGATÓRIO | Menu por role |
| Fluxo principal claro | ✅ DESIGN | Cada role tem dashboard |
| Interface funcional | ✅ OBRIGATÓRIO | Mobile-first |
| Feedback visual | ✅ OBRIGATÓRIO | Toast notifications |
| Mensagens de erro | ✅ OBRIGATÓRIO | UX de erros |
| Loading states | ✅ OBRIGATÓRIO | Skeletons + spinners |
| Acessibilidade básica | ✅ OBRIGATÓRIO | ARIA labels, keyboard nav |

#### 🔴 PILAR 6 — Negócio, Escalabilidade e Automação

| Item | Status | Ação |
|------|--------|------|
| Programa de fidelidade | ✅ CORE | Sistema de pontos |
| Gestão de promoções | ✅ CORE | Regras de desconto |
| Dashboard de métricas | ✅ OBRIGATÓRIO | KPIs do negócio |
| Automação de processos | ✅ PLANEJADO | v2 |

---

## 2. NÍVEL N2 — CONTEXTO DO PROJETO

### 2.1 Visão do Projeto

**O que é:** Sistema completo de gestão para Sorveteria Arthies  
**Por que existe:** Digitalizar operações, fidelizar clientes, controlar vendas  
**Para quem:** Administradores, Gerentes, Vendedores e Clientes  
**Quando:** Sistema principal do negócio

### 2.2 Estrutura de Usuários e Permissões

#### 👑 ADMINISTRADOR (Owner)

| Permissão | Descrição |
|-----------|-----------|
| **Relatórios Completos** | Faturamento, vendas, pedidos |
| **Gestão de Pedidos** | Status (pendente, em andamento, concluído) |
| **Gestão de Fornecedores** | CRUD completo |
| **Gestão de Compras** | Acompanhar próximas compras |
| **Gestão de Usuários** | Criar, editar, excluir usuários |
| **Permissões** | Atribuir permissões específicas por usuário |
| **Configurações** | Sistema completo |

#### 👔 GERENTE

| Permissão | Descrição |
|-----------|-----------|
| **Adicionar Pedidos** | Lista de compras para fornecedores |
| **Editar Preços** | Produtos vendidos |
| **Criar Promoções** | Descontos em produtos |
| **Visualizar Relatórios** | Vendas e estoque (limitado) |

#### 🛒 VENDEDOR

| Permissão | Descrição |
|-----------|-----------|
| **Realizar Vendas** | Vendas diretas ao cliente |
| **Aplicar Descontos** | Descontos de fidelidade programados |
| **Solicitar Reposição** | Pedidos de reposição para gerente |

#### 👤 CLIENTE

| Permissão | Descrição |
|-----------|-----------|
| **Comprar Produtos** | E-commerce |
| **Carrinho de Compras** | Adicionar/remover itens |
| **Ver Promoções** | Promoções ativas |
| **Programa de Fidelidade** | Acumular pontos (20 pts = bônus) |
| **Histórico de Compras** | Suas compras anteriores |

### 2.3 Problemas a Resolver

| Problema | Solução |
|----------|---------|
| Controle manual de vendas | Sistema de PDV digital |
| Sem programa de fidelidade | Sistema de pontos automático |
| Gestão de estoque manual | Controle de estoque integrado |
| Sem presença digital para clientes | E-commerce + app-like experience |
| Relatórios dispersos | Dashboard centralizado |
| Sem controle de acesso | RBAC por role |

### 2.4 Objetivos SMART

| Objetivo | Indicador | Meta |
|----------|-----------|------|
| Sistema funcional | Todas as 4 roles acessando | 3 meses |
| Fidelização | Clientes usando pontos | 6 meses |
| Digitalização | 80% vendas pelo sistema | 6 meses |
| Performance | Tempo de resposta < 200ms | 2 meses |
| Uptime | Disponibilidade 99.5% | Contínuo |

### 2.5 Stack Tecnologica

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| **Frontend** | Next.js 14 (App Router) | SSR, SEO, performance |
| **UI** | Tailwind CSS + shadcn/ui | Design system consistente |
| **Backend** | Next.js API Routes | Serverless functions |
| **Database** | PostgreSQL (Supabase) | Relational, real-time |
| **Auth** | Supabase Auth | JWT, OAuth, RBAC |
| **Storage** | Supabase Storage | Imagens de produtos |
| **State** | Zustand | Client state management |
| **Forms** | React Hook Form + Zod | Validação robusta |
| **Testing** | Vitest + Playwright | Unit + E2E |
| **Deploy** | Vercel | Hospedagem + CDN |
| **CI/CD** | GitHub Actions | Automação de deploy |

### 2.6 Arquitetura do Sistema

```
sorveteria-arthies/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Grupo de rotas auth
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/          # Grupo de rotas protegidas
│   │   │   ├── admin/            # Routes do Admin
│   │   │   │   ├── dashboard/
│   │   │   │   ├── usuarios/
│   │   │   │   ├── relatorios/
│   │   │   │   ├── fornecedores/
│   │   │   │   └── compras/
│   │   │   ├── gerente/          # Routes do Gerente
│   │   │   │   ├── dashboard/
│   │   │   │   ├── produtos/
│   │   │   │   ├── promocoes/
│   │   │   │   └── reposicoes/
│   │   │   ├── vendedor/         # Routes do Vendedor
│   │   │   │   ├── pdv/
│   │   │   │   ├── vendas/
│   │   │   │   └── fidelidade/
│   │   │   ├── cliente/          # Routes do Cliente
│   │   │   │   ├── shop/
│   │   │   │   ├── carrinho/
│   │   │   │   ├── pedidos/
│   │   │   │   └── pontos/
│   │   │   └── layout.tsx
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/
│   │   │   ├── produtos/
│   │   │   ├── pedidos/
│   │   │   ├── vendas/
│   │   │   ├── pontos/
│   │   │   └── admin/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── layout/               # Header, Sidebar, Footer
│   │   ├── forms/                # Form components
│   │   ├── tables/               # Data tables
│   │   └── charts/               # Dashboard charts
│   ├── hooks/                    # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── usePermission.ts
│   │   └── useCart.ts
│   ├── lib/
│   │   ├── db/                   # Database client
│   │   ├── auth/                 # Auth utilities
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── services/                 # Business logic
│   │   ├── auth.service.ts
│   │   ├── produto.service.ts
│   │   ├── venda.service.ts
│   │   ├── pontos.service.ts
│   │   └── promocao.service.ts
│   ├── types/                    # TypeScript types
│   │   ├── user.ts
│   │   ├── produto.ts
│   │   ├── pedido.ts
│   │   └── index.ts
│   └── middleware.ts             # Auth middleware
├── docs/                         # Documentação
│   └── adr/                      # Architecture Decision Records
├── supabase/                     # Migrations
│   └── migrations/
├── tests/
│   ├── unit/
│   └── e2e/
├── .env.example
├── package.json
├── tailwind.config.ts
└── README.md
```

### 2.7 Modelo de Dados (ER Simplificado)

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   USUARIO   │       │    PEDIDO    │       │   PRODUTO   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │──┐    │ id          │       │ id          │
│ email       │  │    │ cliente_id  │◄──────│ nome        │
│ nome        │  └───►│ vendedor_id │       │ preco       │
│ role        │       │ status      │       │ categoria   │
│ pontos      │       │ total       │       │ imagem      │
│ created_at  │       │ created_at  │       │ estoque     │
└─────────────┘       └─────────────┘       └─────────────┘
       │                    │
       │                    ▼
       │             ┌─────────────┐
       │             │  ITEM_PEDIDO │
       │             ├─────────────┤
       │             │ id          │
       │             │ pedido_id   │
       └────────────►│ produto_id  │
                     │ quantidade  │
                     │ preco_unit  │
                     │ desconto    │
                     └─────────────┘

┌─────────────┐       ┌─────────────┐
│  PROMOCAO   │       │ FORNECEDOR  │
├─────────────┤       ├─────────────┤
│ id          │       │ id          │
│ nome        │       │ nome        │
│ desconto    │       │ contato     │
│ data_inicio │       │ produtos    │
│ data_fim    │       └─────────────┘
│ produtos[]  │
└─────────────┘
```

---

## 3. NÍVEL N3 — EXECUÇÃO (Roadmap)

### 3.1 Sprint 1: Foundation (Semanas 1-2)

- [ ] Setup Next.js 14 com TypeScript
- [ ] Configurar Tailwind + shadcn/ui
- [ ] Configurar Supabase (Auth + DB)
- [ ] Criar migrations do banco
- [ ] Implementar autenticação (login/register)
- [ ] Criar middleware de auth
- [ ] Implementar RBAC (roles)
- [ ] Setup ESLint + Prettier + Husky
- [ ] Setup CI/CD (GitHub Actions)

### 3.2 Sprint 2: Admin Dashboard (Semanas 3-4)

- [ ] Layout do dashboard admin
- [ ] CRUD de usuários
- [ ] Dashboard de relatórios
- [ ] CRUD de fornecedores
- [ ] Gestão de compras
- [ ] Configurações do sistema

### 3.3 Sprint 3: Gerente Module (Semanas 5-6)

- [ ] Dashboard do gerente
- [ ] CRUD de produtos
- [ ] Edição de preços
- [ ] Sistema de promoções
- [ ] Visualizar pedidos
- [ ] Aprovar reposições

### 3.4 Sprint 4: Vendedor/PDV (Semanas 7-8)

- [ ] Interface de PDV
- [ ] Realizar vendas
- [ ] Busca de produtos
- [ ] Aplicar descontos fidelidade
- [ ] Fechamento de caixa
- [ ] Solicitar reposição

### 3.5 Sprint 5: Cliente/E-commerce (Semanas 9-10)

- [ ] Catálogo de produtos
- [ ] Carrinho de compras
- [ ] Checkout
- [ ] Programa de pontos
- [ ] Histórico de pedidos
- [ ] Ver promoções

### 3.6 Sprint 6: Polimento (Semanas 11-12)

- [ ] Testes E2E (Playwright)
- [ ] Testes unitários (Vitest)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Security audit
- [ ] Bug fixes

### 3.7 Sprint 7: Lançamento (Semana 12+)

- [ ] Deploy em produção
- [ ] Monitoramento (Sentry)
- [ ] Analytics (Plausible)
- [ ] Documentação final
- [ ] Treinamento de usuários
- [ ] Go-live

---

## 4. DEFINIÇÃO DE PRONTO (DoD)

### 4.1 Checklist de Funcionalidade (por módulo)

#### Administrador
- [ ] Dashboard com métricas
- [ ] CRUD completo de usuários com roles
- [ ] Relatório de faturamento
- [ ] Gestão de fornecedores
- [ ] Acompanhamento de compras

#### Gerente
- [ ] Adicionar pedidos à lista de compras
- [ ] Editar preços dos produtos
- [ ] Criar/editar promoções
- [ ] Visualizar status de pedidos

#### Vendedor
- [ ] Realizar vendas (PDV)
- [ ] Aplicar descontos fidelidade
- [ ] Solicitar reposição de estoque
- [ ] Imprimir nota/comprovante

#### Cliente
- [ ] Registrar/login
- [ ] Navegar catálogo
- [ ] Adicionar ao carrinho
- [ ] Finalizar compra
- [ ] Ver pontos acumulados
- [ ] Resgatar pontos (20 pts = bônus)
- [ ] Ver promoções ativas

### 4.2 Checklist de Qualidade

- [ ] Lighthouse Performance > 85
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse Best Practices > 95
- [ ] Sem erros no console
- [ ] ESLint 0 errors
- [ ] TypeScript strict mode
- [ ] Coverage > 70%
- [ ] All E2E tests passing

### 4.3 Checklist de Segurança

- [ ] Auth com JWT (access + refresh token)
- [ ] Password hashing (bcrypt)
- [ ] RBAC em todas as rotas
- [ ] Input validation (Zod)
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] HTTPS only
- [ ] Secrets no .env
- [ ] Dependency audit (npm audit)

### 4.4 Checklist de Documentação

- [ ] README.md completo
- [ ] .env.example
- [ ] ADR para decisões técnicas
- [ ] Documentação de API
- [ ] Manual do usuário

---

## 5. HEURÍSTICA DE APLICAÇÃO

### 5.1 Regras Aplicadas

```
COMPLEXIDADE: COMPLEXO+
├─ N1 = OBRIGATÓRIO (100%)
├─ N2 = OBRIGATÓRIO (100%)
└─ N3 = OBRIGATÓRIO (100%)

TIPO: Sistema de Gestão (E-commerce + Admin)
├─ Segurança: CRÍTICA (dados financeiros, pessoais)
├─ Auth: CRÍTICA (4 roles, RBAC)
├─ Performance: IMPORTANTE (UX do PDV)
└─ Testing: CRÍTICO (múltiplos fluxos)
```

### 5.2 Trade-offs Aceitos

| Trade-off | Razão | Mitigação |
|-----------|-------|-----------|
| CMS adiado | Custo | Planilha temporária |
| App mobile | Complexidade | PWA (web mobile) |
| Pagamento online | Integração complexa | Cash/PIX only na v1 |
| Dark mode | Prioridade baixa | v2 |

### 5.3 Precedência Aplicada

```
Pilar 1 (Segurança) > Pilar 1 (Auth) > Pilar 3 (Engenharia) > Pilar 2 (Qualidade) > Pilar 5 (UX)
```

### 5.4 Matriz RACI Simplificada

| Tarefa | Admin | Gerente | Vendedor | Cliente |
|--------|-------|---------|----------|---------|
| CRUD Usuários | A/R | C | I | I |
| Gerenciar Produtos | A | R | C | I |
| Criar Promoções | A | R | I | I |
| Realizar Vendas | I | I | R | C |
| Comprar Online | I | I | I | R |
| Ver Relatórios | R | C | I | I |

R = Responsible, A = Accountable, C = Consulted, I = Informed

---

## 6. MATURIDADE DO SISTEMA

| Nível | Status | Descrição |
|-------|--------|-----------|
| N1 | ✅ ESTRUTURADO | 6 pilares aplicados |
| N2 | ✅ DOCUMENTADO | 4 roles, stack, arquitetura |
| N3 | 🔄 PLANEJADO | 7 sprints definidos |

---

## 7. ANÁLISE DE RISCOS

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Integração Supabase falha | Baixa | Alto | Fallback SQLite local |
| Escopo crescente | Alta | Alto | Escopo locked em sprints |
| Performance PDV lenta | Média | Alto | Lazy loading + caching |
| Segurança JWT | Média | Crítico | Auditoria + PenTest |
| Dívida técnica | Alta | Médio | Sprint de refatoração |

---

## 8. PRÓXIMOS PASSOS

1. **Aprovar planejamento** ← (VOCÊ ESTÁ AQUI)
2. **Validar stack** — confirmar Supabase + Next.js
3. **Detalhar N2** — criar ADR para decisões técnicas
4. **Iniciar Sprint 1** — setup do projeto
5. **Revisões contínuas** — ao final de cada sprint

---

## 9. MVP vs v2

### MVP (Este planejamento)
- Sistema web completo com 4 roles
- E-commerce básico
- PDV para vendedores
- Programa de fidelidade
- Dashboard administrativo

### v2 (Futuro)
- App mobile (React Native)
- Pagamento online (MercadoPago)
- Delivery tracking
- Multi-idioma
- Dark mode

---

*Documento gerado seguindo aiRules-devRules v5.0.0*
