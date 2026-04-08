import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { produtoSchema } from '@/lib/schemas';
import type { UserRole } from '@/types';

async function getUserRole(): Promise<UserRole | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  if (!userCookie) return null;
  try {
    const user = JSON.parse(userCookie.value);
    return user.role;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const ativo = searchParams.get('ativo');

    let query = supabaseAdmin
      .from('produtos')
      .select('*')
      .order('nome');

    if (categoria) {
      query = query.eq('categoria', categoria);
    }

    if (ativo !== null) {
      query = query.eq('ativo', ativo === 'true');
    } else {
      // Por padrão, só mostra ativos
      query = query.eq('ativo', true);
    }

    const { data: produtos, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar produtos' },
        { status: 500 }
      );
    }

    return NextResponse.json({ produtos });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verificar permissão (só admin e gerente)
    const role = await getUserRole();
    if (!role || !['admin', 'gerente'].includes(role)) {
      return NextResponse.json(
        { error: 'Sem permissão' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validar input
    const result = produtoSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { data: produto, error } = await supabaseAdmin
      .from('produtos')
      .insert(result.data)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao criar produto' },
        { status: 500 }
      );
    }

    return NextResponse.json({ produto }, { status: 201 });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
