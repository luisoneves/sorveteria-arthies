<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
<!-- VERCEL BEST PRACTICES END -->

---

## Stack Rules

### Supabase
- **NUNCA** expor `service_role_key` no frontend
- Usar `anon_key` para operações client-side
- RLS (Row Level Security) é **OBRIGATÓRIO** em todas as tabelas
- Validar permissões server-side (middleware.ts já faz RBAC)

### Auth
- JWT via cookies httpOnly (não localStorage)
-RBAC implementado no middleware.ts
- 4 roles: admin, gerente, vendedor, cliente

### API Routes
- **SEMPRE** validar inputs com Zod
- **NUNCA** confiar em dados do client
- Retornar erros estruturados: `{ error: string, code?: string }`

---

## Skill Matrix (P2)

Para este projeto (P2 = Startup/SaaS), aplicar:

| Entrega | UI | A11Y | SEC | PERF | SEO | TEST | OBS |
|---------|-----|------|-----|------|-----|------|-----|
| Botão/Link | L2 | L2 | L1 | L1 | - | L1 | - |
| Form | L2 | L2 | L2 | - | - | L2 | L1 |
| Page | L2 | L2 | L1 | L2 | L2 | L1 | - |
| API | - | - | L2 | L1 | - | L2 | L2 |

---

## Mandatory Coverage

### Formulário
- [ ] Zod validation (client + server)
- [ ] Sanitização de inputs
- [ ] CSRF protection (Supabase handles)
- [ ] Error handling estruturado

### API Route
- [ ] Input validation (Zod)
- [ ] Auth check (session + role)
- [ ] Rate limiting (se público)
- [ ] Logging de erros

### Componente UI
- [ ] Props tipadas com TypeScript
- [ ] Error boundary se aplicável
- [ ] Loading state se async

---

## Criticality Mapping

| Situação | Classificação | PS |
|----------|---------------|-----|
| Secret exposto | DANGER-S | 10 |
| Sem validation em API pública | DANGER-S | 10 |
| RLS ausente em tabela | DANGER-A | 8 |
| Sem testes no fluxo crítico | WARNING-S | 6 |
| Build quebrado | DANGER-S | 10 |

---

## Gating Flow

Antes de executar qualquer tarefa:

1. **READY-7** → score ≥ 6
2. **Skill Matrix lookup** → quais domínios aplicar
3. **Mandatory Coverage** → checklist por tipo
4. **Pillar Triage** → validação cross-pilar

---

## Documentação

| O que | Onde |
|-------|------|
| Nova feature | README.md |
| Decisão arquitetural | docs/adr/ |
| Contexto do projeto | .Contexto/contexto.md |
| Regras gerais | AGENTS.md (este arquivo) |

---

## Variáveis de Ambiente

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...  # server-only, NUNCA expor
```
