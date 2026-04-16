import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, WelcomeEmail, AdminNewOrderEmail } from '@/lib/email';
import { emails } from '@/lib/email/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, email } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Tipo de email é obrigatório' },
        { status: 400 }
      );
    }

    const isDev = process.env.NODE_ENV === 'development';
    const adminEmail = isDev ? emails.adminDev : emails.adminProd;

    switch (type) {
      case 'welcome': {
        const result = await sendEmail({
          to: email || 'test@example.com',
          subject: 'Bem-vindo à Sorveteria Arthies!',
          react: WelcomeEmail({
            nome: email?.split('@')[0] || 'Cliente',
            email: email || 'test@example.com',
          }),
        });
        return NextResponse.json(result);
      }

      case 'admin-new-order': {
        const result = await sendEmail({
          to: adminEmail,
          subject: '🆕 Novo Pedido - Sorveteria Arthies',
          react: AdminNewOrderEmail({
            pedidoId: 'TEST-001',
            cliente: 'João Silva',
            valor: 45.70,
            tipo: 'balcao',
            itens: ['1x Ninho com Nutella', '1x Cobertura de Chocolate'],
          }),
        });
        return NextResponse.json(result);
      }

      case 'test-both': {
        const results = await Promise.all([
          sendEmail({
            to: email || 'test@example.com',
            subject: 'TESTE - Bem-vindo à Sorveteria Arthies!',
            react: WelcomeEmail({
              nome: 'Teste',
              email: 'test@example.com',
            }),
          }),
          sendEmail({
            to: adminEmail,
            subject: 'TESTE - Admin: Novo Pedido',
            react: AdminNewOrderEmail({
              pedidoId: 'TEST-ADMIN-001',
              cliente: 'Teste Cliente',
              valor: 99.90,
              tipo: 'delivery',
              itens: ['2x Sorvete Premium'],
            }),
          }),
        ]);
        return NextResponse.json({ results });
      }

      default:
        return NextResponse.json(
          { error: 'Tipo de email desconhecido' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar email' },
      { status: 500 }
    );
  }
}
