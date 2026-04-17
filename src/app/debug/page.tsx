'use client';

import { useState } from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';

interface DebugResult {
  status: number | string;
  ok: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

export default function DebugPage() {
  const { addToast } = useToast();
  const [testEmail, setTestEmail] = useState('debug@teste.com');
  const [testNome, setTestNome] = useState('Debug User');
  const [testSenha, setTestSenha] = useState('teste123');
  const [result, setResult] = useState<DebugResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function testRegister() {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: testNome,
          email: testEmail,
          senha: testSenha,
        }),
      });

      const data = await response.json();
      setResult({
        status: response.status,
        ok: response.ok,
        data,
      });

      if (response.ok) {
        addToast('success', 'Registro funcionou!');
      } else {
        addToast('error', `Erro: ${data.error || data.message}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setResult({
        status: 'NETWORK_ERROR',
        ok: false,
        error: errorMessage,
      });
      addToast('error', `Erro de rede: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  async function testLogin() {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          senha: testSenha,
        }),
      });

      const data = await response.json();
      setResult({
        status: response.status,
        ok: response.ok,
        data,
      });

      if (response.ok) {
        addToast('success', 'Login funcionou!');
      } else {
        addToast('error', `Erro: ${data.error || data.message}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setResult({
        status: 'NETWORK_ERROR',
        ok: false,
        error: errorMessage,
      });
      addToast('error', `Erro de rede: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  async function testAPI() {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      setResult({
        status: response.status,
        ok: response.ok,
        data,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setResult({
        status: 'NETWORK_ERROR',
        ok: false,
        error: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-center">🧪 Debug - Sorveteria Arthies</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Testar Registro/Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="email@teste.com"
            />
            <Input
              label="Nome"
              value={testNome}
              onChange={(e) => setTestNome(e.target.value)}
              placeholder="Nome do usuário"
            />
            <Input
              label="Senha"
              type="password"
              value={testSenha}
              onChange={(e) => setTestSenha(e.target.value)}
              placeholder="Senha"
            />
            
            <div className="flex gap-2 flex-wrap">
              <Button onClick={testRegister} isLoading={loading}>
                Testar Registro
              </Button>
              <Button onClick={testLogin} isLoading={loading}>
                Testar Login
              </Button>
              <Button onClick={testAPI} isLoading={loading} variant="outline">
                Testar API /me
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto">
                <p className="mb-2">
                  <span className="text-gray-400">Status: </span>
                  <span className={result.ok ? 'text-green-400' : 'text-red-400'}>
                    {result.status}
                  </span>
                </p>
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Informações Úteis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Ambiente:</strong> {process.env.NODE_ENV}</p>
            <p><strong>URL Supabase:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Não configurada'}</p>
            <p><strong>Erros:</strong> Verifique os Toast notifications acima</p>
            <p className="mt-4 text-gray-500">
              Esta página é apenas para debug. Remova em produção!
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <a href="/login" className="text-blue-600 hover:underline">
            ← Voltar para Login
          </a>
        </div>
      </div>
    </div>
  );
}
