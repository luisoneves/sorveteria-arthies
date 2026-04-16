'use client';

import { useState } from 'react';
import { captureEvent, identifyUser } from '@/lib/analytics/posthog';

export default function ToolsTestPage() {
  const [emailResult, setEmailResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const sendTestEmail = async (type: string) => {
    setLoading(true);
    setEmailResult('');
    try {
      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      setEmailResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setEmailResult('Erro: ' + String(error));
    }
    setLoading(false);
  };

  const testAnalytics = () => {
    captureEvent('test_event', {
      page: 'tools-test',
      timestamp: new Date().toISOString(),
    });
    identifyUser('test-user-123', {
      email: 'test@example.com',
      name: 'Test User',
    });
    alert('Analytics event captured! Check PostHog dashboard.');
  };

  const testSentry = async () => {
    try {
      throw new Error('Test error from Sentry!');
    } catch (error) {
      console.error('Test error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ferramentas de Observabilidade</h1>

        <div className="grid gap-6">
          {/* Resend - Email */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">📧 Resend (Email)</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => sendTestEmail('welcome')}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Testar Welcome
              </button>
              <button
                onClick={() => sendTestEmail('admin-new-order')}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                Testar Admin
              </button>
              <button
                onClick={() => sendTestEmail('test-both')}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
              >
                Testar Ambos
              </button>
            </div>
            {emailResult && (
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {emailResult}
              </pre>
            )}
          </section>

          {/* Stripe */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">💳 Stripe (Pagamentos)</h2>
            <p className="text-gray-600 mb-4">
              Configure STRIPE_SECRET_KEY no .env para testar checkout
            </p>
            <div className="p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">
                Para testar localmente: <code className="bg-gray-200 px-1 rounded">npx stripe listen --forward-to localhost:3000/api/webhooks/stripe</code>
              </p>
            </div>
          </section>

          {/* PostHog */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">📊 PostHog (Analytics)</h2>
            <button
              onClick={testAnalytics}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Testar Analytics
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Verifique em <a href="https://app.posthog.com" target="_blank" className="text-blue-600 underline">app.posthog.com</a>
            </p>
          </section>

          {/* Sentry */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">🐛 Sentry (Error Tracking)</h2>
            <button
              onClick={testSentry}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Testar Sentry
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Verifique em <a href="https://sentry.io" target="_blank" className="text-blue-600 underline">sentry.io</a>
            </p>
          </section>

          {/* Arcjet */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">🛡️ Arcjet (Rate Limiting)</h2>
            <p className="text-gray-600 mb-4">
              Rate limiting já configurado em endpoints sensíveis
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>/api/auth/login</li>
              <li>/api/auth/register</li>
            </ul>
          </section>

          {/* Checkly */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">⏰ Checkly (Uptime)</h2>
            <p className="text-gray-600">
              Configure CHECKLY_API_KEY e CHECKLY_ACCOUNT_ID para monitorar
            </p>
            <div className="p-4 bg-gray-100 rounded mt-4">
              <p className="text-sm text-gray-600">
                <code className="bg-gray-200 px-1 rounded">npx @checkly/cli@latest test</code> para testar
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 p-4 bg-yellow-100 rounded">
          <h3 className="font-semibold">⚠️ Próximos Passos</h3>
          <ol className="list-decimal list-inside mt-2 text-sm text-gray-700">
            <li>Crie contas gratuitas em cada serviço</li>
            <li>Adicione as chaves de API ao .env.local</li>
            <li>Configure os webhooks no painel de cada serviço</li>
            <li>Teste cada ferramenta usando os botões acima</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
