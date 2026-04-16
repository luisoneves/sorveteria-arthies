-- ========================================
-- POPULAR BANCO DE DADOS - SORVETERIA ARTHIES
-- Execute via: supabase db query --linked --file scripts/popular-banco.sql
-- ========================================

-- ========================================
-- LIMPEZA (opcional - descomente se quiser resetar)
-- ========================================
-- DELETE FROM transacoes_pontos;
-- DELETE FROM itens_pedido;
-- DELETE FROM pedidos;
-- DELETE FROM itens_compra;
-- DELETE FROM compras;
-- DELETE FROM fornecedores;
-- DELETE FROM produtos WHERE deleted_at IS NOT NULL;
-- DELETE FROM usuarios;

-- ========================================
-- USUARIOS (7)
-- ========================================
INSERT INTO usuarios (id, email, nome, telefone, role, pontos, ativo, created_at) VALUES
(gen_random_uuid(), 'admin@arthies.com', 'Administrador Principal', '11999990001', 'admin', 0, true, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'gerente@arthies.com', 'Gerente de Loja', '11999990002', 'gerente', 0, true, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'vendedor1@arthies.com', 'Vendedor Joao', '11999990003', 'vendedor', 150, true, NOW() - INTERVAL '1 year 2 months'),
(gen_random_uuid(), 'vendedor2@arthies.com', 'Vendedora Maria', '11999990004', 'vendedor', 230, true, NOW() - INTERVAL '1 year 1 month'),
(gen_random_uuid(), 'cliente1@arthies.com', 'Cliente Paulo', '11999990005', 'cliente', 500, true, NOW() - INTERVAL '1 year'),
(gen_random_uuid(), 'cliente2@arthies.com', 'Cliente Ana', '11999990006', 'cliente', 320, true, NOW() - INTERVAL '11 months'),
(gen_random_uuid(), 'cliente3@arthies.com', 'Cliente Carlos', '11999990007', 'cliente', 180, true, NOW() - INTERVAL '10 months');

-- ========================================
-- FORNECEDORES (5)
-- ========================================
INSERT INTO fornecedores (id, nome, contato, telefone, email, ativo, created_at) VALUES
(gen_random_uuid(), 'Sorvetes Premium LTDA', 'João Silva', '1133334444', 'contato@sorvetespremium.com.br', true, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Emulsificantes Brasil', 'Maria Santos', '1133335555', 'vendas@emulsificantes.com.br', true, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Cones e Embalagens SP', 'Carlos Oliveira', '1133336666', 'compras@conesp.com.br', true, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Frutas Congeladas do Vale', 'Ana Costa', '1133337777', 'frutas@frutascongeladas.com.br', true, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Chocolate Belga Importado', 'Pedro Souza', '1133338888', 'chocolate@belgaimport.com.br', true, NOW() - INTERVAL '1 year 3 months');

