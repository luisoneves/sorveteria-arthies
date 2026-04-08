#!/bin/bash

# ========================================
# SCRIPT DE DEPLOY - Sorveteria Arthies
# ========================================

set -e

echo "🍨 Sorveteria Arthies - Deploy Script"
echo "======================================"

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função de erro
error() {
    echo -e "${RED}❌ Erro: $1${NC}"
    exit 1
}

# Função de sucesso
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Função de info
info() {
    echo -e "${YELLOW}ℹ️ $1${NC}"
}

# Verificar Node.js
info "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    error "Node.js não encontrado. Instale em https://nodejs.org"
fi
success "Node.js $(node -v) encontrado"

# Verificar npm
info "Verificando npm..."
if ! command -v npm &> /dev/null; then
    error "npm não encontrado"
fi
success "npm $(npm -v) encontrado"

# Instalar dependências
info "Instalando dependências..."
npm install
success "Dependências instaladas"

# Verificar variáveis de ambiente
info "Verificando .env.local..."
if [ ! -f .env.local ]; then
    if [ -f .env.example ]; then
        info "Criando .env.local a partir do .env.example..."
        cp .env.example .env.local
        echo -e "${YELLOW}⚠️  Edite o .env.local com suas credenciais do Supabase${NC}"
    else
        error ".env.example não encontrado"
    fi
else
    success ".env.local encontrado"
fi

# Build
info "Fazendo build..."
npm run build
success "Build concluído"

# Deploy no Vercel
info "Deploy no Vercel..."
if command -v vercel &> /dev/null; then
    vercel --prod
    success "Deploy concluído!"
else
    info "Vercel CLI não encontrado. Instalando..."
    npm install -g vercel
    vercel --prod
    success "Deploy concluído!"
fi

echo ""
echo "======================================"
echo -e "${GREEN}🎉 Deploy finalizado com sucesso!${NC}"
echo "======================================"
