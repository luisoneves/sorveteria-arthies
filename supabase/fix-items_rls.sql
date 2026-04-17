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