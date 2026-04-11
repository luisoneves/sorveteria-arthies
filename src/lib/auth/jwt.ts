import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-change-in-production';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export interface JwtPayload {
  id: string;
  email: string;
  nome: string;
  role: string;
  pontos?: number;
  telefone?: string;
  created_at?: string;
  iat?: number;
  exp?: number;
}

export function createUserToken(user: Omit<JwtPayload, 'iat' | 'exp'>): string {
  const payload = {
    ...user,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };

  return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });
}

export function verifyUserToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    }) as JwtPayload;

    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export function signToken(payload: Record<string, unknown>, expiresIn?: string): string {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: expiresIn ?? '7d',
  } as jwt.SignOptions);
}

export function verifyToken(token: string): Record<string, unknown> | null {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    }) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: SESSION_MAX_AGE,
  path: '/',
};