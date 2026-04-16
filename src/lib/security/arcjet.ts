import arcjet, { shield, rateLimit, detectBot } from '@arcjet/next';

const aj = arcjet({
  key: process.env.ARCJET_SECRET_KEY!,
  rules: [
    shield({
      mode: 'LIVE',
    }),
    rateLimit({
      mode: 'LIVE',
      limit: 10,
      interval: '1m',
    }),
    detectBot({
      mode: 'LIVE',
      allow: ['CURL: curl', 'PostmanRuntime'],
    }),
  ],
});

export async function withArcjet(request: Request) {
  const decision = await aj.protect(request);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return new Response('Rate limit exceeded', { status: 429 });
    }
    if (decision.reason.isBot()) {
      return new Response('Bot detected', { status: 403 });
    }
    return new Response('Forbidden', { status: 403 });
  }

  return null;
}

export { aj as arcjetClient };
