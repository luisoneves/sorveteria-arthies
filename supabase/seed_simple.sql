-- ========================================
-- SEED SIMPLES - SORVETERIA ARTHIES
-- Execute no Supabase SQL Editor
-- ========================================

-- Limpar dados existentes
DELETE FROM transacoes_pontos;
DELETE FROM itens_pedido;
DELETE FROM pedidos;
DELETE FROM itens_compra;
DELETE FROM compras;
DELETE FROM fornecedores;
DELETE FROM produtos;
DELETE FROM usuarios;

-- Inserir usuários (sem ID manual - gera automático)
INSERT INTO usuarios (email, nome, telefone, role, pontos, ativo) VALUES
('admin@arthies.com', 'Admin Arthies', '11999990001', 'admin', 0, true),
('gerente@arthies.com', 'Gerente Silva', '11999990002', 'gerente', 0, true),
('vendedor1@arthies.com', 'Vendedor João', '11999990003', 'vendedor', 150, true),
('vendedor2@arthies.com', 'Vendedor Maria', '11999990004', 'vendedor', 230, true),
('cliente1@arthies.com', 'Cliente Paulo', '11999990005', 'cliente', 500, true),
('cliente2@arthies.com', 'Cliente Ana', '11999990006', 'cliente', 320, true),
('cliente3@arthies.com', 'Cliente Carlos', '11999990007', 'cliente', 180, true);

-- Inserir fornecedores (sem ID manual)
INSERT INTO fornecedores (nome, contato, telefone, email, ativo) VALUES
('Sorvetes Premium LTDA', 'Contato Principal', '1133334444', 'contato@sorvetespremium.com.br', true),
('Emulsificantes Brasil', 'Vendas', '1133335555', 'vendas@emulsificantes.com.br', true),
('Cones e Embalagens SP', 'Compras', '1133336666', 'compras@conesp.com.br', true),
('Frutas Congeladas do Vale', 'Frutas', '1133337777', 'frutas@frutascongeladas.com.br', true),
('Chocolate Belga Importado', 'Chocolate', '1133338888', 'chocolate@belgaimport.com.br', true);

-- Inserir produtos (sem ID manual)
INSERT INTO produtos (nome, descricao, preco, preco_original, categoria, ativo, estoque) VALUES
-- Cremosos
('Ninho com Nutella', 'Sorvete de leite em pó Ninho com calda de Nutella', 18.90, null, 'cremoso', true, 45),
('Morango com Chantilly', 'Sorvete de morango artesanal', 15.90, null, 'cremoso', true, 38),
('Chocolate Belga', 'Sorvete de chocolate belga 70% cacau', 22.90, null, 'cremoso', true, 30),
('Pistache', 'Sorvete premium de pistache siciliano', 24.90, null, 'cremoso', true, 22),
('Doce de Leite', 'Sorvete de doce de leite argentino', 17.90, null, 'cremoso', true, 32),
-- Sorbets
('Limão Siciliano', 'Sorvete refrescante de limão siciliano', 14.90, null, 'sorbet', true, 42),
('Manga', 'Sorvete de manga tropical', 15.90, null, 'sorbet', true, 40),
('Maracujá', 'Sorvete de maracujá natural', 13.90, null, 'sorbet', true, 48),
('Açaí', 'Sorvete de açaí natural', 18.90, null, 'sorbet', true, 50),
-- Especiais
('Casquinha Simples', 'Casquinha tradicional de waffle', 6.90, null, 'especial', true, 100),
('Banana Split', 'Banana com 3 bolas de sorvete', 29.90, null, 'especial', true, 25),
('Petit Gateau', 'Bolinho de chocolate com sorvete', 32.90, null, 'especial', true, 20),
('Milk Shake', 'Milk shake cremoso', 16.90, null, 'especial', true, 50),
('Açaí na Tigela', 'Açaí cremoso com complementos', 26.90, null, 'especial', true, 40),
-- Bebidas
('Água Mineral', 'Água mineral 500ml', 3.90, null, 'bebida', true, 100),
('Suco de Laranja', 'Suco natural 300ml', 8.90, null, 'bebida', true, 60),
('Café Expresso', 'Café espresso italiano', 5.90, null, 'bebida', true, 70),
('Milkshake', 'Milkshake variados', 14.90, null, 'bebida', true, 50),
-- Acompanhamentos
('Cobertura de Chocolate', 'Calda de chocolate', 3.90, null, 'acompanhamento', true, 200),
('Chantilly', 'Creme de chantilly', 3.50, null, 'acompanhamento', true, 200),
('Granulado', 'Granulado colorido', 2.50, null, 'acompanhamento', true, 250);

-- Resultado
SELECT 
    'Usuários' as tabela,
    COUNT(*) as total 
FROM usuarios
UNION ALL
SELECT 
    'Produtos' as tabela,
    COUNT(*) as total 
FROM produtos WHERE ativo = true
UNION ALL
SELECT 
    'Fornecedores' as tabela,
    COUNT(*) as total 
FROM fornecedores;