'use client';

import { Card, CardContent, StatusBadge } from '@/components/ui';
import { formatCurrency, formatDateTime } from '@/lib/utils';

const mockPedidos = [
  {
    id: '1234',
    data: '2026-04-08T14:30:00',
    total: 67.80,
    status: 'concluido',
    itens: '2x Chocolate Belga, 1x Ninho com Nutella',
  },
  {
    id: '1233',
    data: '2026-04-06T16:45:00',
    total: 45.90,
    status: 'concluido',
    itens: '1x Morango Champagne, 1x Limão Siciliano',
  },
  {
    id: '1232',
    data: '2026-04-05T19:00:00',
    total: 32.50,
    status: 'concluido',
    itens: '3x CalDav, 1x Granulado',
  },
];

export default function PedidosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">📦 Meus Pedidos</h1>

      {mockPedidos.length === 0 ? (
        <Card className="text-center py-12">
          <span className="text-6xl">📦</span>
          <p className="text-gray-500 mt-4">Você ainda não fez nenhum pedido</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {mockPedidos.map((pedido) => (
            <Card key={pedido.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Pedido #{pedido.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(pedido.data)}
                    </p>
                  </div>
                  <StatusBadge status={pedido.status} />
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">{pedido.itens}</p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-gray-500">Total</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(pedido.total)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
