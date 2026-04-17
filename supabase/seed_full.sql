-- ========================================
-- POPULAR BANCO DE DADOS - SORVETERIA ARTHIES
-- Adaptado para schema existente
-- Executar no Supabase SQL Editor
-- ========================================

-- ========================================
-- LIMPEZA - Primeiro remove dados existentes
-- ========================================
DELETE FROM transacoes_pontos;
DELETE FROM itens_pedido;
DELETE FROM pedidos;
DELETE FROM itens_compra;
DELETE FROM compras;
DELETE FROM fornecedores;
DELETE FROM produtos;
DELETE FROM usuarios;

-- ========================================
-- DATA BASE: 1 ano e 3 meses atrás
-- ========================================
DO $$
DECLARE
    base_date TIMESTAMP := NOW() - INTERVAL '1 year 3 months';
    random_days INTEGER;
    random_hours INTEGER;
    sale_date TIMESTAMP;
BEGIN

-- ========================================
-- USUÁRIOS (gerar IDs automaticamente)
-- ========================================
INSERT INTO usuarios (email, nome, telefone, role, pontos, ativo, created_at) VALUES
('admin@arthies.com', 'Administrador Principal', '11999990001', 'admin', 0, true, base_date),
('gerente@arthies.com', 'Gerente de Loja', '11999990002', 'gerente', 0, true, base_date),
('vendedor1@arthies.com', 'Vendedor João', '11999990003', 'vendedor', 150, true, base_date + INTERVAL '1 month'),
('vendedor2@arthies.com', 'Vendedor Maria', '11999990004', 'vendedor', 230, true, base_date + INTERVAL '2 months'),
('cliente1@arthies.com', 'Cliente Paulo', '11999990005', 'cliente', 500, true, base_date + INTERVAL '3 months'),
('cliente2@arthies.com', 'Cliente Ana', '11999990006', 'cliente', 320, true, base_date + INTERVAL '4 months'),
('cliente3@arthies.com', 'Cliente Carlos', '11999990007', 'cliente', 180, true, base_date + INTERVAL '5 months');

-- ========================================
-- FORNECEDORES (gerar IDs automaticamente)
-- ========================================
INSERT INTO fornecedores (nome, contato, telefone, email, ativo, created_at) VALUES
('Sorvetes Premium LTDA', 'Contato Principal', '1133334444', 'contato@sorvetespremium.com.br', true, base_date),
('Emulsificantes Brasil', 'Vendas', '1133335555', 'vendas@emulsificantes.com.br', true, base_date),
('Cones e Embalagens SP', 'Compras', '1133336666', 'compras@conesp.com.br', true, base_date),
('Frutas Congeladas do Vale', 'Frutas', '1133337777', 'frutas@frutascongeladas.com.br', true, base_date),
('Chocolate Belga Importado', 'Chocolate', '1133338888', 'chocolate@belgaimport.com.br', true, base_date);

