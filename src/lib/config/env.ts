// ========================================
// CONFIGURAÇÃO DE AMBIENTE - SECURE BOOT
// ========================================
// Este arquivo implementa a "Metáfora das Duas Chaves":
// - Máquina A: O código (genérico, não sabe qual ambiente)
// - Chave B: Produção (Supabase real)
// - Chave C: Desenvolvimento (Mock)

// Verifica se está em modo mock
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// Verifica se tem Supabase configurado
export const HAS_SUPABASE = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key'
);

// Ambiente atual
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Secure Boot: Se produção sem Supabase e sem mock, ERRO
if (IS_PRODUCTION && !HAS_SUPABASE && !USE_MOCK) {
  throw new Error(
    '🔒 PRODUCTION ERROR: Sistema requer Supabase configurado.\n' +
    'Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY,\n' +
    'ou defina NEXT_PUBLIC_USE_MOCK=true para modo demo.'
  );
}

// Modo demo: forçar mock em produção (apenas para testes controlados)
export const IS_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' && IS_PRODUCTION;

// URLs
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Logging em desenvolvimento
if (!IS_PRODUCTION) {
  console.log('🔧 Ambiente:', process.env.NODE_ENV);
  console.log('📦 Mock:', USE_MOCK);
  console.log('🗄️ Supabase:', HAS_SUPABASE ? 'Configurado' : 'Não configurado');
}
