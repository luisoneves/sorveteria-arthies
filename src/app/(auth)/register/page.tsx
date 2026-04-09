'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useAuth } from '@/hooks';
import { useToast } from '@/components/ui/Toast';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    router.push('/cliente/shop');
    return null;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.nome.trim()) {
      addToast('error', 'Nome é obrigatório');
      return;
    }

    if (!formData.email.includes('@')) {
      addToast('error', 'Email inválido');
      return;
    }

    if (formData.senha.length < 8 || !/\d/.test(formData.senha)) {
      addToast('error', 'Senha deve ter no mínimo 8 caracteres e 1 número');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      addToast('error', 'As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone || undefined,
      });
      addToast('success', 'Conta criada com sucesso!');
      router.push('/cliente/shop');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao registrar';
      console.error('Register error:', err);
      addToast('error', message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center mb-4">
            <span className="text-5xl">🍨</span>
          </div>
          <CardTitle className="text-center text-2xl">
            Criar Conta
          </CardTitle>
          <p className="text-center text-gray-500 mt-1">
            Cadastre-se para começar a comprar
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              label="Nome Completo"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Seu nome"
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />

            <Input
              label="Telefone (opcional)"
              name="telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />

            <Input
              label="Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Mínimo 8 caracteres"
              required
            />

            <Input
              label="Confirmar Senha"
              name="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Repita a senha"
              required
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Criar Conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Já tem conta?{' '}
              <Link href="/login" className="text-primary-600 hover:underline font-medium">
                Faça login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
