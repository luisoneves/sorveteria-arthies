'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Input, StatusBadge } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Promocao {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'percentual' | 'fixo';
  valor: number;
  produtos: string[];
  dataInicio: string;
  dataFim: string;
  ativo: boolean;
}

const mockPromocoes: Promocao[] = [
  {
    id: '1',
    nome: 'Combo Família',
    descricao: '3 gelatos + acompanhamento com 20% OFF',
    tipo: 'percentual',
    valor: 20,
    produtos: ['Chocolate Belga', 'Morango Champagne', 'Pistache'],
    dataInicio: '2026-04-01',
    dataFim: '2026-04-30',
    ativo: true,
  },
  {
    id: '2',
    nome: 'Quarta do Sorbet',
    descricao: 'Todos os sorbets com R$ 5 OFF',
    tipo: 'fixo',
    valor: 5,
    produtos: ['Limão Siciliano', 'Manga', 'Maracujá'],
    dataInicio: '2026-04-01',
    dataFim: '2026-12-31',
    ativo: true,
  },
  {
    id: '3',
    nome: 'Especial Páscoa',
    descricao: 'Chocolate Belga com 15% OFF',
    tipo: 'percentual',
    valor: 15,
    produtos: ['Chocolate Belga'],
    dataInicio: '2026-04-10',
    dataFim: '2026-04-20',
    ativo: false,
  },
];

export default function PromocoesPage() {
  const [promocoes] = useState(mockPromocoes);
  const [showModal, setShowModal] = useState(false);

  const ativas = promocoes.filter((p) => p.ativo);
  const inativas = promocoes.filter((p) => !p.ativo);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">🏷️ Promoções</h1>
        <Button onClick={() => setShowModal(true)}>+ Nova Promoção</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4">
            <p className="text-green-800 text-sm font-medium">Ativas</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{ativas.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-4">
            <p className="text-gray-800 text-sm font-medium">Inativas</p>
            <p className="text-3xl font-bold text-gray-600 mt-1">{inativas.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-4">
            <p className="text-purple-800 text-sm font-medium">Total</p>
            <p className="text-3xl font-bold text-purple-600 mt-1">{promocoes.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Promoções */}
      <div className="space-y-4">
        {promocoes.map((promo) => (
          <Card key={promo.id}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{promo.nome}</h3>
                    <StatusBadge status={promo.ativo ? 'ativo' : 'inativo'} />
                    {promo.tipo === 'percentual' ? (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-bold">
                        -{promo.valor}%
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-bold">
                        -R$ {promo.valor}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{promo.descricao}</p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-500 mb-2">Produtos participantes:</p>
                <div className="flex flex-wrap gap-2">
                  {promo.produtos.map((produto) => (
                    <span
                      key={produto}
                      className="px-2 py-1 bg-white border border-gray-200 rounded text-sm"
                    >
                      {produto}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>📅 {formatDate(promo.dataInicio)} até {formatDate(promo.dataFim)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Nova Promoção */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <CardContent className="pt-4">
              <h2 className="text-xl font-bold mb-4">Nova Promoção</h2>
              <div className="space-y-4">
                <Input label="Nome" placeholder="Nome da promoção" />
                <Input label="Descrição" placeholder="Descrição da promoção" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option value="percentual">Percentual (%)</option>
                      <option value="fixo">Valor Fixo (R$)</option>
                    </select>
                  </div>
                  <Input label="Valor" type="number" placeholder="Ex: 20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Data Início" type="date" />
                  <Input label="Data Fim" type="date" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                    Cancelar
                  </Button>
                  <Button className="flex-1">Criar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
