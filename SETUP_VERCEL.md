# 🚀 Setup Vercel - Guia Rápido

## 1. Criar Conta

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Use sua conta GitHub
4. Autorize o acesso

## 2. Importar Projeto

1. Clique em "Add New > Project"
2. Selecione `sorveteria-arthies` da lista
3. Clique "Import"

## 3. Configurar Projeto

1. **Framework Preset:** Next.js (detecta automaticamente)
2. **Root Directory:** `./` (já está correto)
3. **Build Command:** `npm run build` (já está configurado)
4. **Environment Variables:** Adicionar:

Clique em "Environment Variables" e adicione:

| Name | Value | Environments |
|------|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` | Production, Preview, Development |

⚠️ **Importante:** `SUPABASE_SERVICE_ROLE_KEY` só deve estar em **Production** e **Development**

## 4. Deploy

1. Clique "Deploy"
2. Aguarde ~2-3 minutos
3. Receba a URL: `https://sorveteria-arthies.vercel.app`

## 5. Configurar Domínio (Opcional)

1. Vá em Settings > Domains
2. Adicione: `sorveteria.arthies.com` (exemplo)
3. Configure DNS conforme instruções

## 6. Obter Token para GitHub Actions

1. Vá em [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Clique "Create Token"
3. **Name:** `GitHub Actions`
4. **Scope:** Full Account
5. Copie o token gerado

## 7. Adicionar Secrets no GitHub

1. Vá em: `github.com/sorveteria-arthies > Settings > Secrets and variables > Actions`
2. Clique "New repository secret"

| Secret | Value |
|--------|-------|
| `VERCEL_TOKEN` | Token gerado no passo 6 |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key do Supabase |

## Resultado

Após configurar os secrets, todo push na main fará:
1. ✅ Lint
2. ✅ Testes
3. ✅ Build
4. ✅ Deploy automático!

URL de produção: `https://sorveteria-arthies.vercel.app`
