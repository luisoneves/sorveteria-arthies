'use client';

import { Card, CardHeader, CardTitle, CardContent, StatusBadge } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';

const mockPedidos = [
  { id: '1', cliente: 'Maria Silva', total: 45.90, status: 'pendente', horario: '14:30' },
  { id: '2', cliente: 'João Santos', total: 32.50, status: 'em_andamento', horario: '14:15' },
  { id: '3', cliente: 'Ana Costa', total: 67.80, status: 'concluido', horario: '13:50' },
];

export default function GerenteDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Dashboard do Gerente
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Produtos Cadastrados</p>
            <p className="text-2xl font-bold text-primary-600">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Promoções Ativas</p>
            <p className="text-2xl font-bold text-green-600">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Reposiçoes Pendentes</p>
            <p className="text-2xl font-bold text-yellow-600">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Pedidos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-2">Cliente</th>
                <th className="pb-2">Horário</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPedidos.map((pedido) => (
                <tr key={pedido.id} className="border-b last:border-0">
                  <td className="py-3">{pedido.cliente}</td>
                  <td className="py-3">{pedido.horario}</td>
                  <td className="py-3">{formatCurrency(pedido.total)}</td>
                  <td className="py-3">
                    <StatusBadge status={pedido.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Links Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 pt-4">
            <span className="text-3xl">🍨</span>
            <div>
              <p className="font-medium">Produtos</p>
              <p className="text-sm text-gray-500">Editar preços e estoque</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 pt-4">
            <span className="text-3xl">🏷️</span>
            <div>
              <p className="font-medium">Promoções</p>
              <p className="text-sm text-gray-500">Criar novos descontos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 pt-4">
            <span className="text-3xl">📋</span>
            <div>
              <p className="font-medium">Reposiçoes</p>
              <p className="text-sm text-gray-500">Aprovar solicitudes</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
