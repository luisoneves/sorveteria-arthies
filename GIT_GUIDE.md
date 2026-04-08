# 📦 Guia Git - Primeiro Push

## 1. Inicializar Repositório

```bash
cd ~/Projetos/sorveteria-arthies
git init
```

## 2. Configurar Git (uma vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "1991lotavion@gmail.com"
```

## 3. Adicionar Arquivos

```bash
# Ver status
git status

# Adicionar todos os arquivos
git add .

# Ou adicionar específicos
git add src/ package.json README.md
```

## 4. Primeiro Commit

```bash
git commit -m "feat: sistema completo sorveteria arthies v1.0"
```

## 5. Conectar ao GitHub

```bash
git remote add origin git@github.com:sorveteria-arthies.git
```

## 6. Push

```bash
git branch -M main
git push -u origin main
```

## Comandos Úteis

```bash
# Ver status
git status

# Ver alterações
git diff

# Adicionar alterações
git add .

# Commit
git commit -m "sua mensagem"

# Push
git push

# Pull (baixar alterações)
git pull

# Ver branches
git branch -a

# Trocar branch
git checkout nome-branch
```

## Mensagens de Commit (Conventional Commits)

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas gerais
```

**Exemplos:**
```bash
git commit -m "feat: adicionar PDV"
git commit -m "fix: corrigir carrinho"
git commit -m "docs: atualizar README"
```

## Workflow de Trabalho

```bash
# 1. Criar branch para feature
git checkout -b feat/nova-funcionalidade

# 2. Fazer alterações
# ... editando arquivos ...

# 3. Commit
git add .
git commit -m "feat: nova funcionalidade"

# 4. Push
git push -u origin feat/nova-funcionalidade

# 5. Criar Pull Request no GitHub
```

## ⚠️ Arquivos Ignorados

Já configurado no `.gitignore`:
- `node_modules/`
- `.env` e `.env.local`
- `.next/`
- `build/`
- `coverage/`

---

**Quando estiver pronto, me avise para continuar com o deploy! 🚀**
