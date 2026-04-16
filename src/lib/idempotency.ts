import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const idempotencyStore = new Map<string, { response: unknown; expiresAt: number }>();

const IDEMPOTENCY_TTL = 24 * 60 * 60 * 1000; // 24h

export function getIdempotencyKey(request: NextRequest): string | null {
  return request.headers.get('Idempotency-Key') 
    ?? request.headers.get('x-idempotency-key')
    ?? null;
}

export function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] 
    ?? request.headers.get('x-real-ip')
    ?? 'unknown';
}

export async function withIdempotency<T>(
  request: NextRequest,
  key: string,
  handler: () => Promise<NextResponse<T>>
): Promise<NextResponse<T>> {
  if (!key) {
    return handler();
  }

  const cached = idempotencyStore.get(key);
  
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.response as T, {
      status: 200,
      headers: {
        'X-Idempotent-Replay': 'true',
      },
    });
  }

  const response = await handler();
  
  if (response.ok) {
    const data = await response.clone().json();
    
    idempotencyStore.set(key, {
      response: data,
      expiresAt: Date.now() + IDEMPOTENCY_TTL,
    });
  }

  return response;
}

export function createIdempotencyKey(...parts: string[]): string {
  const data = parts.join('|');
  return Buffer.from(data).toString('base64url');
}

export function setIdempotencyHeaders(response: NextResponse, key: string): NextResponse {
  response.headers.set('Idempotency-Key', key);
  return response;
}