-- ========================================
-- HABILITAR EXTENSÃO UUID
-- ========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- CRIAÇÃO COMPLETA DO SCHEMA
-- ========================================

-- ========================================
-- USUÁRIOS
-- ========================================
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    role VARCHAR(50) NOT NULL DEFAULT 'cliente',
    pontos INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- FORNECEDORES
-- ========================================
CREATE TABLE IF NOT EXISTS fornecedores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20),
    telefone VARCHAR(20),
    email VARCHAR(255),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- PRODUTOS
-- ========================================
CREATE TABLE IF NOT EXISTS produtos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(100),
    fornecedor_id UUID REFERENCES fornecedores(id),
    ativo BOOLEAN DEFAULT true,
    estoque INTEGER DEFAULT 0,
    deleted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- PEDIDOS
-- ========================================
CREATE TABLE IF NOT EXISTS pedidos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_id UUID REFERENCES usuarios(id),
    vendedor_id UUID REFERENCES usuarios(id),
    status VARCHAR(50) DEFAULT 'pendente',
    tipo VARCHAR(50) DEFAULT 'balcao',
    valor_total DECIMAL(10,2) DEFAULT 0,
    pontos_ganhos INTEGER DEFAULT 0,
    idade_grupo VARCHAR(50),
    sexo VARCHAR(10),
    canceled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- ITENS PEDIDO
-- ========================================
CREATE TABLE IF NOT EXISTS itens_pedido (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id),
    quantidade INTEGER DEFAULT 1,
    preco_unitario DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TRANSAÇÕES PONTOS
-- ========================================
CREATE TABLE IF NOT EXISTS transacoes_pontos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_id UUID REFERENCES usuarios(id),
    tipo VARCHAR(50) NOT NULL,
    valor DECIMAL(10,2) DEFAULT 0,
    pontos INTEGER NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- COMPRAS
-- ========================================
CREATE TABLE IF NOT EXISTS compras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fornecedor_id UUID REFERENCES fornecedores(id),
    usuario_id UUID REFERENCES usuarios(id),
    status VARCHAR(50) DEFAULT 'pendente',
    valor_total DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- ITENS COMPRA
-- ========================================
CREATE TABLE IF NOT EXISTS itens_compra (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    compra_id UUID REFERENCES compras(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id),
    quantidade INTEGER DEFAULT 1,
    preco_unitario DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- REPOSIÇÕES
-- ========================================
CREATE TABLE IF NOT EXISTS reposicoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gerente_id UUID REFERENCES usuarios(id),
    vendedor_id UUID REFERENCES usuarios(id),
    status VARCHAR(50) DEFAULT 'pendente',
    observacao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- ITENS REPOSIÇÃO
-- ========================================
CREATE TABLE IF NOT EXISTS itens_reposicao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reposicao_id UUID REFERENCES reposicoes(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id),
    quantidade INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