-- ========================================
-- 60 PRODUTOS ATIVOS (gerar IDs automaticamente)
-- ========================================
INSERT INTO produtos (nome, descricao, preco, preco_original, categoria, ativo, estoque, created_at) VALUES
-- CREMOSOS (20)
('Ninho com Nutella', 'Sorvete de leite em pó Ninho com calda de Nutella', 18.90, null, 'cremoso', true, 45, base_date),
('Morango com Chantilly', 'Sorvete de morango artesanal coberto com chantilly', 15.90, null, 'cremoso', true, 38, base_date),
('Chocolate Belga', 'Sorvete de chocolate belga 70% cacau', 22.90, null, 'cremoso', true, 30, base_date),
('Limão Siciliano', 'Sorvete refrescante de limão siciliano natural', 14.90, null, 'sorbet', true, 42, base_date),
('Creme com Amendoim', 'Sorvete de creme com pedacinhos de amendoim', 16.90, null, 'cremoso', true, 35, base_date),
('Manga com Maracujá', 'Sorvete tropical de manga e maracujá', 15.90, null, 'sorbet', true, 40, base_date),
('Baunilha com Caramelo', 'Sorvete clássico de baunilha com calda de caramelo', 17.90, null, 'cremoso', true, 33, base_date),
('Café com Avelã', 'Sorvete de café expresso com pasta de avelã', 19.90, null, 'cremoso', true, 28, base_date),
('Coco Ralado', 'Sorvete de coco natural com coco ralado', 14.90, null, 'cremoso', true, 37, base_date),
('Pistache', 'Sorvete premium de pistache siciliano', 24.90, null, 'cremoso', true, 22, base_date),
('Açaí com Banana', 'Sorvete de açaí natural com banana', 18.90, null, 'sorbet', true, 50, base_date),
('Red Velvet', 'Sorvete de red velvet com cream cheese', 21.90, null, 'cremoso', true, 25, base_date),
('Doce de Leite', 'Sorvete de doce de leite argentino', 17.90, null, 'cremoso', true, 32, base_date),
('Maracujá', 'Sorvete de maracujá natural', 13.90, null, 'sorbet', true, 48, base_date),
('Rum com Passas', 'Sorvete de rum com passas (adulto)', 23.90, null, 'cremoso', true, 20, base_date),
('Gengibre com Mel', 'Sorvete picante-doce de gengibre e mel', 16.90, null, 'cremoso', true, 30, base_date),
('Tamarindo', 'Sorvete azedo-docinho de tamarindo', 14.90, null, 'sorbet', true, 35, base_date),
('Flocos', 'Sorvete de flocos brasileiro', 12.90, null, 'cremoso', true, 55, base_date),
('Ovomaltine', 'Sorvete de Ovomaltine com cobertura', 18.90, null, 'cremoso', true, 40, base_date),
('Nata com Morango', 'Sorvete de nata com morangos frescos', 17.90, null, 'cremoso', true, 38, base_date),

-- ESPECIAIS (10)
('Casquinha Simples', 'Casquinha tradicional de waffle', 6.90, null, 'especial', true, 100, base_date),
('Casquinha de Chocolate', 'Casquinha de waffle com cobertura de chocolate', 8.90, null, 'especial', true, 85, base_date),
('Casquinha de Morango', 'Casquinha de waffle com calda de morango', 8.90, null, 'especial', true, 80, base_date),
('Casquinha Gigante', 'Casquinha grande para compartilhar', 12.90, null, 'especial', true, 60, base_date),
('Cesta de Waffle', 'Waffle quente com sorvete e frutas', 24.90, null, 'especial', true, 30, base_date),
('Barquinha', 'Barco comestível de chocolate', 7.90, null, 'especial', true, 70, base_date),
('Tigela de Sorvete', 'Sorvete na tigela com caldas', 19.90, null, 'especial', true, 45, base_date),
('Banana Split', 'Banana com 3 bolas de sorvete', 29.90, null, 'especial', true, 25, base_date),
('Sundae', 'Sorvete com calda, chantilly e castanha', 22.90, null, 'especial', true, 35, base_date),
('Milk Shake', 'Milk shake cremoso de diversos sabores', 16.90, null, 'especial', true, 50, base_date),

-- ACOMPANHAMENTOS (10)
('Cobertura de Chocolate', 'Calda de chocolate belga', 3.90, null, 'acompanhamento', true, 200, base_date),
('Cobertura de Morango', 'Calda natural de morango', 3.90, null, 'acompanhamento', true, 180, base_date),
('Cobertura de Caramelo', 'Calda de caramelo salgado', 4.90, null, 'acompanhamento', true, 150, base_date),
('Chantilly', 'Creme de chantilly fresco', 3.50, null, 'acompanhamento', true, 200, base_date),
('Granulado', 'Granulado colorido', 2.50, null, 'acompanhamento', true, 250, base_date),
('Castanha de Caju', 'Castanha torrada moída', 4.50, null, 'acompanhamento', true, 120, base_date),
('Confete Colorido', 'Confete doce colorido', 2.50, null, 'acompanhamento', true, 200, base_date),
('Leite Condensado', 'Calda de leite condensado', 3.90, null, 'acompanhamento', true, 150, base_date),
('Farofa de Biscoito', 'Farofa crocante de biscoito', 3.50, null, 'acompanhamento', true, 130, base_date),
('Morango Fresco', 'Morangos fatiados', 5.90, null, 'acompanhamento', true, 80, base_date),

