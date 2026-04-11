# PostgreSQL Docker - Guia de Configuração

## quick Start

### 1. Iniciar PostgreSQL
```bash
docker compose up -d
```

### 2. Verificar se está rodando
```bash
docker compose ps
```

### 3. Executar migrations
```bash
# Conectar ao banco e criar tabelas
docker exec -it sorveteria-db psql -U postgres -d sorveteria -f /var/lib/postgresql/data/init.sql

# Ou de forma mais simples, executar diretamente:
docker exec -i sorveteria-db psql -U postgres -d sorveteria < supabase/migrations/001_initial_schema.sql
```

### 4. Configurar variáveis de ambiente

Edite o arquivo `.env.local`:

```bash
# Usar PostgreSQL (não mock)
NEXT_PUBLIC_USE_MOCK=false

# String de conexão
DATABASE_URL=postgresql://postgres:sorvete123@localhost:5432/sorveteria
```

### 5. Rodar o projeto
```bash
npm run dev
```

---

## Troubleshooting

### Banco não conecta?

1. Verificar se o container está rodando:
```bash
docker compose ps
```

2. Ver os logs:
```bash
docker compose logs postgres
```

3. Reiniciar o banco:
```bash
docker compose restart postgres
```

### resetar os dados?

```bash
# Para e.remove os dados volumes
docker compose down -v

# Iniciar novamente
docker compose up -d
```

### Ver banco no seu cliente (DBeaver/TablePlus/etc)

```
Host: localhost
Port: 5432
Database: sorveteria
User: postgres
Password: sorvete123
```

---

## Estrutura das Tabelas

| Tabela | Descrição |
|--------|------------|
| usuarios | Funcionários e clientes |
| produtos | Catálogo de sorvetes |
| pedidos | Vendas realizadas |
| itens_pedido | Items de cada venda |
| promocoes | Descontos e promoções |
| transacoes_pontos | Histórico de fidelidade |
| fornecedores | Fornecedores |
| compras | Controle de estoque |

---

## Próximos Passos

1. ✅ PostgreSQL rodando
2. ⏳ Conectar projeto ao banco
3. ⏳ Testar criar/editar produtos
4. ⏳ Deploy para Supabase (produção)