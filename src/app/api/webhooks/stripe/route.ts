import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe';
import { sendEmail, OrderConfirmationEmail, AdminNewOrderEmail } from '@/lib/email';
import { emails } from '@/lib/email/resend';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe não configurado' },
      { status: 503 }
    );
  }
  
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Assinatura não encontrada' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Assinatura inválida' },
        { status: 400 }
      );
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout completed:', session.id);

        if (session.customer_email) {
          await sendEmail({
            to: session.customer_email,
            subject: `Pedido Confirmado - #${session.id.slice(-8).toUpperCase()}`,
            react: OrderConfirmationEmail({
              nome: session.customer_details?.name || 'Cliente',
              pedidoId: session.id.slice(-8).toUpperCase(),
              valor: (session.amount_total || 0) / 100,
              itens: ['Itens do pedido...'],
            }),
          });
        }

        const isDev = process.env.NODE_ENV === 'development';
        await sendEmail({
          to: isDev ? emails.adminDev : emails.adminProd,
          subject: `🆕 Novo Pagamento - #${session.id.slice(-8).toUpperCase()}`,
          react: AdminNewOrderEmail({
            pedidoId: session.id.slice(-8).toUpperCase(),
            cliente: session.customer_details?.name || 'Online',
            valor: (session.amount_total || 0) / 100,
            tipo: 'online',
            itens: ['Pagamento via Stripe'],
          }),
        });

        break;
      }

      case 'payment_intent.succeeded': {
        console.log('Payment succeeded:', event.data.object);
        break;
      }

      case 'payment_intent.payment_failed': {
        console.log('Payment failed:', event.data.object);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Erro no webhook' },
      { status: 500 }
    );
  }
}
