# Contexto da Sessão — Sorveteria Arthies

## Data: 16/04/2026

---

## Projeto

**Nome:** Sorveteria Arthies  
**Stack:** Next.js 14 + Supabase + Vercel  
**Repo:** github.com/luisoneves/sorveteria-arthies

---

## Ambientes Supabase

| Ambiente | Projeto ID | URL |
|----------|------------|-----|
| BUILD (DEV) | `funyxwrzebcexrlsmvqn` | https://funyxwrzebcexrlsmvqn.supabase.co |
| PROD | `vejseyijdkwpxkblmokr` | https://vejseyijdkwpxkblmokr.supabase.co |

---

## Usuários Criados (Auth)

| Email | Senha | Role |
|-------|------|------|
| admin@arthies.com | F6AAPURZ | admin |
| gerente@arthies.com | F6AAPURZ | gerente |
| vendedor1@arthies.com | F6AAPURZ | vendedor |
| vendedor2@arthies.com | F6AAPURZ | vendedor |
| cliente1@arthies.com | F6AAPURZ | cliente |
| cliente2@arthies.com | F6AAPURZ | cliente |
| cliente3@arthies.com | F6AAPURZ | cliente |

---

## O que foi feito

### Database
- Schema criado com todas as tabelas (usuarios, produtos, pedidos, etc)
- Seed populado com 7 usuários, 21 produtos, 5 fornecedores
- RLS políticas criadas
- search_path corrigido em funções

### Supabase Linter
- ✅ RLS habilitado (BUILD)
- ✅ search_path fix (BUILD + PROD)
- ⚠️ Leaked password protection (precisa Pro plan)

### Vercel
- Deploy para Production
- Variáveis configuradas

### Telemetria
- Scripts de análise disponíveis em `FlowAgent.io/knowledge/self-hosted-telemetry.md`

---

## Credenciais

Arquivo: `~/Documentos/sorveteria-arthies-credenciais/README.md`

---

## Links Úteis

- **App:** https://sorveteria-arthies.vercel.app
- **Supabase BUILD:** https://dashboard.supabase.com/project/funyxwrzebcexrlsmvqn
- **Supabase PROD:** https://dashboard.supabase.com/project/vejseyijdkwpxkblmokr

---

## Checkpoint Atual

- Login funciona (API retorna token)
- Rate limiting ativo (aguardar se many attempts)
- Deploy OK

---

## Próximos Passos Possíveis

1. Configurar VARIABLE no Vercel para PROD
2. Testar login no frontend
3. Adicionar mais dados ao seed
4. Configurar CI/CD com Supabase

---

## Anotações do Framework

Conhecimento adicionado ao `monarca-ai-framework`:
- `disciplines/supabase.md`
- `disciplines/self-hosted-nano.md`
- `disciplines/observability.md` (nano stack)
- `disciplines/performance.md` (DB queries)
- `disciplines/securitylaws.md` (Leis 25-28)
- `knowledge/self-hosted-telemetry.md`
- `knowledge/security/runbooks/supabase-errors.md`
- `templates/cicd-supabase.yml`
- `core/skill-matrix.md` (novo domínio DB)
- `workflow/task-clarity-gate.md` (DB checkpoint)