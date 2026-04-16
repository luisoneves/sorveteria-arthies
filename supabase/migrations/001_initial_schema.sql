-- ========================================
-- MIGRATION: 001_initial_schema
-- Sorveteria Arthies - Sistema de Gestão
-- Data: 08/04/2026
-- ========================================

-- ========================================
-- EXTENSÕES
-- ========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- TABELA: USUÁRIOS
-- ========================================
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'gerente', 'vendedor', 'cliente')),
    pontos INTEGER DEFAULT 0,
    telefone VARCHAR(20),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index para busca por email
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_role ON usuarios(role);

-- ========================================
-- TABELA: PRODUTOS
-- ========================================
CREATE TABLE IF NOT EXISTS produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL CHECK (preco >= 0),
    preco_original DECIMAL(10, 2),
    categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('cremoso', 'sorbet', 'especial', 'bebida', 'acompanhamento')),
    imagem TEXT,
    ativo BOOLEAN DEFAULT true,
    estoque INTEGER DEFAULT 0 CHECK (estoque >= 0),
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_ativo ON produtos(ativo);

-- ========================================
-- TABELA: PEDIDOS
-- ========================================
CREATE TABLE IF NOT EXISTS pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    vendedor_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_andamento', 'concluido', 'cancelado')),
    status_pagamento VARCHAR(50) DEFAULT 'pendente' CHECK (status_pagamento IN ('pendente', 'pago', 'falhou')),
    tipo VARCHAR(50) DEFAULT 'balcao',
    valor_total DECIMAL(10, 2) NOT NULL DEFAULT 0,
    pontos_usados INTEGER DEFAULT 0,
    pontos_ganhos INTEGER DEFAULT 0,
    idade_grupo VARCHAR(50),
    sexo VARCHAR(10),
    canceled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(status);
CREATE INDEX IF NOT EXISTS idx_pedidos_created ON pedidos(created_at DESC);

-- ========================================
-- TABELA: ITENS DO PEDIDO
-- ========================================
CREATE TABLE IF NOT EXISTS itens_pedido (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id) ON DELETE SET NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario DECIMAL(10, 2) NOT NULL CHECK (preco_unitario >= 0),
    desconto DECIMAL(10, 2) DEFAULT 0 CHECK (desconto >= 0),
    subtotal DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_itens_pedido ON itens_pedido(pedido_id);

-- ========================================
-- TABELA: PROMOÇÕES
-- ========================================
CREATE TABLE IF NOT EXISTS promocoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('percentual', 'fixo', 'compre_ganhe')),
    valor DECIMAL(10, 2) NOT NULL,
    produto_ids UUID[],
    categoria VARCHAR(50),
    data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    data_fim TIMESTAMP WITH TIME ZONE NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_by UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_promocoes_ativo ON promocoes(ativo);
CREATE INDEX IF NOT EXISTS idx_promocoes_datas ON promocoes(data_inicio, data_fim);

