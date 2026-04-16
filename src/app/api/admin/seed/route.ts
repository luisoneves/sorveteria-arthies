import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createUserToken, SESSION_COOKIE_OPTIONS } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';

const SEED_SECRET = process.env.SEED_SECRET || 'seed-secret-key';

const usuariosSeed = [
  {
    email: '199lotavion@gmail.com',
    nome: 'Admin Produção',
    telefone: '11999990001',
    role: 'admin' as const,
    senha: 'AdminProd123!',
  },
  {
    email: '1991lotavio@gmail.com',
    nome: 'Admin Dev',
    telefone: '11999990002',
    role: 'admin' as const,
    senha: 'AdminDev123!',
  },
  {
    email: 'gerente@arthies.com',
    nome: 'Gerente Arthies',
    telefone: '11999990003',
    role: 'gerente' as const,
    senha: 'Gerente123!',
  },
  {
    email: 'vendedor1@arthies.com',
    nome: 'Vendedor João',
    telefone: '11999990004',
    role: 'vendedor' as const,
    senha: 'Vendedor123!',
  },
  {
    email: 'vendedor2@arthies.com',
    nome: 'Vendedora Maria',
    telefone: '11999990005',
    role: 'vendedor' as const,
    senha: 'Vendedor123!',
  },
  {
    email: 'cliente1@arthies.com',
    nome: 'Cliente Paulo',
    telefone: '11999990006',
    role: 'cliente' as const,
    senha: 'Cliente123!',
  },
  {
    email: 'cliente2@arthies.com',
    nome: 'Cliente Ana',
    telefone: '11999990007',
    role: 'cliente' as const,
    senha: 'Cliente123!',
  },
  {
    email: 'cliente3@arthies.com',
    nome: 'Cliente Carlos',
    telefone: '11999990008',
    role: 'cliente' as const,
    senha: 'Cliente123!',
  },
];

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (authHeader !== `Bearer ${SEED_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const results: { email: string; role: string; status: string; error?: string }[] = [];

    for (const usuario of usuariosSeed) {
      try {
        const { data: existingUser } = await supabaseAdmin
          .from('usuarios')
          .select('id, email')
          .eq('email', usuario.email)
          .single();

        if (existingUser) {
          results.push({
            email: usuario.email,
            role: usuario.role,
            status: 'already_exists',
          });
          continue;
        }

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: usuario.email,
          password: usuario.senha,
          email_confirm: true,
          user_metadata: {
            nome: usuario.nome,
            telefone: usuario.telefone,
            role: usuario.role,
          },
        });

        if (authError) {
          results.push({
            email: usuario.email,
            role: usuario.role,
            status: 'auth_error',
            error: authError.message,
          });
          continue;
        }

        const { error: userError } = await supabaseAdmin
          .from('usuarios')
          .insert({
            id: authData.user!.id,
            email: usuario.email,
            nome: usuario.nome,
            telefone: usuario.telefone,
            role: usuario.role,
            pontos: usuario.role === 'cliente' ? Math.floor(Math.random() * 500) : 0,
            ativo: true,
          });

        if (userError) {
          results.push({
            email: usuario.email,
            role: usuario.role,
            status: 'user_table_error',
            error: userError.message,
          });
        } else {
          results.push({
            email: usuario.email,
            role: usuario.role,
            status: 'created',
          });
        }
      } catch (err) {
        results.push({
          email: usuario.email,
          role: usuario.role,
          status: 'error',
          error: String(err),
        });
      }
    }

    return NextResponse.json({
      message: 'Seed completed',
      results,
      credentials: {
        admins: [
          { email: '199lotavion@gmail.com', senha: 'AdminProd123!' },
          { email: '1991lotavio@gmail.com', senha: 'AdminDev123!' },
        ],
        gerente: { email: 'gerente@arthies.com', senha: 'Gerente123!' },
        vendedores: [
          { email: 'vendedor1@arthies.com', senha: 'Vendedor123!' },
          { email: 'vendedor2@arthies.com', senha: 'Vendedor123!' },
        ],
        clientes: [
          { email: 'cliente1@arthies.com', senha: 'Cliente123!' },
          { email: 'cliente2@arthies.com', senha: 'Cliente123!' },
          { email: 'cliente3@arthies.com', senha: 'Cliente123!' },
        ],
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}
