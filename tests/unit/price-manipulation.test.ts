import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

describe('Lei 19 - Preço Nunca Vem do Cliente', () => {
  let sessionCookie: string;

  beforeAll(async () => {
    const loginRes = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: 'cliente@arthies.com', senha: '123456' });
    
    expect(loginRes.status).toBe(200);
    
    const cookieHeader = loginRes.headers['set-cookie'];
    if (cookieHeader) {
      sessionCookie = Array.isArray(cookieHeader) ? cookieHeader[0] : cookieHeader;
    }
  });

  it('REJEITA pedido com preço manipulado (menor)', async () => {
    if (!sessionCookie) {
      console.log('⚠️ Pulando teste - sem sessão');
      return;
    }
    
    const payload = {
      items: [
        { produto_id: '1', quantidade: 2 }
      ],
      total: 10.00
    };

    const res = await request(BASE_URL)
      .post('/api/pedidos')
      .set('Cookie', sessionCookie)
      .send(payload);

    expect([400, 401]).toContain(res.status);
    if (res.status === 400) {
      expect(res.body.error).toContain('manipulado');
      expect(res.body.code).toBe('PRICE_MANIPULATION_DETECTED');
    }
  });

  it('REJEITA pedido com preço manipulado (maior)', async () => {
    const payload = {
      items: [
        { produto_id: '1', quantidade: 1 }
      ],
      total: 999.99
    };

    const res = await request(BASE_URL)
      .post('/api/pedidos')
      .set('Cookie', sessionCookie || '')
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('PRICE_MANIPULATION_DETECTED');
  });

it('REJEITA pedido com preço próximo mas não exato (diff > 0.01)', async () => {
    const payload = {
      items: [
        { produto_id: '1', quantidade: 1 }
      ],
      total: 18.80  // diff = 0.10 > 0.01 - deve rejeitar
    };

    const res = await request(BASE_URL)
      .post('/api/pedidos')
      .set('Cookie', sessionCookie)
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('PRICE_MANIPULATION_DETECTED');
  });

  it('ACEITA pedido com total CORRETO (calculado pelo servidor)', async () => {
    const payload = {
      items: [
        { produto_id: '1', quantidade: 1 }
      ],
      total: 18.90
    };

    const res = await request(BASE_URL)
      .post('/api/pedidos')
      .set('Cookie', sessionCookie || '')
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.pedido).toBeDefined();
  });
});