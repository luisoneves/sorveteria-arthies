-- ========================================
-- SEED: Usuários de Teste
-- Sorveteria Arthies
-- ========================================
-- Execute via: supabase db push
-- ou: psql -h <host> -U postgres -d postgres -f seed.sql
-- ========================================

-- Limpar usuários existentes (opcional)
-- DELETE FROM usuarios WHERE email LIKE '%@arthies.com';

-- Inserir usuários de teste (senhas gerenciadas pelo Supabase Auth)
INSERT INTO usuarios (email, nome, role, pontos, telefone, ativo) VALUES
('admin@arthies.com', 'Admin Arthies', 'admin', 0, '11999999999', true),
('gerente@arthies.com', 'Gerente Silva', 'gerente', 0, '11988888888', true),
('vendedor@arthies.com', 'Vendedor João', 'vendedor', 0, '11977777777', true),
('cliente@arthies.com', 'Cliente Maria', 'cliente', 100, '11966666666', true)
ON CONFLICT (email) DO NOTHING;

-- Observações:
-- 1. As senhas são definidas via Supabase Auth (não via SQL)
-- 2. Para criar senha: usar interface "Esqueci minha senha" ou painel Supabase
-- 3. Alternativa: usar Supabase CLI: supabase auth sign-up --email admin@arthies.com --password 123456
