# SPRINT 7 - LANÇAMENTO

**Data:** 08/04/2026  
**Status:** 🔄 AGUARDANDO DADOS

---

## O Que Foi Preparado

### 1. CI/CD - GitHub Actions
- [x] `.github/workflows/ci.yml` - Pipeline completo
  - Lint
  - Testes
  - Build
  - Deploy automático na Vercel

### 2. Scripts
- [x] `scripts/deploy.sh` - Script de deploy local

### 3. Documentação
- [x] `LAUNCH_CHECKLIST.md` - Checklist completo de lançamento
- [x] `SETUP_SUPABASE.md` - Guia de setup do banco
- [x] `SETUP_VERCEL.md` - Guia de setup do deploy
- [x] `GIT_GUIDE.md` - Guia de Git/GitHub

---

## Aguardando (Você)

### 1. GitHub
- [ ] Criar repo `sorveteria-arthies` no GitHub
- [ ] Dar permissão de acesso (ou aceitar convite)
- [ ] Fazer primeiro push

### 2. Supabase
- [ ] Criar projeto
- [ ] Rodar migration
- [ ] Fornecer credenciais:
  ```
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
  ```

### 3. Vercel
- [ ] Conectar repo GitHub
- [ ] Configurar env vars
- [ ] Gerar token para CI/CD
- [ ] Fornecer:
  ```
  VERCEL_TOKEN
  ```

---

## Próximos Passos (Quando Tiver Dados)

1. Configurar GitHub Secrets com credenciais
2. Testar CI/CD
3. Deploy em produção
4. Testes finais

---

## Para Começar

```bash
# 1. Clone ou atualize
cd ~/Projetos/sorveteria-arthies

# 2. Docs
cat LAUNCH_CHECKLIST.md
cat GIT_GUIDE.md
cat SETUP_SUPABASE.md
cat SETUP_VERCEL.md
```

---

*Última atualização: 08/04/2026*