-- BEBIDAS (10)
('Água Mineral', 'Água mineral 500ml', 3.90, null, 'bebida', true, 100, base_date),
('Suco de Laranja', 'Suco natural 300ml', 8.90, null, 'bebida', true, 60, base_date),
('Suco de Limonada', 'Limonada suíça 300ml', 7.90, null, 'bebida', true, 55, base_date),
('Refrigerante Lata', 'Coca-Cola, Guaraná ou Fanta 350ml', 5.90, null, 'bebida', true, 80, base_date),
('Chá Gelado', 'Chá helado de pêssego ou limão', 6.90, null, 'bebida', true, 45, base_date),
('Água de Coco', 'Água de coco natural 300ml', 7.90, null, 'bebida', true, 40, base_date),
('Milkshake Variado', 'Milkshake de ovomaltine, morango ou chocolate', 14.90, null, 'bebida', true, 50, base_date),
('Café Expresso', 'Café espresso italiano', 5.90, null, 'bebida', true, 70, base_date),
('Cappuccino', 'Cappuccino com cobertura', 9.90, null, 'bebida', true, 45, base_date),
('Smoothie de Frutas', 'Smoothie natural de frutas', 12.90, null, 'bebida', true, 35, base_date),

-- SOBREMESAS (10)
('Petit Gateau', 'Bolinho de chocolate com sorvete', 32.90, null, 'especial', true, 20, base_date),
('Torta Gelada', 'Fatia de torta gelada variados sabores', 18.90, null, 'especial', true, 25, base_date),
('Brownie com Sorvete', 'Brownie quentinho com bola de sorvete', 24.90, null, 'especial', true, 30, base_date),
('Churros Recheado', 'Churros crocante com recheio e calda', 14.90, null, 'especial', true, 40, base_date),
('Pavê de Sorvete', 'Pavê gelado de sorvete', 22.90, null, 'especial', true, 15, base_date),
('Bolo de Pote', 'Bolo no pote com sorvete e cobertura', 12.90, null, 'especial', true, 35, base_date),
('Croccante de Sorvete', 'Sorvete crocante de wafer', 16.90, null, 'especial', true, 45, base_date),
('Sanduíche de Sorvete', 'Pão de ló com sorvete no meio', 18.90, null, 'especial', true, 30, base_date),
('Açaí na Tigela', 'Açaí cremoso com complementos', 26.90, null, 'especial', true, 40, base_date),
('Fondue de Sorvete', 'Fondue de chocolate com frutas e sorvete', 45.90, null, 'especial', true, 12, base_date);

