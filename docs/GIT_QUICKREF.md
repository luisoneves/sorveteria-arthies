# 📋 GUIA RÁPIDO — Git & Commits

> Referência rápida para uso diário no projeto.

---

## �_branch_

### Criar branch
```bash
git checkout -b feat/descricao-curta
git checkout -b fix/corrigir-bug
git checkout -b refactor/limpar-codigo
```

### Tipos de branch
| Prefixo | Uso | Exemplo |
|--------|-----|---------|
| `feat/` | Nova feature | `feat/adicionar-login` |
| `fix/` | Bug fix | `fix/corrigir-scroll` |
| `refactor/` | Refatoração | `refactor/centralizar-api` |
| `docs/` | Documentação | `docs/adicionar-readme` |
| `style/` | Estilo CSS | `style/ajustar-cores` |
| `perf/` | Performance | `perf/otimizar-imagens` |
| `chore/` | Tarefas | `chore/atualizar-deps` |
| `test/` | Testes | `test/adicionar-testes` |

---

## 📝 Commits

### Formato
```
tipo(escopo): descrição
```

### Exemplos
```bash
git commit -m "feat(auth): adicionar validação de email"
git commit -m "fix(carrinho): corrigir totales incorreto"
git commit -m "refactor(pagamento): extrair service"
git commit -m "docs(readme): atualizar instruções"
git commit -m "style(header): ajustar padding do menu"
git commit -m "perf(imagens): converter para webp"
git commit -m "chore(deps): atualizar react 19"
git commit -m "test(cadastro): adicionar testes e2e"
```

### Regras
- Tempo imperativo ("add" não "added")
- Limite de 72 caracteres
- Portuguese ou inglês consistente

---

## 🔄 Fluxo Padrão

```bash
# 1. Verificar branch atual
git branch

# 2. Criar nova branch
git checkout -b feat/nova-feature

# 3. Trabalhar + commits atômicos
git add arquivo.ts
git commit -m "feat: adicionar componente"

# 4. Push primeiro código
git push -u origin feat/nova-feature

# 5. Após PR aprovado, fazer merge
git checkout main
git pull origin main
git branch -d feat/nova-feature  # deletar local
git push origin --delete feat/nova-feature  # deletar remote
```

---

## ❌ Erros Comuns

| Erro | Solução |
|-----|---------|
| Commitar em main | `git checkout -b fix/erro && git reset --hard main` |
| Branch com nome ruim | Deletar e recriar |
| Commit muito grande | Quebrar em commits menores |

---

## 🔧 Para Adicionar Depois (Husky + Commitlint)

```bash
# Instalar Husky
npm install husky -D
npx husky init

# Criar .husky/commit-msg
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg

# Adicionar ao package.json
"commitmsg": "commitlint --edit $1"
```

---

*Atualizado: 2026-04*