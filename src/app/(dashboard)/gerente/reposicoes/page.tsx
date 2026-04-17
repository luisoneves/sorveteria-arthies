'use client';

import { useState } from 'react';
import { Card, CardContent, Button, StatusBadge } from '@/components/ui';
import { formatDate } from '@/lib/utils';

interface Reposicao {
  id: string;
  vendedor: string;
  itens: { nome: string; quantidade: number }[];
  observacao: string;
  status: 'solicitada' | 'aprovada' | 'rejeitada';
  data: string;
}

const mockReposicoes: Reposicao[] = [
  {
    id: '1',
    vendedor: 'João Vendedor',
    itens: [
      { nome: 'Chocolate Belga', quantidade: 10 },
      { nome: 'Pistache', quantidade: 5 },
    ],
    observacao: 'Estoque acabando no final do dia',
    status: 'solicitada',
    data: '2026-04-08T14:30:00',
  },
  {
    id: '2',
    vendedor: 'João Vendedor',
    itens: [
      { nome: 'Limão Siciliano', quantidade: 8 },
      { nome: 'Manga', quantidade: 8 },
    ],
    observacao: '',
    status: 'solicitada',
    data: '2026-04-08T11:15:00',
  },
  {
    id: '3',
    vendedor: 'João Vendedor',
    itens: [
      { nome: 'Ninho com Nutella', quantidade: 5 },
    ],
    observacao: 'Alta demanda',
    status: 'aprovada',
    data: '2026-04-07T16:45:00',
  },
];

export default function ReposicoesPage() {
  const [reposicoes, setReposicoes] = useState(mockReposicoes);

  function handleAprovar(id: string) {
    setReposicoes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'aprovada' } : r))
    );
  }

  function handleRejeitar(id: string) {
    setReposicoes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejeitada' } : r))
    );
  }

  const pendentes = reposicoes.filter((r) => r.status === 'solicitada');
  const processadas = reposicoes.filter((r) => r.status !== 'solicitada');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">📋 Reposiçoes de Estoque</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-4">
            <p className="text-yellow-800 text-sm font-medium">Pendentes</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">{pendentes.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4">
            <p className="text-green-800 text-sm font-medium">Aprovadas</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {reposicoes.filter((r) => r.status === 'aprovada').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-4">
            <p className="text-red-800 text-sm font-medium">Rejeitadas</p>
            <p className="text-3xl font-bold text-red-600 mt-1">
              {reposicoes.filter((r) => r.status === 'rejeitada').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pendentes */}
      {pendentes.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">⏳ Solicitações Pendentes</h2>
          <div className="space-y-4">
            {pendentes.map((repo) => (
              <Card key={repo.id} className="border-yellow-200">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">Reposição #{repo.id}</h3>
                        <StatusBadge status={repo.status} />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Solicitado por: {repo.vendedor} • {formatDate(repo.data)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-500 mb-2">Itens solicitados:</p>
                    <div className="space-y-1">
                      {repo.itens.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.nome}</span>
                          <span className="font-medium">x{item.quantidade}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {repo.observacao && (
                    <p className="text-sm text-gray-600 mb-4 italic">
                      💬 &quot;{repo.observacao}&quot;
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRejeitar(repo.id)}
                    >
                      ❌ Rejeitar
                    </Button>
                    <Button size="sm" onClick={() => handleAprovar(repo.id)}>
                      ✅ Aprovar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Processadas */}
      {processadas.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">✅ Solicitações Processadas</h2>
          <Card>
            <CardContent className="pt-0">
              <div className="divide-y">
                {processadas.map((repo) => (
                  <div key={repo.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reposição #{repo.id}</p>
                      <p className="text-sm text-gray-500">
                        {repo.vendedor} • {formatDate(repo.data)}
                      </p>
                    </div>
                    <StatusBadge status={repo.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {reposicoes.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500">Nenhuma solicitação de reposição</p>
        </Card>
      )}
    </div>
  );
}
