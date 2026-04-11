'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, StatusBadge } from '@/components/ui';
import { formatCurrency, cn } from '@/lib/utils';

interface ProdutoItem {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
}

type IdadeGrupo = 'adulto' | 'idoso' | 'crianca';
type Sexo = 'masculino' | 'feminino';

const mockProdutos: ProdutoItem[] = [
  { id: '1', nome: 'Chocolate Belga', preco: 18.90, categoria: 'cremoso' },
  { id: '2', nome: 'Morango com Champagne', preco: 22.50, categoria: 'cremoso' },
  { id: '3', nome: 'Pistache', preco: 24.90, categoria: 'cremoso' },
  { id: '4', nome: 'Limão Siciliano', preco: 16.90, categoria: 'sorbet' },
  { id: '5', nome: 'Manga', preco: 16.90, categoria: 'sorbet' },
  { id: '6', nome: 'Ninho com Nutella', preco: 26.90, categoria: 'especial' },
  { id: '7', nome: 'Caldav', preco: 4.90, categoria: 'acompanhamento' },
  { id: '8', nome: 'Morango', preco: 5.90, categoria: 'acompanhamento' },
];

const mockPedidos = [
  { id: '1', cliente: 'Maria Silva', total: 45.90, status: 'pendente' },
  { id: '2', cliente: 'João Santos', total: 32.50, status: 'em_andamento' },
];

export default function PDVPage() {
  const [carrinho, setCarrinho] = useState<{ produto: ProdutoItem; qtd: number }[]>([]);
  const [desconto, setDesconto] = useState(0);
  const [clienteFidelidade, setClienteFidelidade] = useState<string>('');
  
  // Campos demográficos para análise
  const [idadeGrupo, setIdadeGrupo] = useState<IdadeGrupo | ''>('');
  const [sexo, setSexo] = useState<Sexo | ''>('');

  const total = carrinho.reduce((sum, item) => sum + item.produto.preco * item.qtd, 0);
  const totalComDesconto = Math.max(0, total - desconto);

  function adicionarProduto(produto: ProdutoItem) {
    setCarrinho((prev) => {
      const existente = prev.find((item) => item.produto.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.produto.id === produto.id ? { ...item, qtd: item.qtd + 1 } : item
        );
      }
      return [...prev, { produto, qtd: 1 }];
    });
  }

  function removerProduto(produtoId: string) {
    setCarrinho((prev) => {
      const existente = prev.find((item) => item.produto.id === produtoId);
      if (existente && existente.qtd > 1) {
        return prev.map((item) =>
          item.produto.id === produtoId ? { ...item, qtd: item.qtd - 1 } : item
        );
      }
      return prev.filter((item) => item.produto.id !== produtoId);
    });
  }

  function limparCarrinho() {
    setCarrinho([]);
    setDesconto(0);
    setClienteFidelidade('');
  }

  function finalizarVenda() {
    alert(`Venda de ${formatCurrency(totalComDesconto)} finalizada!`);
    limparCarrinho();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">PDV - Ponto de Venda</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleTimeString('pt-BR')}
          </span>
          <StatusBadge status="em_andamento" />
        </div>
      </div>

      {/* Campos demográficos */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-pink-700">📊 Dados do Cliente (para análise)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* Idade */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Idade:</label>
              <div className="flex gap-2">
                {(['adulto', 'idoso', 'crianca'] as IdadeGrupo[]).map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setIdadeGrupo(idadeGrupo === tipo ? '' : tipo)}
                    className={`
                      flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize transition-all
                      ${idadeGrupo === tipo 
                        ? 'bg-pink-600 text-white shadow-md' 
                        : 'bg-white border text-gray-600 hover:border-pink-300'
                      }
                    `}
                  >
                    {tipo === 'adulto' ? '👤 Adulto' : tipo === 'idoso' ? '👴 Idoso' : '👶 Criança'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sexo */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Sexo:</label>
              <div className="flex gap-2">
                {(['masculino', 'feminino'] as Sexo[]).map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setSexo(sexo === tipo ? '' : tipo)}
                    className={`
                      flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize transition-all
                      ${sexo === tipo 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'bg-white border text-gray-600 hover:border-purple-300'
                      }
                    `}
                  >
                    {tipo === 'masculino' ? '♂️ Masc' : '♀️ Fem'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Produtos */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mockProdutos.map((produto) => (
                  <button
                    key={produto.id}
                    onClick={() => adicionarProduto(produto)}
                    className={cn(
                      'p-3 rounded-lg border text-left transition-all',
                      'hover:border-primary-500 hover:bg-primary-50',
                      'active:scale-95'
                    )}
                  >
                    <p className="font-medium text-sm truncate">{produto.nome}</p>
                    <p className="text-primary-600 font-bold mt-1">
                      {formatCurrency(produto.preco)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{produto.categoria}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Carrinho */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carrinho</CardTitle>
            </CardHeader>
            <CardContent>
              {carrinho.length === 0 ? (
                <p className="text-center text-gray-400 py-8">
                  Nenhum item no carrinho
                </p>
              ) : (
                <div className="space-y-3">
                  {carrinho.map((item) => (
                    <div key={item.produto.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.produto.nome}</p>
                        <p className="text-xs text-gray-500">x{item.qtd}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removerProduto(item.produto.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-16 text-right">
                          {formatCurrency(item.produto.preco * item.qtd)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cliente Fidelidade */}
          <Card>
            <CardContent className="pt-4">
              <Input
                label="Cliente Fidelidade (opcional)"
                placeholder="Email do cliente"
                value={clienteFidelidade}
                onChange={(e) => setClienteFidelidade(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Totais */}
          <Card className="bg-gray-50">
            <CardContent className="pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Desconto:</span>
                <Input
                  type="number"
                  className="w-24 text-right"
                  value={desconto}
                  onChange={(e) => setDesconto(Number(e.target.value))}
                />
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total:</span>
                <span className="text-primary-600">{formatCurrency(totalComDesconto)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={limparCarrinho}>
              Limpar
            </Button>
            <Button className="flex-1" onClick={finalizarVenda} disabled={carrinho.length === 0}>
              Finalizar
            </Button>
          </div>
        </div>
      </div>

      {/* Pedidos em Andamento */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos em Andamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockPedidos.map((pedido) => (
              <div key={pedido.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{pedido.cliente}</p>
                  <p className="text-sm text-gray-500">Pedido #{pedido.id}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={pedido.status} />
                  <p className="text-sm font-medium mt-1">{formatCurrency(pedido.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
