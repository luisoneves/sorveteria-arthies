import { describe, it, expect, beforeAll } from 'vitest';
import { createUserToken, verifyUserToken, signToken, verifyToken } from '@/lib/auth/jwt';

describe('JWT Auth', () => {
  const testUser = {
    id: '123',
    email: 'test@example.com',
    nome: 'Test User',
    role: 'cliente',
    pontos: 10,
  };

  describe('createUserToken', () => {
    it('should create a valid JWT token', () => {
      const token = createUserToken(testUser);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('should include user data in payload', () => {
      const token = createUserToken(testUser);
      const payload = verifyUserToken(token);
      expect(payload).not.toBeNull();
      expect(payload?.id).toBe(testUser.id);
      expect(payload?.email).toBe(testUser.email);
      expect(payload?.role).toBe(testUser.role);
    });
  });

  describe('verifyUserToken', () => {
    it('should verify a valid token', () => {
      const token = createUserToken(testUser);
      const payload = verifyUserToken(token);
      expect(payload).not.toBeNull();
      expect(payload?.id).toBe(testUser.id);
    });

    it('should return null for invalid token', () => {
      const payload = verifyUserToken('invalid.token.here');
      expect(payload).toBeNull();
    });

    it('should return null for tampered token', () => {
      const token = createUserToken(testUser);
      const tamperedToken = token.slice(0, -5) + 'xxxxx';
      const payload = verifyUserToken(tamperedToken);
      expect(payload).toBeNull();
    });

    it('should return null for empty string', () => {
      const payload = verifyUserToken('');
      expect(payload).toBeNull();
    });
  });

  describe('signToken / verifyToken', () => {
    it('should sign and verify generic token', () => {
      const payload = { data: 'test', number: 42 };
      const token = signToken(payload);
      const verified = verifyToken(token);
      expect(verified).not.toBeNull();
      expect(verified?.data).toBe('test');
      expect(verified?.number).toBe(42);
    });

    it('should reject invalid signature', () => {
      const token = signToken({ test: true });
      const verified = verifyToken(token + 'tampered');
      expect(verified).toBeNull();
    });
  });

  describe('Security', () => {
    it('should reject token with invalid signature', () => {
      const token = createUserToken(testUser);
      const parts = token.split('.');
      const tamperedToken = parts[0] + '.' + parts[1] + '.invalid-signature';
      
      const payload = verifyUserToken(tamperedToken);
      expect(payload).toBeNull();
    });

    it('should verify valid token correctly', () => {
      const token = createUserToken(testUser);
      const payload = verifyUserToken(token);
      expect(payload).not.toBeNull();
      expect(payload?.role).toBe(testUser.role);
    });
  });
});