-- ========================================
-- TABELA: TRANSAÇÕES DE PONTOS
-- ========================================
CREATE TABLE IF NOT EXISTS transacoes_pontos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('credito', 'debito', 'ganho', 'uso')),
    valor DECIMAL(10, 2) DEFAULT 0,
    pontos INTEGER NOT NULL,
    descricao TEXT,
    pedido_id UUID REFERENCES pedidos(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transacoes_cliente ON transacoes_pontos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_created ON transacoes_pontos(created_at DESC);

-- ========================================
-- TABELA: FORNECEDORES
-- ========================================
CREATE TABLE IF NOT EXISTS fornecedores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    contato VARCHAR(255),
    telefone VARCHAR(20),
    email VARCHAR(255),
    endereco TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- TABELA: COMPRAS (ESTOQUE)
-- ========================================
CREATE TABLE IF NOT EXISTS compras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fornecedor_id UUID REFERENCES fornecedores(id) ON DELETE SET NULL,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'pendente' CHECK (status IN ('pendente', 'recebido', 'cancelado')),
    valor_total DECIMAL(10, 2) DEFAULT 0,
    data_prevista DATE,
    data_recebimento DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_compras_status ON compras(status);

-- ========================================
-- TABELA: ITENS DA COMPRA
-- ========================================
CREATE TABLE IF NOT EXISTS itens_compra (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    compra_id UUID REFERENCES compras(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id) ON DELETE SET NULL,
    produto_nome VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- TABELA: REPOSIÇÕES
-- ========================================
CREATE TABLE IF NOT EXISTS reposicoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendedor_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    gerente_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'solicitada' CHECK (status IN ('solicitada', 'aprovada', 'rejeitada', 'comprada')),
    observacao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- TABELA: ITENS DA REPOSIÇÃO
-- ========================================
CREATE TABLE IF NOT EXISTS itens_reposicao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reposicao_id UUID REFERENCES reposicoes(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id) ON DELETE SET NULL,
    produto_nome VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- FUNÇÕES E TRIGGERS
-- ========================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para usuários
DROP TRIGGER IF EXISTS update_usuarios_updated_at ON usuarios;
CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para produtos
DROP TRIGGER IF EXISTS update_produtos_updated_at ON produtos;
CREATE TRIGGER update_produtos_updated_at
    BEFORE UPDATE ON produtos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para pedidos
DROP TRIGGER IF EXISTS update_pedidos_updated_at ON pedidos;
CREATE TRIGGER update_pedidos_updated_at
    BEFORE UPDATE ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- FUNÇÕES PARA PONTOS
-- ========================================

-- Adicionar pontos
CREATE OR REPLACE FUNCTION adicionar_pontos(
    p_usuario_id UUID,
    p_pontos INTEGER,
    p_descricao TEXT,
    p_pedido_id UUID DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE usuarios SET pontos = pontos + p_pontos WHERE id = p_usuario_id;
    
    INSERT INTO transacoes_pontos (cliente_id, tipo, pontos, descricao, pedido_id)
    VALUES (p_usuario_id, 'credito', p_pontos, p_descricao, p_pedido_id);
END;
$$ LANGUAGE plpgsql;

-- Usar pontos
CREATE OR REPLACE FUNCTION usar_pontos(
    p_usuario_id UUID,
    p_pontos INTEGER,
    p_descricao TEXT,
    p_pedido_id UUID DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
    pontos_atuais INTEGER;
BEGIN
    SELECT pontos INTO pontos_atuais FROM usuarios WHERE id = p_usuario_id;
    
    IF pontos_atuais >= p_pontos THEN
        UPDATE usuarios SET pontos = pontos - p_pontos WHERE id = p_usuario_id;
        
        INSERT INTO transacoes_pontos (cliente_id, tipo, pontos, descricao, pedido_id)
        VALUES (p_usuario_id, 'debito', p_pontos, p_descricao, p_pedido_id);
    ELSE
        RAISE EXCEPTION 'Pontos insuficientes';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================

-- Habilitar RLS nas tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE promocoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacoes_pontos ENABLE ROW LEVEL SECURITY;
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE compras ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_compra ENABLE ROW LEVEL SECURITY;
ALTER TABLE reposicoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_reposicao ENABLE ROW LEVEL SECURITY;

-- ========================================
-- POLÍTICAS RLS BÁSICAS
-- ========================================

-- Usuários: leitura pública, escrita para authenticated
CREATE POLICY "Usuários são públicos para leitura" ON usuarios FOR SELECT USING (true);
CREATE POLICY "Usuários podem ver seus próprios dados" ON usuarios FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuários podem atualizar seus próprios dados" ON usuarios FOR UPDATE USING (auth.uid() = id);

-- Produtos: leitura pública para ativos
CREATE POLICY "Produtos ativos são públicos" ON produtos FOR SELECT USING (ativo = true AND deleted_at IS NULL);

-- ========================================
-- FIM DA MIGRATION
-- ========================================