-- ========================================
-- 60 PRODUTOS ATIVOS
-- ========================================
INSERT INTO produtos (id, nome, descricao, preco, categoria, ativo, estoque, created_at) VALUES
(gen_random_uuid(), 'Ninho com Nutella', 'Sorvete de leite em po Ninho com calda de Nutella', 18.90, 'cremoso', true, 45, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Morango com Chantilly', 'Sorvete de morango artesanal coberto com chantilly', 15.90, 'cremoso', true, 38, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Chocolate Belga', 'Sorvete de chocolate belga 70 por cento cacau', 22.90, 'cremoso', true, 30, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Limao Siciliano', 'Sorvete refrescante de limao siciliano natural', 14.90, 'sorbet', true, 42, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Creme com Amendoim', 'Sorvete de creme com pedacinhos de amendoim', 16.90, 'cremoso', true, 35, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Manga com Maracuja', 'Sorvete tropical de manga e maracuja', 15.90, 'sorbet', true, 40, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Baunilha com Caramelo', 'Sorvete classico de baunilha com calda de caramelo', 17.90, 'cremoso', true, 33, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Cafe com Avela', 'Sorvete de cafe expresso com pasta de avela', 19.90, 'cremoso', true, 28, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Coco Ralado', 'Sorvete de coco natural com coco ralado', 14.90, 'sorbet', true, 37, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Pistache', 'Sorvete premium de pistache siciliano', 24.90, 'cremoso', true, 22, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Acai com Banana', 'Sorvete de acai natural com banana', 18.90, 'sorbet', true, 50, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Red Velvet', 'Sorvete de red velvet com cream cheese', 21.90, 'cremoso', true, 25, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Doce de Leite', 'Sorvete de doce de leite argentino', 17.90, 'cremoso', true, 32, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Maracuja', 'Sorvete de maracuja natural', 13.90, 'sorbet', true, 48, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Rum com Passas', 'Sorvete de rum com passas adulto', 23.90, 'cremoso', true, 20, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Gengibre com Mel', 'Sorvete picante-doce de gengibre e mel', 16.90, 'sorbet', true, 30, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Tamarindo', 'Sorvete azedo-docinho de tamarindo', 14.90, 'sorbet', true, 35, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Flocos', 'Sorvete de flocos brasileiro', 12.90, 'cremoso', true, 55, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Ovomaltine', 'Sorvete de Ovomaltine com cobertura', 18.90, 'cremoso', true, 40, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Nata com Morango', 'Sorvete de nata com morangos frescos', 17.90, 'cremoso', true, 38, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Cobertura de Chocolate', 'Calda de chocolate belga', 3.90, 'acompanhamento', true, 200, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Cobertura de Morango', 'Calda natural de morango', 3.90, 'acompanhamento', true, 180, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Cobertura de Caramelo', 'Calda de caramelo salgado', 4.90, 'acompanhamento', true, 150, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Chantilly', 'Creme de chantilly fresco', 3.50, 'acompanhamento', true, 200, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Granulado', 'Granulado colorido', 2.50, 'acompanhamento', true, 250, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Castanha de Caju', 'Castanha torrada moida', 4.50, 'acompanhamento', true, 120, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Confete Colorido', 'Confete doce colorido', 2.50, 'acompanhamento', true, 200, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Leite Condensado', 'Calda de leite condensado', 3.90, 'acompanhamento', true, 150, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Farofa de Biscoito', 'Farofa crocante de biscoito', 3.50, 'acompanhamento', true, 130, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Morango Fresco', 'Morangos fatiados', 5.90, 'acompanhamento', true, 80, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Agua Mineral', 'Agua mineral 500ml', 3.90, 'bebida', true, 100, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Suco de Laranja', 'Suco natural 300ml', 8.90, 'bebida', true, 60, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Suco de Limonada', 'Limonada suica 300ml', 7.90, 'bebida', true, 55, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Refrigerante Lata', 'Coca-Cola, Guara ou Fanta 350ml', 5.90, 'bebida', true, 80, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Cha Gelado', 'Cha helado de pessego ou limao', 6.90, 'bebida', true, 45, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Agua de Coco', 'Agua de coco natural 300ml', 7.90, 'bebida', true, 40, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Milkshake Variado', 'Milkshake de ovomaltine, morango ou chocolate', 14.90, 'bebida', true, 50, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Cafe Expresso', 'Cafe espresso italiano', 5.90, 'bebida', true, 70, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Cappuccino', 'Cappuccino com cobertura', 9.90, 'bebida', true, 45, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Smoothie de Frutas', 'Smoothie natural de frutas', 12.90, 'bebida', true, 35, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Petit Gateau', 'Bolinho de chocolate com sorvete', 32.90, 'especial', true, 20, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Torta Gelada', 'Fatia de torta gelada variados sabores', 18.90, 'especial', true, 25, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Brownie com Sorvete', 'Brownie quentinho com bola de sorvete', 24.90, 'especial', true, 30, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Churros Recheado', 'Churros crocante com recheio e calda', 14.90, 'especial', true, 40, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Pave de Sorvete', 'Pave gelado de sorvete', 22.90, 'especial', true, 15, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Bolo de Pote', 'Bolo no pote com sorvete e cobertura', 12.90, 'especial', true, 35, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Croccante de Sorvete', 'Sorvete crocante de wafer', 16.90, 'especial', true, 45, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Sanduiche de Sorvete', 'Pao de lo com sorvete no meio', 18.90, 'especial', true, 30, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Acai na Tigela', 'Acai cremoso com complementos', 26.90, 'especial', true, 40, NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Fondue de Sorvete', 'Fondue de chocolate com frutas e sorvete', 45.90, 'especial', true, 12, NOW() - INTERVAL '1 year 3 months');

-- ========================================
-- 10 PRODUTOS INATIVOS (SOFT DELETE)
-- ========================================
INSERT INTO produtos (id, nome, descricao, preco, categoria, ativo, estoque, deleted_at, created_at) VALUES
(gen_random_uuid(), 'Sorvete de Wasabi', 'Sorvete experimental de wasabi', 25.90, 'cremoso', false, 0, NOW() - INTERVAL '5 months', NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Sorvete de Bacon', 'Sorvete salgado-doce de bacon', 28.90, 'cremoso', false, 0, NOW() - INTERVAL '6 months', NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Pizza de Sorvete', 'Pizza doce de sorvete', 35.90, 'cremoso', false, 0, NOW() - INTERVAL '7 months', NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Sorvete de Caviar', 'Sorvete premium com caviar', 89.90, 'cremoso', false, 0, NOW() - INTERVAL '8 months', NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Ice Pop Floral', 'Picole de flores comestiveis', 19.90, 'sorbet', false, 0, NOW() - INTERVAL '9 months', NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Sorvete de Aipo', 'Sorvete saudavel de aipo', 16.90, 'sorbet', false, 0, NOW() - INTERVAL '4 months', NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Churros Gelado', 'Churros recheado com sorvete', 15.90, 'especial', false, 0, NOW() - INTERVAL '10 months', NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Waffle de Ferrero', 'Waffle com Nutella e avela', 28.90, 'especial', false, 0, NOW() - INTERVAL '3 months', NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Cookie Dough', 'Massa de cookie com sorvete', 22.90, 'cremoso', false, 0, NOW() - INTERVAL '2 months', NOW() - INTERVAL '1 year 3 months'),
(gen_random_uuid(), 'Copo da Felicidade', 'Sorvete no copo com muita cobertura', 18.90, 'especial', false, 0, NOW() - INTERVAL '1 month', NOW() - INTERVAL '1 year 3 months');

-- ========================================
-- PEDIDOS CONCLUIDOS (30)
-- ========================================
INSERT INTO pedidos (id, cliente_id, vendedor_id, status, tipo, valor_total, pontos_ganhos, idade_grupo, sexo, created_at) VALUES
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente1@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 45.70, 45, 'adulto', 'M', NOW() - INTERVAL '1 year 2 months'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente2@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 32.50, 32, 'adulto', 'F', NOW() - INTERVAL '1 year 2 months' + INTERVAL '2 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente3@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'delivery', 78.90, 78, 'idoso', 'M', NOW() - INTERVAL '1 year 2 months' + INTERVAL '4 days'),
(gen_random_uuid(), NULL, (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 15.90, 15, 'crianca', 'M', NOW() - INTERVAL '1 year 2 months' + INTERVAL '6 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente1@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'balcao', 89.60, 89, 'adulto', 'M', NOW() - INTERVAL '1 year 2 months' + INTERVAL '8 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente2@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'online', 156.40, 156, 'adulto', 'F', NOW() - INTERVAL '1 year 2 months' + INTERVAL '10 days'),
(gen_random_uuid(), NULL, (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'balcao', 22.90, 22, 'idoso', 'F', NOW() - INTERVAL '1 year 2 months' + INTERVAL '12 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente3@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'delivery', 67.30, 67, 'idoso', 'M', NOW() - INTERVAL '1 year 2 months' + INTERVAL '14 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente1@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 34.80, 34, 'adulto', 'M', NOW() - INTERVAL '1 year 1 month'),
(gen_random_uuid(), NULL, (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'balcao', 8.90, 8, 'crianca', 'F', NOW() - INTERVAL '1 year 1 month' + INTERVAL '2 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente2@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 54.20, 54, 'adulto', 'F', NOW() - INTERVAL '1 year 1 month' + INTERVAL '5 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente3@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'online', 123.50, 123, 'idoso', 'M', NOW() - INTERVAL '1 year 1 month' + INTERVAL '8 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente1@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'delivery', 89.90, 89, 'adulto', 'M', NOW() - INTERVAL '1 year'),
(gen_random_uuid(), NULL, (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'balcao', 18.90, 18, 'crianca', 'M', NOW() - INTERVAL '11 months'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente2@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 42.30, 42, 'adulto', 'F', NOW() - INTERVAL '10 months'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente3@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 56.70, 56, 'idoso', 'M', NOW() - INTERVAL '9 months'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente1@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'online', 234.80, 234, 'adulto', 'M', NOW() - INTERVAL '8 months'),
(gen_random_uuid(), NULL, (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 12.90, 12, 'crianca', 'F', NOW() - INTERVAL '7 months'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente2@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'delivery', 98.40, 98, 'adulto', 'F', NOW() - INTERVAL '6 months'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente3@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 38.60, 38, 'idoso', 'M', NOW() - INTERVAL '5 months'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente1@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 67.80, 67, 'adulto', 'M', NOW() - INTERVAL '4 months'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente2@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'online', 145.60, 145, 'adulto', 'F', NOW() - INTERVAL '3 months'),
(gen_random_uuid(), NULL, (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 24.90, 24, 'crianca', 'M', NOW() - INTERVAL '2 months'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente3@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'delivery', 112.30, 112, 'idoso', 'M', NOW() - INTERVAL '1 month'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente1@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'balcao', 78.90, 78, 'adulto', 'M', NOW() - INTERVAL '15 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente2@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'online', 189.40, 189, 'adulto', 'F', NOW() - INTERVAL '10 days'),
(gen_random_uuid(), NULL, (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'balcao', 16.90, 16, 'crianca', 'F', NOW() - INTERVAL '5 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente3@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'balcao', 45.60, 45, 'idoso', 'M', NOW() - INTERVAL '3 days'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente1@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'concluido', 'delivery', 134.70, 134, 'adulto', 'M', NOW() - INTERVAL '1 day'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente2@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'concluido', 'balcao', 89.20, 89, 'adulto', 'F', NOW());

-- ========================================
-- 4 PEDIDOS CANCELADOS
-- ========================================
INSERT INTO pedidos (id, cliente_id, vendedor_id, status, tipo, valor_total, pontos_ganhos, idade_grupo, sexo, created_at, canceled_at) VALUES
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente1@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'cancelado', 'balcao', 67.80, 0, 'adulto', 'M', NOW() - INTERVAL '9 months', NOW() - INTERVAL '9 months' + INTERVAL '30 minutes'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente2@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'cancelado', 'delivery', 123.50, 0, 'adulto', 'F', NOW() - INTERVAL '6 months', NOW() - INTERVAL '6 months' + INTERVAL '1 hour'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente3@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor1@arthies.com'), 'cancelado', 'online', 189.40, 0, 'idoso', 'M', NOW() - INTERVAL '4 months', NOW() - INTERVAL '4 months' + INTERVAL '45 minutes'),
(gen_random_uuid(), (SELECT id FROM usuarios WHERE email = 'cliente1@arthies.com'), (SELECT id FROM usuarios WHERE email = 'vendedor2@arthies.com'), 'cancelado', 'balcao', 78.90, 0, 'adulto', 'M', NOW() - INTERVAL '2 months', NOW() - INTERVAL '2 months' + INTERVAL '20 minutes');

-- ========================================
-- VERIFICAR RESULTADO
-- ========================================
SELECT 'Usuarios' as tabela, COUNT(*) as total FROM usuarios
UNION ALL
SELECT 'Produtos Ativos' as tabela, COUNT(*) as total FROM produtos WHERE ativo = true AND deleted_at IS NULL
UNION ALL
SELECT 'Produtos Inativos' as tabela, COUNT(*) as total FROM produtos WHERE ativo = false AND deleted_at IS NOT NULL
UNION ALL
SELECT 'Fornecedores' as tabela, COUNT(*) as total FROM fornecedores
UNION ALL
SELECT 'Pedidos' as tabela, COUNT(*) as total FROM pedidos
UNION ALL
SELECT 'Pedidos Concluidos' as tabela, COUNT(*) as total FROM pedidos WHERE status = 'concluido'
UNION ALL
SELECT 'Pedidos Cancelados' as tabela, COUNT(*) as total FROM pedidos WHERE status = 'cancelado';