-- ========================================
-- 40 PRODUTOS INATIVOS (SOFT DELETE)
-- ========================================
INSERT INTO produtos (id, nome, descricao, preco, preco_original, categoria, ativo, estoque, deleted_at, created_at) VALUES
('p061-0000-0000-0000-000000000061', 'Sorvete de Wasabi', 'Sorvete experimental de wasabi', 25.90, null, 'cremoso', false, 0, base_date + INTERVAL '10 months', base_date),
('p062-0000-0000-0000-000000000062', 'Sorvete de Bacon', 'Sorvete salgado-doce de bacon', 28.90, null, 'cremoso', false, 0, base_date + INTERVAL '9 months', base_date),
('p063-0000-0000-0000-000000000063', 'Pizza de Sorvete', 'Pizza doce de sorvete', 35.90, null, 'especial', false, 0, base_date + INTERVAL '8 months', base_date),
('p064-0000-0000-0000-000000000064', 'Sorvete de Caviar', 'Sorvete premium com caviar', 89.90, null, 'cremoso', false, 0, base_date + INTERVAL '7 months', base_date),
('p065-0000-0000-0000-000000000065', 'Ice Pop Floral', 'Picolé de flores comestíveis', 19.90, null, 'sorbet', false, 0, base_date + INTERVAL '6 months', base_date),
('p066-0000-0000-0000-000000000066', 'Sorvete de Aipo', 'Sorvete saudável de aipo', 16.90, null, 'cremoso', false, 0, base_date + INTERVAL '5 months', base_date),
('p067-0000-0000-0000-000000000067', 'Churros Gelado', 'Churros recheado com sorvete', 15.90, null, 'especial', false, 0, base_date + INTERVAL '11 months', base_date),
('p068-0000-0000-0000-000000000068', 'Waffle de Ferrero', 'Waffle com Nutella e avelã', 28.90, null, 'especial', false, 0, base_date + INTERVAL '4 months', base_date),
('p069-0000-0000-0000-000000000069', 'Cookie Dough', 'Massa de cookie com sorvete', 22.90, null, 'cremoso', false, 0, base_date + INTERVAL '3 months', base_date),
('p070-0000-0000-0000-000000000070', 'Copo da Felicidade', 'Sorvete no copo com muita cobertura', 18.90, null, 'especial', false, 0, base_date + INTERVAL '2 months', base_date),
('p071-0000-0000-0000-000000000071', 'Açaí Proteico', 'Açaí com whey protein', 29.90, null, 'sorbet', false, 0, base_date + INTERVAL '9 months', base_date),
('p072-0000-0000-0000-000000000072', 'Picolé de Iogurte', 'Picolé saudável de iogurte', 8.90, null, 'bebida', false, 0, base_date + INTERVAL '6 months', base_date),
('p073-0000-0000-0000-000000000073', 'Frappe de Café', 'Café gelado batidocreamy', 12.90, null, 'bebida', false, 0, base_date + INTERVAL '8 months', base_date),
('p074-0000-0000-0000-000000000074', 'Sorbet de Champagne', 'Sorbet com champagne', 45.90, null, 'sorbet', false, 0, base_date + INTERVAL '10 months', base_date),
('p075-0000-0000-0000-000000000075', 'Gelato Italiano', 'Gelato artesanal italiano', 19.90, null, 'cremoso', false, 0, base_date + INTERVAL '5 months', base_date),
('p076-0000-0000-0000-000000000076', 'Frozen Yoghurt', 'Iogurte gelado natural', 14.90, null, 'cremoso', false, 0, base_date + INTERVAL '4 months', base_date),
('p077-0000-0000-0000-000000000077', 'Caldoca', 'Caldo de cana gelado', 6.90, null, 'bebida', false, 0, base_date + INTERVAL '7 months', base_date),
('p078-0000-0000-0000-000000000078', 'Tapioca Gelada', 'Tapioca com sorvete', 16.90, null, 'especial', false, 0, base_date + INTERVAL '3 months', base_date),
('p079-0000-0000-0000-000000000079', 'Mousse de Sorvete', 'Mousse gelado de sorvete', 17.90, null, 'cremoso', false, 0, base_date + INTERVAL '2 months', base_date),
('p080-0000-0000-0000-000000000080', 'Açaí Energy', 'Açaí com guaraná e energéticas', 28.90, null, 'sorbet', false, 0, base_date + INTERVAL '6 months', base_date);

