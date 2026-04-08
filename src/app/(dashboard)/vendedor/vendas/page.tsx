'use client';

import { useState } from 'react';
import { Card, CardContent, Button, StatusBadge } from '@/components/ui';
import { formatCurrency, formatDateTime } from '@/lib/utils';

interface Venda {
  id: string;
  cliente: string;
  itens: string;
  total: number;
  pontos: number;
  status: 'pendente' | 'concluido' | 'cancelado';
  data: string;
}

const mockVendas: Venda[] = [
  {
    id: '1234',
    cliente: 'Ana Silva',
    itens: '2x Chocolate Belga, 1x Ninho com Nutella',
    total: 60.70,
    pontos: 61,
    status: 'concluido',
    data: '2026-04-08T14:30:00',
  },
  {
    id: '1233',
    cliente: 'Maria Santos',
    itens: '1x Morango Champagne, 1x CalDav',
    total: 27.40,
    pontos: 27,
    status: 'concluido',
    data: '2026-04-08T13:15:00',
  },
  {
    id: '1232',
    cliente: 'João Costa',
    itens: '3x Pistache',
    total: 74.70,
    pontos: 75,
    status: 'concluido',
    data: '2026-04-08T12:00:00',
  },
  {
    id: '1231',
    cliente: 'Pedro Oliveira',
    itens: '2x Limão Siciliano, 1x Manga',
    total: 50.70,
    pontos: 51,
    status: 'pendente',
    data: '2026-04-08T11:45:00',
  },
];

export default function VendasPage() {
  const [vendas] = useState(mockVendas);
  const [filtro, setFiltro] = useState<'todas' | 'concluido' | 'pendente'>('todas');

  const filtered = vendas.filter((v) => {
    if (filtro === 'todas') return true;
    return v.status === filtro;
  });

  const totalVendido = vendas
    .filter((v) => v.status === 'concluido')
    .reduce((sum, v) => sum + v.total, 0);

  const totalPontos = vendas
    .filter((v) => v.status === 'concluido')
    .reduce((sum, v) => sum + v.pontos, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">🛒 Vendas</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Total Vendido (Hoje)</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalVendido)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Vendas (Hoje)</p>
            <p className="text-2xl font-bold text-primary-600">{vendas.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Pontos Distribuídos</p>
            <p className="text-2xl font-bold text-yellow-600">⭐ {totalPontos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Ticket Médio</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalVendido / vendas.filter((v) => v.status === 'concluido').length)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        {(['todas', 'concluido', 'pendente'] as const).map((f) => (
          <Button
            key={f}
            variant={filtro === f ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFiltro(f)}
          >
            {f === 'todas' ? 'Todas' : f === 'concluido' ? 'Concluídas' : 'Pendentes'}
          </Button>
        ))}
      </div>

      {/* Lista de Vendas */}
      <Card>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="py-3 px-2">ID</th>
                  <th className="py-3 px-2">Cliente</th>
                  <th className="py-3 px-2">Itens</th>
                  <th className="py-3 px-2">Total</th>
                  <th className="py-3 px-2">Pontos</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((venda) => (
                  <tr key={venda.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-sm">#{venda.id}</td>
                    <td className="py-3 px-2 font-medium">{venda.cliente}</td>
                    <td className="py-3 px-2 text-sm text-gray-600 max-w-[200px] truncate">
                      {venda.itens}
                    </td>
                    <td className="py-3 px-2 font-bold text-primary-600">
                      {formatCurrency(venda.total)}
                    </td>
                    <td className="py-3 px-2 text-yellow-600">
                      +{venda.pontos} ⭐
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={venda.status} />
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-500">
                      {formatDateTime(venda.data)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
