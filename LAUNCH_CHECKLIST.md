# 🎯 CHECKLIST DE LANÇAMENTO

## 1. Repositório Git

- [ ] Criar repositório no GitHub: `sorveteria-arthies`
- [ ] Conectar repositório local ao GitHub
- [ ] Fazer primeiro push

```bash
git init
git add .
git commit -m "feat: sistema completo sorveteria arthies"
git remote add origin git@github.com:sorveteria-arthies.git
git push -u origin main
```

## 2. Supabase (Banco de Dados)

- [ ] Criar projeto em [supabase.com](https://supabase.com)
- [ ] Copiar Project URL
- [ ] Copiar anon/public key das settings
- [ ] Copiar service_role key (só server-side!)
- [ ] Rodar migration SQL no SQL Editor

```sql
-- Execute o conteúdo de:
-- supabase/migrations/001_initial_schema.sql
```

## 3. Vercel (Deploy)

- [ ] Criar conta em [vercel.com](https://vercel.com)
- [ ] Importar repositório GitHub
- [ ] Adicionar Environment Variables:

| Name | Value |
|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` (anon key) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (service_role key) |

- [ ] Fazer deploy

## 4. GitHub Secrets (CI/CD)

- [ ] Gerar Token Vercel em: [vercel.com/account/tokens](https://vercel.com/account/tokens)
- [ ] Adicionar secrets no GitHub:

| Secret | Value |
|--------|-------|
| `VERCEL_TOKEN` | Seu token da Vercel |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key do Supabase |

## 5. Testes Finais

- [ ] Testar login (todos os 4 roles)
- [ ] Testar PDV
- [ ] Testar carrinho
- [ ] Testar pontos/fidelidade
- [ ] Testar mobile (responsivo)

## 6. Treinamento

- [ ] Documentar login para cada role
- [ ] Criar tutorial rápido para vendedores
- [ ] Criar tutorial para clientes

## 7. Go Live! 🎉

- [ ] Testar URL de produção
- [ ] Compartilhar com equipe
- [ ] Monitorar erros (Sentry - futuro)

---

## DADOS NECESSÁRIOS (Preencher depois)

Quando estiver pronto para o deploy, precisarei de:

```
1. NEXT_PUBLIC_SUPABASE_URL = https://xxxx.supabase.co
2. NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
3. SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...
4. VERCEL_TOKEN = seu_token_vercel
```

Você pode me passar esses dados quando tiver pronto!
