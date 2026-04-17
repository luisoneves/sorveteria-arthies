#!/bin/bash
# ========================================
# Seed Script - Sorveteria Arthies
# Executa seed via Supabase CLI
# ========================================

set -e

# Verificar se está instalado
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI não encontrado. Instale com: npm i -g supabase"
    exit 1
fi

# Verificar token
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
    echo "❌ SUPABASE_ACCESS_TOKEN não configurado"
    echo "Execute: supabase login"
    exit 1
fi

echo "🚀 Executando seed no Supabase DEV..."

# Ler o arquivo SQL e executar
supabase db execute --project-ref funyxwrzebcexrlsmvqn --file supabase/seed_simple.sql

echo "✅ Seed executado com sucesso!"