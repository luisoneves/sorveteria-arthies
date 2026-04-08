'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Input } from '@/components/ui';
import { FIDELIDADE } from '@/lib/constants';

interface ClienteFidelidade {
  id: string;
  nome: string;
  email: string;
  pontos: number;
  totalGasto: number;
  ultimaCompra: string;
}

const mockClientes: ClienteFidelidade[] = [
  { id: '1', nome: 'Ana Silva', email: 'ana@email.com', pontos: 156, totalGasto: 780.00, ultimaCompra: '2026-04-08' },
  { id: '2', nome: 'Maria Santos', email: 'maria@email.com', pontos: 89, totalGasto: 445.00, ultimaCompra: '2026-04-06' },
  { id: '3', nome: 'João Costa', email: 'joao@email.com', pontos: 234, totalGasto: 1170.00, ultimaCompra: '2026-04-05' },
  { id: '4', nome: 'Pedro Oliveira', email: 'pedro@email.com', pontos: 45, totalGasto: 225.00, ultimaCompra: '2026-04-03' },
  { id: '5', nome: 'Julia Mendes', email: 'julia@email.com', pontos: 20, totalGasto: 100.00, ultimaCompra: '2026-04-01' },
];

export default function FidelidadePage() {
  const [clientes] = useState(mockClientes);
  const [search, setSearch] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState<ClienteFidelidade | null>(null);
  const [desconto, setDesconto] = useState(0);

  const filtered = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  function aplicarDesconto() {
    if (!clienteSelecionado) return;
    
    const bonusDisponiveis = Math.floor(clienteSelecionado.pontos / FIDELIDADE.PONTOS_PARA_BONUS);
    const valorDesconto = bonusDisponiveis * FIDELIDADE.VALOR_BONUS;
    
    alert(`Desconto de ${FIDELIDADE.PONTOS_PARA_BONUS * bonusDisponiveis} pontos = ${FIDELIDADE.VALOR_BONUS * bonusDisponiveis} aplicado!`);
    setClienteSelecionado(null);
    setDesconto(0);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">⭐ Programa de Fidelidade</h1>

      {/* Info */}
      <Card className="bg-primary-50 border-primary-200">
        <CardContent className="pt-4">
          <h3 className="font-semibold text-primary-900 mb-2">Como funciona?</h3>
          <p className="text-primary-800 text-sm">
            A cada <strong>R$ 1 gasto</strong>, o cliente ganha <strong>1 ponto</strong>.
            Com <strong>{FIDELIDADE.PONTOS_PARA_BONUS} pontos</strong>, o cliente pode trocar por 
            <strong> R$ {FIDELIDADE.VALOR_BONUS} de desconto</strong>!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buscar Cliente */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Buscar Cliente</h2>
          <Input
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="space-y-2">
            {filtered.map((cliente) => (
              <Card
                key={cliente.id}
                className={`cursor-pointer transition-all ${
                  clienteSelecionado?.id === cliente.id
                    ? 'ring-2 ring-primary-500'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setClienteSelecionado(cliente)}
              >
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{cliente.nome}</p>
                      <p className="text-sm text-gray-500">{cliente.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-yellow-600">⭐ {cliente.pontos}</p>
                      <p className="text-xs text-gray-500">pontos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detalhes e Aplicar Desconto */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Aplicar Desconto</h2>
          
          {clienteSelecionado ? (
            <Card>
              <CardContent className="pt-4">
                <div className="text-center mb-6">
                  <p className="text-6xl mb-2">👤</p>
                  <h3 className="text-xl font-bold">{clienteSelecionado.nome}</h3>
                  <p className="text-gray-500">{clienteSelecionado.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-yellow-50 rounded-lg p-3 text-center">
                    <p className="text-3xl font-bold text-yellow-600">⭐ {clienteSelecionado.pontos}</p>
                    <p className="text-sm text-gray-500">Pontos</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-3xl font-bold text-green-600">R$ {clienteSelecionado.totalGasto.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Total Gasto</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Bônus disponível:</p>
                  <p className="font-bold text-lg text-primary-600">
                    {Math.floor(clienteSelecionado.pontos / FIDELIDADE.PONTOS_PARA_BONUS)}x = R$ {(Math.floor(clienteSelecionado.pontos / FIDELIDADE.PONTOS_PARA_BONUS) * FIDELIDADE.VALOR_BONUS).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {clienteSelecionado.pontos % FIDELIDADE.PONTOS_PARA_BONUS} pontos para o próximo bônus
                  </p>
                </div>

                <Button className="w-full" onClick={aplicarDesconto}>
                  Aplicar Desconto de R$ {(Math.floor(clienteSelecionado.pontos / FIDELIDADE.PONTOS_PARA_BONUS) * FIDELIDADE.VALOR_BONUS).toFixed(2)}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full mt-2"
                  onClick={() => setClienteSelecionado(null)}
                >
                  Cancelar
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <p className="text-gray-500">Selecione um cliente para aplicar desconto</p>
            </Card>
          )}
        </div>
      </div>

      {/* Top Clientes */}
      <div>
        <h2 className="text-lg font-semibold mb-4">🏆 Top Clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clientes
            .sort((a, b) => b.pontos - a.pontos)
            .slice(0, 3)
            .map((cliente, index) => (
              <Card key={cliente.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </span>
                    <div>
                      <p className="font-semibold">{cliente.nome}</p>
                      <p className="text-yellow-600 font-bold">⭐ {cliente.pontos} pontos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
