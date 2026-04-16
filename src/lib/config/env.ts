// ========================================
// CONFIGURAÇÃO DE AMBIENTE - SECURE BOOT
// ========================================
// Suporta múltiplos ambientes: development, staging, production
// Ambientes: DEV (Supabase Dev) | PROD (Supabase Prod)
// ========================================

export type Environment = 'development' | 'staging' | 'production';

export const CURRENT_ENV: Environment = (
  process.env.NEXT_PUBLIC_ENVIRONMENT as Environment
) || 'development';

export const IS_PRODUCTION = CURRENT_ENV === 'production';
export const IS_DEV = CURRENT_ENV === 'development';
export const IS_STAGING = CURRENT_ENV === 'staging';

// Modo mock (para desenvolvimento sem banco)
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// URLs e chaves por ambiente
export const SUPABASE_CONFIG = {
  development: {
    url: process.env.NEXT_PUBLIC_SUPABASE_DEV_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_DEV_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_DEV_SERVICE_ROLE_KEY || '',
  },
  staging: {
    url: process.env.NEXT_PUBLIC_SUPABASE_DEV_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_DEV_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_DEV_SERVICE_ROLE_KEY || '',
  },
  production: {
    url: process.env.NEXT_PUBLIC_SUPABASE_PROD_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_PROD_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_PROD_SERVICE_ROLE_KEY || '',
  },
};

// URL ativa (baseado no ambiente ou variável direta)
export const getSupabaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return process.env.NEXT_PUBLIC_SUPABASE_URL;
  }
  return SUPABASE_CONFIG[CURRENT_ENV]?.url || '';
};

export const getSupabaseAnonKey = (): string => {
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }
  return SUPABASE_CONFIG[CURRENT_ENV]?.anonKey || '';
};

// Service role key (SERVER ONLY - nunca exponha ao cliente)
export const getSupabaseServiceRoleKey = (): string => {
  if (CURRENT_ENV === 'production') {
    return process.env.SUPABASE_PROD_SERVICE_ROLE_KEY || '';
  }
  if (CURRENT_ENV === 'staging') {
    return process.env.SUPABASE_DEV_SERVICE_ROLE_KEY || '';
  }
  return process.env.SUPABASE_DEV_SERVICE_ROLE_KEY || '';
};

// Verifica se Supabase está configurado
export const HAS_SUPABASE = (): boolean => {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  return !!(url && key && !url.includes('placeholder'));
};

// Secure Boot: Se produção sem Supabase e sem mock, ERRO
if (IS_PRODUCTION && !HAS_SUPABASE() && !USE_MOCK) {
  throw new Error(
    '🔒 PRODUCTION ERROR: Sistema requer Supabase configurado.\n' +
    'Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY,\n' +
    'ou defina NEXT_PUBLIC_USE_MOCK=true para modo demo.'
  );
}

// Logging em desenvolvimento
if (IS_DEV) {
  console.log('═══════════════════════════════════════════');
  console.log('🔧 Ambiente:', CURRENT_ENV.toUpperCase());
  console.log('📦 Modo:', USE_MOCK ? 'MOCK (sem banco)' : 'SUPABASE');
  console.log('🗄️ Supabase:', HAS_SUPABASE() ? '✓ Configurado' : '✗ Não configurado');
  console.log('═══════════════════════════════════════════');
}
