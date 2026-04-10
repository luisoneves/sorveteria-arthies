'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { isValidEmail } from '@/lib/utils';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    if (!isValidEmail(email)) {
      setErro('Email inválido');
      return;
    }

    setEnviando(true);

    // Simular envio (aqui você implementaria a lógica real com Supabase)
    await new Promise((r) => setTimeout(r, 1500));
    setEnviado(true);
    setEnviando(false);
  }

  if (enviado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="text-center mb-4">
              <span className="text-5xl">✅</span>
            </div>
            <CardTitle className="text-center text-2xl">
              Email Enviado!
            </CardTitle>
            <p className="text-center text-gray-500 mt-2">
              Enviamos instruções para recuperar sua senha para <strong>{email}</strong>
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Não recebeu? Verifique sua caixa de spam ou tente novamente.
            </p>
            <Link
              href="/login"
              className="inline-block w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Voltar para Login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center mb-4">
            <span className="text-5xl">🔐</span>
          </div>
          <CardTitle className="text-center text-2xl">
            Esqueci minha senha
          </CardTitle>
          <p className="text-center text-gray-500 mt-1">
            Digite seu email que enviaremos instruções para criar uma nova senha
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {erro}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={enviando}
            >
              Enviar Instruções
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Lembrou a senha?{' '}
              <Link href="/login" className="text-primary-600 hover:underline font-medium">
                Voltar para Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