-- ========================================
-- PEDIDOS (vendas de 1 ano e 3 meses)
-- ========================================
INSERT INTO pedidos (id, cliente_id, vendedor_id, status, status_pagamento, tipo, valor_total, pontos_usados, pontos_ganhos, idade_grupo, sexo, created_at) VALUES
-- Mês 1 (15 vendas)
('ped-001', '55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 45.70, 0, 45, 'adulto', 'M', base_date + INTERVAL '1 month' + INTERVAL '2 days'),
('ped-002', '66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 32.50, 0, 32, 'adulto', 'F', base_date + INTERVAL '1 month' + INTERVAL '3 days'),
('ped-003', '77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'delivery', 78.90, 0, 78, 'idoso', 'M', base_date + INTERVAL '1 month' + INTERVAL '5 days'),
('ped-004', NULL, '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 15.90, 0, 15, 'crianca', 'M', base_date + INTERVAL '1 month' + INTERVAL '7 days'),
('ped-005', '55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'balcao', 89.60, 0, 89, 'adulto', 'M', base_date + INTERVAL '1 month' + INTERVAL '10 days'),
('ped-006', '66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'online', 156.40, 0, 156, 'adulto', 'F', base_date + INTERVAL '1 month' + INTERVAL '12 days'),
('ped-007', NULL, '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'balcao', 22.90, 0, 22, 'idoso', 'F', base_date + INTERVAL '1 month' + INTERVAL '14 days'),
('ped-008', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'delivery', 67.30, 0, 67, 'idoso', 'M', base_date + INTERVAL '1 month' + INTERVAL '16 days'),
('ped-009', '55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 34.80, 0, 34, 'adulto', 'M', base_date + INTERVAL '1 month' + INTERVAL '18 days'),
('ped-010', NULL, '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'balcao', 8.90, 0, 8, 'crianca', 'F', base_date + INTERVAL '1 month' + INTERVAL '20 days'),
('ped-011', '66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 54.20, 0, 54, 'adulto', 'F', base_date + INTERVAL '1 month' + INTERVAL '22 days'),
('ped-012', '77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'online', 123.50, 0, 123, 'idoso', 'M', base_date + INTERVAL '1 month' + INTERVAL '24 days'),
('ped-013', '55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'delivery', 89.90, 0, 89, 'adulto', 'M', base_date + INTERVAL '1 month' + INTERVAL '26 days'),
('ped-014', NULL, '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'balcao', 18.90, 0, 18, 'crianca', 'M', base_date + INTERVAL '1 month' + INTERVAL '28 days'),
('ped-015', '66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 42.30, 0, 42, 'adulto', 'F', base_date + INTERVAL '2 months'),
('ped-016', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 56.70, 0, 56, 'idoso', 'M', base_date + INTERVAL '2 months' + INTERVAL '2 days'),
('ped-017', '55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'online', 234.80, 0, 234, 'adulto', 'M', base_date + INTERVAL '2 months' + INTERVAL '5 days'),
('ped-018', NULL, '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 12.90, 0, 12, 'crianca', 'F', base_date + INTERVAL '2 months' + INTERVAL '8 days'),
('ped-019', '66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'delivery', 98.40, 0, 98, 'adulto', 'F', base_date + INTERVAL '2 months' + INTERVAL '10 days'),
('ped-020', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 38.60, 0, 38, 'idoso', 'M', base_date + INTERVAL '2 months' + INTERVAL '12 days'),
-- Mês 3-12 (mais 10 vendas)
('ped-021', '55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 67.80, 0, 67, 'adulto', 'M', base_date + INTERVAL '3 months'),
('ped-022', '66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'online', 145.60, 0, 145, 'adulto', 'F', base_date + INTERVAL '4 months'),
('ped-023', NULL, '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 24.90, 0, 24, 'crianca', 'M', base_date + INTERVAL '5 months'),
('ped-024', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'delivery', 112.30, 0, 112, 'idoso', 'M', base_date + INTERVAL '6 months'),
('ped-025', '55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'balcao', 78.90, 0, 78, 'adulto', 'M', base_date + INTERVAL '7 months'),
('ped-026', '66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'online', 189.40, 0, 189, 'adulto', 'F', base_date + INTERVAL '8 months'),
('ped-027', NULL, '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'balcao', 16.90, 0, 16, 'crianca', 'F', base_date + INTERVAL '9 months'),
('ped-028', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'balcao', 45.60, 0, 45, 'idoso', 'M', base_date + INTERVAL '10 months'),
('ped-029', '55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'concluido', 'pago', 'delivery', 134.70, 0, 134, 'adulto', 'M', base_date + INTERVAL '11 months'),
('ped-030', '66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'concluido', 'pago', 'balcao', 89.20, 0, 89, 'adulto', 'F', base_date + INTERVAL '12 months');

-- ========================================
-- 4 VENDAS CANCELADAS
-- ========================================
INSERT INTO pedidos (id, cliente_id, vendedor_id, status, status_pagamento, tipo, valor_total, pontos_usados, pontos_ganhos, idade_grupo, sexo, created_at, canceled_at) VALUES
('ped-can-001', '55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'cancelado', 'falhou', 'balcao', 67.80, 0, 0, 'adulto', 'M', base_date + INTERVAL '2 months' + INTERVAL '15 days', base_date + INTERVAL '2 months' + INTERVAL '15 days' + INTERVAL '30 minutes'),
('ped-can-002', '66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'cancelado', 'falhou', 'delivery', 123.50, 0, 0, 'adulto', 'F', base_date + INTERVAL '4 months' + INTERVAL '8 days', base_date + INTERVAL '4 months' + INTERVAL '8 days' + INTERVAL '1 hour'),
('ped-can-003', '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'cancelado', 'falhou', 'online', 189.40, 0, 0, 'idoso', 'M', base_date + INTERVAL '6 months' + INTERVAL '20 days', base_date + INTERVAL '6 months' + INTERVAL '20 days' + INTERVAL '45 minutes'),
('ped-can-004', '55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'cancelado', 'falhou', 'balcao', 78.90, 0, 0, 'adulto', 'M', base_date + INTERVAL '8 months' + INTERVAL '3 days', base_date + INTERVAL '8 months' + INTERVAL '3 days' + INTERVAL '20 minutes');

-- ========================================
-- ITENS DOS PEDIDOS
-- ========================================
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario, subtotal) VALUES
-- Pedido 1
('ped-001', 'p001-0000-0000-0000-000000000001', 2, 18.90, 37.80),
('ped-001', 'p031-0000-0000-0000-000000000031', 2, 3.90, 7.80),
-- Pedido 2
('ped-002', 'p002-0000-0000-0000-000000000002', 1, 15.90, 15.90),
('ped-002', 'p021-0000-0000-0000-000000000021', 2, 6.90, 13.80),
-- Pedido 3
('ped-003', 'p010-0000-0000-0000-000000000010', 2, 24.90, 49.80),
('ped-003', 'p051-0000-0000-0000-000000000051', 1, 32.90, 32.90),
-- Pedido 4
('ped-004', 'p018-0000-0000-0000-000000000018', 1, 12.90, 12.90),
-- Pedido 5
('ped-005', 'p003-0000-0000-0000-000000000003', 2, 22.90, 45.80),
('ped-005', 'p028-0000-0000-0000-000000000028', 1, 29.90, 29.90),
('ped-005', 'p033-0000-0000-0000-000000000033', 1, 4.50, 4.50),
('ped-005', 'p040-0000-0000-0000-000000000040', 1, 5.90, 5.90),
-- Pedido 6
('ped-006', 'p059-0000-0000-0000-000000000059', 4, 26.90, 107.60),
('ped-006', 'p047-0000-0000-0000-000000000047', 2, 14.90, 29.80),
('ped-006', 'p034-0000-0000-0000-000000000034', 2, 3.50, 7.00),
('ped-006', 'p035-0000-0000-0000-000000000035', 1, 2.50, 2.50),
-- Pedido 7
('ped-007', 'p052-0000-0000-0000-000000000052', 1, 18.90, 18.90),
-- Pedido 8
('ped-008', 'p053-0000-0000-0000-000000000053', 2, 24.90, 49.80),
('ped-008', 'p049-0000-0000-0000-000000000049', 2, 9.90, 19.80),
-- Pedido 9
('ped-009', 'p006-0000-0000-0000-000000000006', 2, 15.90, 31.80),
-- Pedido 10
('ped-010', 'p021-0000-0000-0000-000000000021', 1, 6.90, 6.90),
-- Pedido 11
('ped-011', 'p005-0000-0000-0000-000000000005', 2, 16.90, 33.80),
('ped-011', 'p036-0000-0000-0000-000000000036', 2, 4.50, 9.00),
('ped-011', 'p039-0000-0000-0000-000000000039', 1, 3.50, 3.50),
-- Pedido 12
('ped-012', 'p054-0000-0000-0000-000000000054', 4, 14.90, 59.60),
('ped-012', 'p050-0000-0000-0000-000000000050', 4, 12.90, 51.60),
-- Pedido 13
('ped-013', 'p011-0000-0000-0000-000000000011', 3, 18.90, 56.70),
('ped-013', 'p055-0000-0000-0000-000000000055', 1, 22.90, 22.90),
('ped-013', 'p041-0000-0000-0000-000000000041', 1, 3.90, 3.90),
-- Pedido 14
('ped-014', 'p024-0000-0000-0000-000000000024', 1, 12.90, 12.90),
-- Pedido 15
('ped-015', 'p007-0000-0000-0000-000000000007', 2, 17.90, 35.80),
-- Pedido 16
('ped-016', 'p013-0000-0000-0000-000000000013', 2, 17.90, 35.80),
('ped-016', 'p056-0000-0000-0000-000000000056', 1, 12.90, 12.90),
-- Pedido 17
('ped-017', 'p060-0000-0000-0000-000000000060', 2, 45.90, 91.80),
('ped-017', 'p025-0000-0000-0000-000000000025', 4, 24.90, 99.60),
('ped-017', 'p038-0000-0000-0000-000000000038', 2, 3.90, 7.80),
('ped-017', 'p034-0000-0000-0000-000000000034', 4, 3.50, 14.00),
('ped-017', 'p035-0000-0000-0000-000000000035', 4, 2.50, 10.00),
-- Pedido 18
('ped-018', 'p021-0000-0000-0000-000000000021', 1, 6.90, 6.90),
-- Pedido 19
('ped-019', 'p029-0000-0000-0000-000000000029', 3, 22.90, 68.70),
('ped-019', 'p048-0000-0000-0000-000000000048', 3, 5.90, 17.70),
-- Pedido 20
('ped-020', 'p008-0000-0000-0000-000000000008', 2, 19.90, 39.80),
-- Pedidos 21-30
('ped-021', 'p001-0000-0000-0000-000000000001', 3, 18.90, 56.70),
('ped-022', 'p059-0000-0000-0000-000000000059', 5, 26.90, 134.50),
('ped-023', 'p018-0000-0000-0000-000000000018', 2, 12.90, 25.80),
('ped-024', 'p051-0000-0000-0000-000000000051', 3, 32.90, 98.70),
('ped-025', 'p003-0000-0000-0000-000000000003', 3, 22.90, 68.70),
('ped-026', 'p060-0000-0000-0000-000000000060', 4, 45.90, 183.60),
('ped-027', 'p021-0000-0000-0000-000000000021', 2, 6.90, 13.80),
('ped-028', 'p005-0000-0000-0000-000000000005', 2, 16.90, 33.80),
('ped-029', 'p053-0000-0000-0000-000000000053', 4, 24.90, 99.60),
('ped-030', 'p028-0000-0000-0000-000000000028', 2, 29.90, 59.80),
-- Itens das vendas canceladas
('ped-can-001', 'p001-0000-0000-0000-000000000001', 3, 18.90, 56.70),
('ped-can-001', 'p033-0000-0000-0000-000000000033', 2, 4.50, 9.00),
('ped-can-002', 'p010-0000-0000-0000-000000000010', 4, 24.90, 99.60),
('ped-can-002', 'p051-0000-0000-0000-000000000051', 1, 32.90, 32.90),
('ped-can-003', 'p060-0000-0000-0000-000000000060', 4, 45.90, 183.60),
('ped-can-004', 'p003-0000-0000-0000-000000000003', 3, 22.90, 68.70),
('ped-can-004', 'p059-0000-0000-0000-000000000059', 1, 26.90, 26.90);

-- ========================================
-- TRANSAÇÕES DE PONTOS
-- ========================================
INSERT INTO transacoes_pontos (id, cliente_id, tipo, valor, pontos, descricao, created_at) VALUES
('tp-001', '55555555-5555-5555-5555-555555555555', 'credito', 45.70, 45, 'Pontos do pedido ped-001', base_date + INTERVAL '1 month' + INTERVAL '2 days'),
('tp-002', '66666666-6666-6666-6666-666666666666', 'credito', 32.50, 32, 'Pontos do pedido ped-002', base_date + INTERVAL '1 month' + INTERVAL '3 days'),
('tp-003', '77777777-7777-7777-7777-777777777777', 'credito', 78.90, 78, 'Pontos do pedido ped-003', base_date + INTERVAL '1 month' + INTERVAL '5 days'),
('tp-004', '55555555-5555-5555-5555-555555555555', 'credito', 89.60, 89, 'Pontos do pedido ped-005', base_date + INTERVAL '1 month' + INTERVAL '10 days'),
('tp-005', '66666666-6666-6666-6666-666666666666', 'credito', 156.40, 156, 'Pontos do pedido ped-006', base_date + INTERVAL '1 month' + INTERVAL '12 days'),
('tp-006', '77777777-7777-7777-7777-777777777777', 'credito', 67.30, 67, 'Pontos do pedido ped-008', base_date + INTERVAL '1 month' + INTERVAL '16 days'),
('tp-007', '55555555-5555-5555-5555-555555555555', 'credito', 89.90, 89, 'Pontos do pedido ped-013', base_date + INTERVAL '1 month' + INTERVAL '26 days'),
('tp-008', '55555555-5555-5555-5555-555555555555', 'debito', 50.00, 500, 'Resgate de prêmio', base_date + INTERVAL '2 months'),
('tp-009', '77777777-7777-7777-7777-777777777777', 'credito', 123.50, 123, 'Pontos do pedido ped-012', base_date + INTERVAL '1 month' + INTERVAL '24 days'),
('tp-010', '66666666-6666-6666-6666-666666666666', 'credito', 98.40, 98, 'Pontos do pedido ped-019', base_date + INTERVAL '2 months' + INTERVAL '10 days'),
('tp-011', '55555555-5555-5555-5555-555555555555', 'credito', 234.80, 234, 'Pontos do pedido ped-017', base_date + INTERVAL '2 months' + INTERVAL '5 days'),
('tp-012', '66666666-6666-6666-6666-666666666666', 'debito', 30.00, 300, 'Resgate de desconto', base_date + INTERVAL '3 months'),
('tp-013', '77777777-7777-7777-7777-777777777777', 'credito', 45.60, 45, 'Pontos do pedido ped-028', base_date + INTERVAL '10 months'),
('tp-014', '55555555-5555-5555-5555-555555555555', 'credito', 134.70, 134, 'Pontos do pedido ped-029', base_date + INTERVAL '11 months');

-- ========================================
-- COMPRAS (fornecedores)
-- ========================================
INSERT INTO compras (id, fornecedor_id, usuario_id, status, valor_total, created_at) VALUES
('comp-001', 'f001-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'recebido', 2500.00, base_date + INTERVAL '1 month' + INTERVAL '5 days'),
('comp-002', 'f004-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'recebido', 1800.00, base_date + INTERVAL '1 month' + INTERVAL '15 days'),
('comp-003', 'f005-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', 'recebido', 3200.00, base_date + INTERVAL '2 months'),
('comp-004', 'f003-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'recebido', 950.00, base_date + INTERVAL '2 months' + INTERVAL '10 days'),
('comp-005', 'f001-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'recebido', 2800.00, base_date + INTERVAL '3 months'),
('comp-006', 'f002-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'recebido', 1200.00, base_date + INTERVAL '4 months'),
('comp-007', 'f004-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'pendente', 2100.00, base_date + INTERVAL '4 months' + INTERVAL '15 days');

-- ========================================
-- ITENS DAS COMPRAS (schema não tem produto_id, usa produto_nome)
-- ========================================
INSERT INTO itens_compra (compra_id, produto_nome, quantidade, preco_unitario, subtotal) VALUES
('comp-001', 'Ninho com Nutella', 100, 12.00, 1200.00),
('comp-001', 'Morango com Chantilly', 80, 10.00, 800.00),
('comp-001', 'Chocolate Belga', 50, 10.00, 500.00),
('comp-002', 'Limão Siciliano', 100, 8.00, 800.00),
('comp-002', 'Manga com Maracujá', 80, 7.50, 600.00),
('comp-002', 'Coco Ralado', 60, 6.67, 400.00),
('comp-003', 'Chocolate Belga', 100, 16.00, 1600.00),
('comp-003', 'Café com Avelã', 80, 12.00, 960.00),
('comp-003', 'Pistache', 40, 16.00, 640.00),
('comp-004', 'Casquinha Simples', 200, 2.50, 500.00),
('comp-004', 'Barquinha', 150, 3.00, 450.00),
('comp-005', 'Creme com Amendoim', 100, 10.00, 1000.00),
('comp-005', 'Baunilha com Caramelo', 100, 10.00, 1000.00),
('comp-005', 'Doce de Leite', 80, 10.00, 800.00),
('comp-006', 'Cobertura de Chocolate', 300, 2.00, 600.00),
('comp-006', 'Cobertura de Morango', 300, 2.00, 600.00),
('comp-007', 'Água Mineral', 200, 5.00, 1000.00),
('comp-007', 'Refrigerante Lata', 200, 5.50, 1100.00);

END $$;

-- ========================================
-- VERIFICAR RESULTADO
-- ========================================
SELECT 
    'Usuários' as tabela,
    COUNT(*) as total 
FROM usuarios
UNION ALL
SELECT 
    'Produtos Ativos' as tabela,
    COUNT(*) as total 
FROM produtos WHERE ativo = true AND deleted_at IS NULL
UNION ALL
SELECT 
    'Produtos Inativos' as tabela,
    COUNT(*) as total 
FROM produtos WHERE ativo = false AND deleted_at IS NOT NULL
UNION ALL
SELECT 
    'Pedidos Concluídos' as tabela,
    COUNT(*) as total 
FROM pedidos WHERE status = 'concluido'
UNION ALL
SELECT 
    'Pedidos Cancelados' as tabela,
    COUNT(*) as total 
FROM pedidos WHERE status = 'cancelado'
UNION ALL
SELECT 
    'Itens de Pedido' as tabela,
    COUNT(*) as total 
FROM itens_pedido
UNION ALL
SELECT 
    'Transações de Pontos' as tabela,
    COUNT(*) as total 
FROM transacoes_pontos;