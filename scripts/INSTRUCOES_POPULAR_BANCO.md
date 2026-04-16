# POPULAR BANCO DE DADOS — INSTRUÇÕES

## 📋 Resumo dos Dados

| Tipo | Quantidade |
|------|-----------|
| Usuários | 7 (2 admin, 1 gerente, 2 vendedores, 3 clientes) |
| Fornecedores | 5 |
| Produtos Ativos | 60 |
| Produtos Inativos (soft delete) | 40 |
| Pedidos Concluídos | 30 |
| Pedidos Cancelados | 4 |
| Transações de Pontos | 14 |
| Compras (fornecedores) | 7 |
| Período dos dados | 1 ano e 3 meses |

---

## 🔐 Credenciais de Acesso (Mock)

| Email | Senha | Role |
|-------|-------|------|
| admin@arthies.com | `178tqbnp` | admin |
| admin2@arthies.com | `jzwx0fwl` | admin |
| gerente@arthies.com | `57ydgswj` | gerente |
| vendedor1@arthies.com | `fskk9ndd` | vendedor |
| vendedor2@arthies.com | `fskk9ndd` | vendedor |
| cliente1@arthies.com | `qualquer` | cliente |
| cliente2@arthies.com | `qualquer` | cliente |
| cliente3@arthies.com | `qualquer` | cliente |

---

## ⚠️ ANTES DE EXECUTAR

### 1. Habilitar RLS (se ainda não fez)

```sql
-- Execute no SQL Editor do Supabase (DEV e PROD)

-- Habilitar RLS em todas as tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_pedido ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacoes_pontos ENABLE ROW LEVEL SECURITY;
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE compras ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_compra ENABLE ROW LEVEL SECURITY;
ALTER TABLE reposicoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_reposicao ENABLE ROW LEVEL SECURITY;

-- Criar políticas públicas para admin (ajuste conforme necessário)
CREATE POLICY "Allow all for authenticated users" ON usuarios
    FOR ALL USING (true);
```

### 2. Verificar Schema

Confirme que as tabelas existem com os campos corretos. O script usa campos como:
- `deleted_at` para soft delete
- `idade_grupo` (adulto/idoso/crianca)
- `sexo` (M/F)
- `canceled_at` para vendas canceladas

---

## 🚀 EXECUTAR O SCRIPT

### Opção 1: Supabase SQL Editor (Recomendado)

1. Acesse **https://supabase.com/dashboard**
2. Selecione o projeto (DEV primeiro)
3. Vá em **SQL Editor**
4. Clique em **New Query**
5. Copie todo o conteúdo de `scripts/popular-banco.sql`
6. Cole no editor
7. Clique **Run**

### Opção 2: Via Supabase CLI

```bash
# Conectar ao projeto
supabase link --project-ref <project-ref>

# Executar SQL
supabase db execute -f scripts/popular-banco.sql
```

---

## 🔄 EXECUTAR NOS DOIS BANCOS

### 1. DEV (funyxwrzebcexrlsmvqn)
```bash
supabase link --project-ref funyxwrzebcexrlsmvqn
supabase db execute -f scripts/popular-banco.sql
```

### 2. PROD (tkgjzoynpsfjklylosve)
```bash
supabase link --project-ref tkgjzoynpsfjklylosve
supabase db execute -f scripts/popular-banco.sql
```

---

## ✅ VERIFICAR RESULTADO

Após executar, o script mostra:

```
 tabela              | total
---------------------+-------
 Usuários           |     7
 Produtos Ativos    |    60
 Produtos Inativos  |    40
 Pedidos Concluídos |    30
 Pedidos Cancelados |     4
 Itens de Pedido    |   XX
 Transações de Pontos | 14
```

---

## 🧪 TESTAR SOFT DELETE

### Verificar produtos deletados (soft delete):
```sql
SELECT id, nome, deleted_at 
FROM produtos 
WHERE deleted_at IS NOT NULL;
```

**Esperado:** 40 produtos com `deleted_at` preenchido

### Verificar produtos ativos:
```sql
SELECT id, nome 
FROM produtos 
WHERE ativo = true AND deleted_at IS NULL;
```

**Esperado:** 60 produtos sem `deleted_at`

### Verificar vendas canceladas:
```sql
SELECT id, status, canceled_at, valor_total
FROM pedidos 
WHERE status = 'cancelado';
```

**Esperado:** 4 vendas com `canceled_at` preenchido

---

## 📊 VERIFICAR PERÍODO DOS DADOS

```sql
-- Verificar data mais antiga
SELECT MIN(created_at) as primeira_venda FROM pedidos;

-- Verificar data mais recente
SELECT MAX(created_at) as ultima_venda FROM pedidos;

-- Verificar distribuição por mês
SELECT 
    DATE_TRUNC('month', created_at) as mes,
    COUNT(*) as vendas
FROM pedidos
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY mes;
```

---

## ⚠️ PROBLEMAS COMUNS

### Erro: "relation does not exist"
→ As tabelas ainda não foram criadas. Execute as migrations primeiro.

### Erro: "duplicate key value"
→ Os IDs já existem. O script não limpa dados existentes.

### Campos não existem
→ Verifique se o schema tem os campos necessários (idade_grupo, sexo, canceled_at, etc.)

---

## 🗑️ LIMPAR DADOS (se precisar recomeçar)

```sql
DELETE FROM transacoes_pontos;
DELETE FROM itens_pedido;
DELETE FROM pedidos;
DELETE FROM itens_compra;
DELETE FROM compras;
DELETE FROM produtos WHERE deleted_at IS NOT NULL;
DELETE FROM usuarios WHERE email != 'admin@arthies.com';
```

---

## 📁 Arquivos

- `scripts/popular-banco.sql` — Script de população
- `scripts/VERIFICAR_DADOS.sql` — Queries de verificação
