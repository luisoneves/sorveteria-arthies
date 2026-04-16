-- ========================================
-- HABILITAR RLS E POLÍTICAS DE SEGURANÇA
-- ========================================
-- Execute após popular o banco

-- ========================================
-- USUÁRIOS
-- ========================================
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários são públicos para leitura"
ON usuarios FOR SELECT
USING (true);

CREATE POLICY "Admin pode inserir usuários"
ON usuarios FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admin pode atualizar usuários"
ON usuarios FOR UPDATE
USING (true);

CREATE POLICY "Admin pode deletar usuários"
ON usuarios FOR DELETE
USING (true);

-- ========================================
-- FORNECEDORES
-- ========================================
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fornecedores são públicos"
ON fornecedores FOR SELECT
USING (true);

CREATE POLICY "Gerente pode gerenciar fornecedores"
ON fornecedores FOR ALL
USING (true);

-- ========================================
-- PRODUTOS
-- ========================================
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Produtos ativos são públicos"
ON produtos FOR SELECT
USING (ativo = true AND deleted_at IS NULL);

CREATE POLICY "Gerente pode gerenciar produtos"
ON produtos FOR ALL
USING (true);

-- ========================================
-- PEDIDOS
-- ========================================
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clientes veem seus pedidos"
ON pedidos FOR SELECT
USING (
  cliente_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'gerente', 'vendedor')
  )
);

CREATE POLICY "Vendedores podem criar pedidos"
ON pedidos FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'gerente', 'vendedor')
  )
);

CREATE POLICY "Gerentes podem atualizar pedidos"
ON pedidos FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'gerente')
  )
);

-- ========================================
-- ITENS PEDIDO
-- ========================================
ALTER TABLE itens_pedido ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Itens são públicos"
ON itens_pedido FOR SELECT
USING (true);

CREATE POLICY "Vendedores podem gerenciar itens"
ON itens_pedido FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'gerente', 'vendedor')
  )
);

-- ========================================
-- TRANSAÇÕES PONTOS
-- ========================================
ALTER TABLE transacoes_pontos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clientes veem suas transações"
ON transacoes_pontos FOR SELECT
USING (
  cliente_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'gerente')
  )
);

CREATE POLICY "Sistema gerencia transações"
ON transacoes_pontos FOR ALL
USING (true);

-- ========================================
-- COMPRAS
-- ========================================
ALTER TABLE compras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Compras são públicas"
ON compras FOR SELECT
USING (true);

CREATE POLICY "Gerente gerencia compras"
ON compras FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'gerente')
  )
);

-- ========================================
-- ITENS COMPRA
-- ========================================
ALTER TABLE itens_compra ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Itens de compra são públicos"
ON itens_compra FOR SELECT
USING (true);

CREATE POLICY "Gerente gerencia itens de compra"
ON itens_compra FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'gerente')
  )
);

-- ========================================
-- REPOSIÇÕES
-- ========================================
ALTER TABLE reposicoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reposiçoes são públicas"
ON reposicoes FOR SELECT
USING (true);

CREATE POLICY "Gerente gerencia reposiçoes"
ON reposicoes FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'gerente')
  )
);

-- ========================================
-- ITENS REPOSIÇÃO
-- ========================================
ALTER TABLE itens_reposicao ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Itens de reposição são públicos"
ON itens_reposicao FOR SELECT
USING (true);

CREATE POLICY "Gerente gerencia itens de reposição"
ON itens_reposicao FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'gerente')
  )
);

-- ========================================
-- VERIFICAR
-- ========================================
SELECT 
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
