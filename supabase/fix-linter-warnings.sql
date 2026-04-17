-- ========================================
-- FIX Supabase Linter Warnings
-- ========================================

-- ========================================
-- 1. Enable RLS on itens_pedido (if not enabled)
-- ========================================
ALTER TABLE itens_pedido ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Itens_pedido podem ser visualizados' AND tablename = 'itens_pedido'
  ) THEN
    CREATE POLICY "Itens_pedido podem ser visualizados" ON itens_pedido
      FOR SELECT USING (true);
  END IF;
END $$;

-- ========================================
-- 2. Fix search_path on functions (use SET instead of DROP/CREATE)
-- ========================================
ALTER FUNCTION usar_pontos SET search_path = 'public';
ALTER FUNCTION adicionar_pontos SET search_path = 'public';
ALTER FUNCTION update_updated_at_column SET search_path = 'public';

-- ========================================
-- 3. Fix INSERT policy on transacoes_pontos (idempotent)
-- ========================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Sistema insere transacoes_pontos' AND tablename = 'transacoes_pontos') THEN
    DROP POLICY IF EXISTS "Sistema insere transacoes_pontos" ON transacoes_pontos;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Sistema e Admin inserem transacoes_pontos' AND tablename = 'transacoes_pontos') THEN
    CREATE POLICY "Sistema e Admin inserem transacoes_pontos" ON transacoes_pontos
      FOR INSERT WITH CHECK (
        auth.uid() IN (SELECT id FROM usuarios WHERE role IN ('admin', 'gerente'))
        OR EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid())
      );
  END IF;
END $$;