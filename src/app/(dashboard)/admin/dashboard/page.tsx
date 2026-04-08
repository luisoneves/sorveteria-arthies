'use client';

import { useAuth } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';

// Dados mockados - substituir por dados reais da API
const mockStats = {
  faturamentoMes: 15420.50,
  pedidosMes: 342,
  ticketMedio: 45.10,
  clientesAtivos: 156,
};

const mockVendasDiarias = [
  { dia: 'Seg', valor: 2100 },
  { dia: 'Ter', valor: 1850 },
  { dia: 'Qua', valor: 2400 },
  { dia: 'Qui', valor: 2200 },
  { dia: 'Sex', valor: 2800 },
  { dia: 'Sáb', valor: 3200 },
  { dia: 'Dom', valor: 2870 },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>

      {/* Cards de Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500 mb-1">Faturamento do Mês</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(mockStats.faturamentoMes)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500 mb-1">Pedidos do Mês</p>
            <p className="text-2xl font-bold text-primary-600">
              {mockStats.pedidosMes}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500 mb-1">Ticket Médio</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(mockStats.ticketMedio)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500 mb-1">Clientes Ativos</p>
            <p className="text-2xl font-bold text-purple-600">
              {mockStats.clientesAtivos}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Vendas */}
      <Card>
        <CardHeader>
          <CardTitle>Vendas dos Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-40 gap-2">
            {mockVendasDiarias.map((item) => {
              const maxValue = Math.max(...mockVendasDiarias.map((d) => d.valor));
              const height = (item.valor / maxValue) * 100;
              return (
                <div key={item.dia} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary-500 rounded-t transition-all"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">{item.dia}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Links Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 pt-4">
            <span className="text-3xl">👥</span>
            <div>
              <p className="font-medium">Gerenciar Usuários</p>
              <p className="text-sm text-gray-500">CRUD completo</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 pt-4">
            <span className="text-3xl">📊</span>
            <div>
              <p className="font-medium">Relatórios</p>
              <p className="text-sm text-gray-500">Faturamento e vendas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 pt-4">
            <span className="text-3xl">🚚</span>
            <div>
              <p className="font-medium">Fornecedores</p>
              <p className="text-sm text-gray-500">Gestão de compras</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
