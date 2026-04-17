'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { useCart, useAuth } from '@/hooks';
import { formatCurrency, cn } from '@/lib/utils';
import type { Produto, CategoriaProduto } from '@/types';

const mockProdutos: Produto[] = [
  { id: '1', nome: 'Chocolate Belga', descricao: 'Gelato cremoso de chocolate belga 70% cacau', preco: 18.90, categoria: 'cremoso', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '2', nome: 'Morango Champagne', descricao: 'Morango fresco com toque de champagne', preco: 22.50, categoria: 'cremoso', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '3', nome: 'Pistache', descricao: 'Pistache italiano importado', preco: 24.90, categoria: 'cremoso', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '4', nome: 'Ninho com Nutella', descricao: 'Leite em pó com Nutella genuína', preco: 26.90, categoria: 'especial', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '5', nome: 'Oreo', descricao: 'Biscoito Oreo triturado no gelato de baunilha', preco: 23.90, categoria: 'especial', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '6', nome: 'Limão Siciliano', descricao: 'Sorbet refrescante de limão siciliano', preco: 16.90, categoria: 'sorbet', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '7', nome: 'Manga', descricao: 'Sorbet 100% manga tropical', preco: 16.90, categoria: 'sorbet', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '8', nome: 'Maracujá', descricao: 'Sorbet de maracujá fresco', preco: 16.90, categoria: 'sorbet', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '9', nome: 'Caldav', descricao: 'Massa de biscoito crocante', preco: 4.90, categoria: 'acompanhamento', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '10', nome: 'Morango', descricao: 'Morango fresco fatiado', preco: 5.90, categoria: 'acompanhamento', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '11', nome: 'Granulado', descricao: 'Mix de chocolates coloridos', preco: 4.50, categoria: 'acompanhamento', ativo: true, estoque: 100, created_at: '2024-01-01' },
  { id: '12', nome: 'Combo Família', descricao: '3 gelatos + acompanhamentos', preco: 59.90, preco_original: 74.70, categoria: 'especial', ativo: true, estoque: 100, created_at: '2024-01-01' },
];

const categorias = [
  { id: 'todos', label: 'Todos' },
  { id: 'cremoso', label: 'Cremosos' },
  { id: 'sorbet', label: 'Sorbets' },
  { id: 'especial', label: 'Especiais' },
  { id: 'acompanhamento', label: 'Acompanhamentos' },
];

export default function ShopPage() {
  const [categoria, setCategoria] = useState<string>('todos');
  const { addItem, getItemCount } = useCart();
  const { user } = useAuth();
  const cartCount = getItemCount();

  const produtosFiltrados = categoria === 'todos'
    ? mockProdutos
    : mockProdutos.filter((p) => p.categoria === categoria);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🍨 Nossos Gelatos</h1>
          <p className="text-gray-500">Escolha seus favoritos!</p>
        </div>
        {user && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Olá, {user.nome}!</p>
            <p className="text-yellow-600 font-medium">⭐ {user.pontos || 0} pontos</p>
          </div>
        )}
      </div>

      {/* Promoções Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-4 text-white">
        <p className="font-bold text-lg">🏷️ Promoções do Dia!</p>
        <p className="text-white/90">Combo Família com 20% OFF</p>
      </div>

      {/* Categorias */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoria(cat.id)}
            className={cn(
              'px-4 py-2 rounded-full whitespace-nowrap transition-colors',
              categoria === cat.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {produtosFiltrados.map((produto) => (
          <Card key={produto.id} className="overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <span className="text-6xl">
                {produto.categoria === 'cremoso' && '🍨'}
                {produto.categoria === 'sorbet' && '🍧'}
                {produto.categoria === 'especial' && '🍦'}
                {produto.categoria === 'acompanhamento' && '🍪'}
              </span>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900">{produto.nome}</h3>
                {produto.preco_original && produto.preco_original > produto.preco && (
                  <Badge variant="danger" size="sm">OFF</Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">{produto.descricao}</p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-lg font-bold text-primary-600">
                    {formatCurrency(produto.preco)}
                  </p>
                  {produto.preco_original && (
                    <p className="text-sm text-gray-400 line-through">
                      {formatCurrency(produto.preco_original)}
                    </p>
                  )}
                </div>
                <Button size="sm" onClick={() => addItem(produto)}>
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botão Flutuante do Carrinho */}
      {cartCount > 0 && (
        <a
          href="/cliente/carrinho"
          className="fixed bottom-6 right-6 bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
        >
          <span>🛒</span>
          <span className="font-medium">{cartCount} item{cartCount > 1 ? 's' : ''}</span>
        </a>
      )}
    </div>
  );
}
