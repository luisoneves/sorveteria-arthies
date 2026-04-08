# 🗄️ Setup Supabase - Guia Rápido

## 1. Criar Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha:
   - **Name:** `sorveteria-arthies`
   - **Database Password:** (gerar uma forte)
   - **Region:** Escolha a mais próxima (ex: `São Paulo`)
4. Clique em "Create new project"
5. Aguarde ~2 minutos para criar

## 2. Obter Credenciais

1. Vá em **Settings > API**
2. Copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **IMPORTANTE:** A `service_role` key dá acesso total ao banco. **NUNCA** exponha no frontend!

## 3. Rodar Migration

1. Vá em **SQL Editor**
2. Clique em **New Query**
3. Cole o conteúdo de `supabase/migrations/001_initial_schema.sql`
4. Clique em **Run**

Você verá:
- ✅ Tables criadas
- ✅ Indexes criados
- ✅ Functions criadas
- ✅ Dados de exemplo inseridos

## 4. Configurar Auth (Opcional)

1. Vá em **Authentication > Settings**
2. Configure:
   - **Site URL:** URL de produção (ex: `https://sorveteria-arthies.vercel.app`)
   - **Redirect URLs:** Adicione a URL de produção
3. Salve

## 5. Habilitar Email Auth

1. Vá em **Authentication > Providers**
2. Clique em **Email**
3. Habilite "Enable Email provider"
4. Desabilite "Confirm email" (para MVP)

## 6. Criar Admin Inicial

No SQL Editor, execute:

```sql
-- Criar admin (troque o email e senha)
INSERT INTO auth.users (email, encrypted_password)
VALUES ('admin@arthies.com', auth.crypto.gen_salt());

-- Vincular à tabela usuarios
INSERT INTO public.usuarios (id, email, nome, role, ativo)
SELECT 
  id, 
  email, 
  'Administrador', 
  'admin', 
  true 
FROM auth.users 
WHERE email = 'admin@arthies.com';
```

## Resumo das Env Vars

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
