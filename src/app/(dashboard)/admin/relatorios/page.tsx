'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';

type Periodo = 'semana' | 'mes' | 'ano';

const mockDados = {
  faturamento: {
    semana: 4850.50,
    mes: 15420.00,
    ano: 89450.00,
  },
  pedidos: {
    semana: 108,
    mes: 342,
    ano: 1856,
  },
  ticketMedio: {
    semana: 44.90,
    mes: 45.10,
    ano: 48.20,
  },
  clientesNovos: {
    semana: 12,
    mes: 45,
    ano: 312,
  },
};

const vendasDiarias = [
  { dia: 'Seg', valor: 2100, pedidos: 47 },
  { dia: 'Ter', valor: 1850, pedidos: 41 },
  { dia: 'Qua', valor: 2400, pedidos: 53 },
  { dia: 'Qui', valor: 2200, pedidos: 49 },
  { dia: 'Sex', valor: 2800, pedidos: 62 },
  { dia: 'Sáb', valor: 3200, pedidos: 71 },
  { dia: 'Dom', valor: 2870, pedidos: 64 },
];

const produtosMaisVendidos = [
  { nome: 'Chocolate Belga', quantidade: 156, receita: 2948.40 },
  { nome: 'Ninho com Nutella', quantidade: 134, receita: 3604.60 },
  { nome: 'Morango Champagne', quantidade: 121, receita: 2722.50 },
  { nome: 'Pistache', quantidade: 98, receita: 2440.20 },
  { nome: 'Oreo', quantidade: 87, receita: 2079.30 },
];

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState<Periodo>('mes');

  const maxVenda = Math.max(...vendasDiarias.map((d) => d.valor));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">📊 Relatórios</h1>
        <div className="flex gap-2">
          {(['semana', 'mes', 'ano'] as Periodo[]).map((p) => (
            <Button
              key={p}
              variant={periodo === p ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setPeriodo(p)}
            >
              {p === 'semana' ? 'Semana' : p === 'mes' ? 'Mês' : 'Ano'}
            </Button>
          ))}
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-4">
            <p className="text-green-100 text-sm">Faturamento</p>
            <p className="text-3xl font-bold mt-1">
              {formatCurrency(mockDados.faturamento[periodo])}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-4">
            <p className="text-blue-100 text-sm">Pedidos</p>
            <p className="text-3xl font-bold mt-1">
              {mockDados.pedidos[periodo]}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-4">
            <p className="text-purple-100 text-sm">Ticket Médio</p>
            <p className="text-3xl font-bold mt-1">
              {formatCurrency(mockDados.ticketMedio[periodo])}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="pt-4">
            <p className="text-orange-100 text-sm">Clientes Novos</p>
            <p className="text-3xl font-bold mt-1">
              {mockDados.clientesNovos[periodo]}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vendas */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {vendasDiarias.map((item) => (
                <div key={item.dia} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary-500 rounded-t transition-all hover:bg-primary-600"
                    style={{ height: `${(item.valor / maxVenda) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500">{item.dia}</span>
                  <span className="text-xs font-medium">
                    {formatCurrency(item.valor)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Produtos Mais Vendidos */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {produtosMaisVendidos.map((produto, index) => (
                <div key={produto.nome}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium">{produto.nome}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {produto.quantidade} vendas
                    </span>
                  </div>
                  <div className="ml-8">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{
                          width: `${(produto.quantidade / produtosMaisVendidos[0].quantidade) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatCurrency(produto.receita)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exportar */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">📥 Exportar PDF</Button>
        <Button variant="outline">📊 Exportar Excel</Button>
      </div>
    </div>
  );
}
