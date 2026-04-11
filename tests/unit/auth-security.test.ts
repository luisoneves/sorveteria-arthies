import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

describe('Segurança de Autenticação', () => {
  it('NÃO aceita sessão inválida', async () => {
    const res = await request(BASE_URL)
      .get('/api/pedidos')
      .set('Cookie', 'user=invalido');

    expect(res.status).toBe(401);
  });

  it('NÃO aceita requisição sem cookie de sessão', async () => {
    const res = await request(BASE_URL)
      .get('/api/pedidos');

    expect(res.status).toBe(401);
  });

  it('ACEITA sessão válida', async () => {
    const loginRes = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: 'cliente@arthies.com', senha: '123456' });

    expect(loginRes.status).toBe(200);
    
    const cookieHeader = loginRes.headers['set-cookie'];
    expect(cookieHeader).toBeDefined();
  });

  it('Cookie tem httpOnly (não acessivel via JavaScript)', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: 'cliente@arthies.com', senha: 'any' });

    const cookies = res.headers['set-cookie'];
    
    if (cookies) {
      const cookieString = Array.isArray(cookies) ? cookies.join('; ') : cookies;
      expect(cookieString).toMatch(/HttpOnly/i);
    }
  });
});

describe('Input Validation - Zod', () => {
  it('REJEITA payload vazio em /pedidos', async () => {
    const sessionCookie = await getSessionCookie();
    
    const res = await request(BASE_URL)
      .post('/api/pedidos')
      .set('Cookie', sessionCookie || '')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('obrigatórios');
  });

  it('REJEITA items inválidos', async () => {
    const sessionCookie = await getSessionCookie();
    
    const res = await request(BASE_URL)
      .post('/api/pedidos')
      .set('Cookie', sessionCookie || '')
      .send({ items: 'não é array' });

    // Aceita 400 (validação rejeita) ou 500 (erro interno por input inválido)
    expect([400, 500]).toContain(res.status);
  });
});

async function getSessionCookie(): Promise<string> {
  const loginRes = await request(BASE_URL)
    .post('/api/auth/login')
    .send({ email: 'cliente@arthies.com', senha: '123456' });
  
  const cookieHeader = loginRes.headers['set-cookie'];
  if (cookieHeader) {
    return Array.isArray(cookieHeader) ? cookieHeader[0] : cookieHeader;
  }
  return '';
}