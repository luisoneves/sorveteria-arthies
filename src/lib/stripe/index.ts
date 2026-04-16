import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.acacia',
  typescript: true,
});

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export const prices = {
  produto: process.env.STRIPE_PRICE_PRODUTO || 'price_placeholder',
};

export async function createCheckoutSession({
  items,
  successUrl,
  cancelUrl,
  customerEmail,
}: {
  items: { name: string; price: number; quantity: number }[];
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: customerEmail,
    metadata: {
      source: 'sorveteria-arthies',
    },
  });

  return session;
}

export async function createCustomer({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      source: 'sorveteria-arthies',
    },
  });

  return customer;
}

export async function refundPayment(paymentIntentId: string) {
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
  });

  return refund;
}
