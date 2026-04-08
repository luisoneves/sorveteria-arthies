'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Input, StatusBadge } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Compra {
  id: string;
  fornecedor: string;
  itens: { nome: string; quantidade: number; preco: number }[];
  total: number;
  status: 'pendente' | 'recebido' | 'cancelado';
  dataPrevista: string;
  createdBy: string;
}

const mockCompras: Compra[] = [
  {
    id: '1',
    fornecedor: 'Laticínios Vale Verde',
    itens: [
      { nome: 'Leite 1L', quantidade: 50, preco: 4.50 },
      { nome: 'Creme de leite 200g', quantidade: 30, preco: 6.80 },
    ],
    total: 429.00,
    status: 'recebido',
    dataPrevista: '2026-04-05',
    createdBy: 'Maria Gerente',
  },
  {
    id: '2',
    fornecedor: 'Fábrica de Chocolate',
    itens: [
      { nome: 'Chocolate belga 1kg', quantidade: 10, preco: 85.00 },
    ],
    total: 850.00,
    status: 'pendente',
    dataPrevista: '2026-04-12',
    createdBy: 'Maria Gerente',
  },
  {
    id: '3',
    fornecedor: 'Frutas Frescas Ltda',
    itens: [
      { nome: 'Morango 1kg', quantidade: 20, preco: 18.00 },
      { nome: 'Manga 1kg', quantidade: 15, preco: 12.00 },
    ],
    total: 540.00,
    status: 'pendente',
    dataPrevista: '2026-04-10',
    createdBy: 'Carlos Admin',
  },
];

export default function ComprasPage() {
  const [compras] = useState(mockCompras);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">📦 Compras de Estoque</h1>
        <Button onClick={() => setShowModal(true)}>+ Nova Compra</Button>
      </div>

      {/* Próximas Compras */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-4">
            <p className="text-yellow-800 text-sm font-medium">Pendentes</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">
              {compras.filter((c) => c.status === 'pendente').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4">
            <p className="text-green-800 text-sm font-medium">Recebidas</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {compras.filter((c) => c.status === 'recebido').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <p className="text-blue-800 text-sm font-medium">Valor Total (Mês)</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {formatCurrency(mockCompras.reduce((sum, c) => sum + c.total, 0))}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Compras */}
      <div className="space-y-4">
        {compras.map((compra) => (
          <Card key={compra.id}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">
                      Compra #{compra.id}
                    </h3>
                    <StatusBadge status={compra.status} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Fornecedor: {compra.fornecedor} • Criado por: {compra.createdBy}
                  </p>
                </div>
                <p className="text-xl font-bold text-primary-600">
                  {formatCurrency(compra.total)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-500 mb-2">Itens:</p>
                <div className="space-y-1">
                  {compra.itens.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.quantidade}x {item.nome}</span>
                      <span className="text-gray-600">
                        {formatCurrency(item.preco * item.quantidade)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  📅 Previsto para: {formatDate(compra.dataPrevista)}
                </p>
                <div className="flex gap-2">
                  {compra.status === 'pendente' && (
                    <>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button size="sm" variant="secondary">
                        ✅ Marcar Recebido
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Nova Compra */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <CardContent className="pt-4">
              <h2 className="text-xl font-bold mb-4">Nova Compra</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fornecedor
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Selecione...</option>
                    <option>Laticínios Vale Verde</option>
                    <option>Fábrica de Chocolate</option>
                    <option>Frutas Frescas Ltda</option>
                  </select>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium">Itens</p>
                    <button className="text-primary-600 text-sm">+ Adicionar</button>
                  </div>
                  <p className="text-sm text-gray-500">Nenhum item adicionado</p>
                </div>
                <Input label="Data Prevista" type="date" />
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                    Cancelar
                  </Button>
                  <Button className="flex-1">Criar Compra</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
