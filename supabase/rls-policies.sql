-- ========================================
-- POLÍTICAS RLS - Sorveteria Arthies
-- Executar no Supabase SQL Editor
-- ========================================

-- ========================================
-- FORNECEDORES (todas as roles podem ler, só admin/escrita)
-- ========================================
CREATE POLICY "Fornecedores podem ser visualizados" ON fornecedores
  FOR SELECT USING (true);

CREATE POLICY "Admin e Gerente podem gerenciar fornecedores" ON fornecedores
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente'))
  );

-- ========================================
-- COMPRAS (todas as roles podem ler, só admin/escrita)
-- ========================================
CREATE POLICY "Compras podem ser visualizadas" ON compras
  FOR SELECT USING (true);

CREATE POLICY "Admin e Gerente podem gerenciar compras" ON compras
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente'))
  );

-- ========================================
-- ITENS_COMPRA (protegido pela tabela pai)
-- ========================================
CREATE POLICY "Itens_compra podem ser visualizados" ON itens_compra
  FOR SELECT USING (true);

CREATE POLICY "Admin e Gerente podem gerenciar itens_compra" ON itens_compra
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente'))
  );

-- ========================================
-- PEDIDOS (cliente vê os seus, vendedor/admin vê todos)
-- ========================================
CREATE POLICY "Pedidos podem ser visualizados" ON pedidos
  FOR SELECT USING (
    -- Cliente vê seus próprios pedidos
    cliente_id = auth.uid()
    OR 
    -- Vendedor/gerente/admin vê todos
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente', 'vendedor'))
  );

CREATE POLICY "Pedidos podem ser criados por clientes autenticados" ON pedidos
  FOR INSERT WITH CHECK (cliente_id = auth.uid() OR auth.uid() IN (SELECT id FROM usuarios WHERE role IN ('vendedor', 'admin', 'gerente')));

CREATE POLICY "Admin e Gerente podem atualizar pedidos" ON pedidos
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente'))
  );

-- ========================================
-- ITENS_PEDIDO (protegido pela tabela pai)
-- ========================================
CREATE POLICY "Itens_pedido podem ser visualizados" ON itens_pedido
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM pedidos WHERE pedidos.id = itens_pedido.pedido_id 
      AND (pedidos.cliente_id = auth.uid() OR EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente', 'vendedor'))))
  );

-- ========================================
-- REPOSIÇÕES (só gerente/admin)
-- ========================================
CREATE POLICY "Reposicoes podem ser visualizadas" ON reposicoes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente', 'vendedor'))
  );

CREATE POLICY "Gerente e Admin gerenciam reposicoes" ON reposicoes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente'))
  );

-- ========================================
-- ITENS_REPOSICAO (protegido pela tabela pai)
-- ========================================
CREATE POLICY "Itens_reposicao podem ser visualizados" ON itens_reposicao
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente', 'vendedor'))
  );

CREATE POLICY "Gerente e Admin gerenciam itens_reposicao" ON itens_reposicao
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente'))
  );

-- ========================================
-- PROMOCOES (todos podem ler, só admin/gerente escreve)
-- ========================================
CREATE POLICY "Promocoes podem ser visualizadas" ON promocoes
  FOR SELECT USING (true);

CREATE POLICY "Admin e Gerente gerenciam promocoes" ON promocoes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente'))
  );

-- ========================================
-- TRANSACOES_PONTOS (cliente vê as suas, admin/gerente vê todos)
-- ========================================
CREATE POLICY "Transacoes_pontos podem ser visualizadas" ON transacoes_pontos
  FOR SELECT USING (
    cliente_id = auth.uid()
    OR
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente'))
  );

CREATE POLICY "Sistema insere transacoes_pontos" ON transacoes_pontos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin e Gerente gerenciam transacoes_pontos" ON transacoes_pontos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE usuarios.id = auth.uid() AND usuarios.role IN ('admin', 'gerente'))
  );

-- ========================================
-- VERIFICAR POLÍTICAS CRIADAS
-- ========================================
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;