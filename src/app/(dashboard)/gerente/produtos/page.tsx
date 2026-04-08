'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Input, StatusBadge } from '@/components/ui';
import { formatCurrency, cn } from '@/lib/utils';
import { CATEGORIA_LABELS } from '@/lib/constants';

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal?: number;
  categoria: string;
  estoque: number;
  ativo: boolean;
  emPromocao: boolean;
}

const mockProdutos: Produto[] = [
  { id: '1', nome: 'Chocolate Belga', descricao: 'Gelato cremoso de chocolate belga 70% cacau', preco: 18.90, categoria: 'cremoso', estoque: 50, ativo: true, emPromocao: false },
  { id: '2', nome: 'Morango Champagne', descricao: 'Morango fresco com toque de champagne', preco: 22.50, categoria: 'cremoso', estoque: 40, ativo: true, emPromocao: false },
  { id: '3', nome: 'Pistache', descricao: 'Pistache italiano importado', preco: 24.90, categoria: 'cremoso', estoque: 30, ativo: true, emPromocao: false },
  { id: '4', nome: 'Ninho com Nutella', descricao: 'Leite em pó com Nutella genuína', preco: 22.90, precoOriginal: 26.90, categoria: 'especial', estoque: 25, ativo: true, emPromocao: true },
  { id: '5', nome: 'Limão Siciliano', descricao: 'Sorbet refrescante de limão siciliano', preco: 16.90, categoria: 'sorbet', estoque: 45, ativo: true, emPromocao: false },
  { id: '6', nome: 'Manga', descricao: 'Sorbet 100% manga tropical', preco: 16.90, categoria: 'sorbet', estoque: 5, ativo: true, emPromocao: false },
  { id: '7', nome: 'Caldav', descricao: 'Massa de biscoito crocante', preco: 4.90, categoria: 'acompanhamento', estoque: 100, ativo: true, emPromocao: false },
];

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState(mockProdutos);
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);

  const filtered = produtos.filter((p) => {
    const matchSearch = p.nome.toLowerCase().includes(search.toLowerCase());
    const matchCategoria = categoria === 'todos' || p.categoria === categoria;
    return matchSearch && matchCategoria;
  });

  function openEdit(produto: Produto) {
    setEditingProduct(produto);
    setShowModal(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">🍨 Produtos</h1>
        <Button onClick={() => { setEditingProduct(null); setShowModal(true); }}>
          + Novo Produto
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px]"
            />
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="todos">Todas categorias</option>
              <option value="cremoso">Cremosos</option>
              <option value="sorbet">Sorbets</option>
              <option value="especial">Especiais</option>
              <option value="acompanhamento">Acompanhamentos</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Estoque Baixo Alert */}
      {produtos.some((p) => p.estoque < 10) && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-4">
            <p className="text-yellow-800 font-medium">
              ⚠️ Produtos com estoque baixo:
              {produtos.filter((p) => p.estoque < 10).map((p) => p.nome).join(', ')}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((produto) => (
          <Card key={produto.id}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{produto.nome}</h3>
                  <span className="text-xs text-gray-500">
                    {CATEGORIA_LABELS[produto.categoria as keyof typeof CATEGORIA_LABELS]}
                  </span>
                </div>
                <StatusBadge status={produto.ativo ? 'ativo' : 'inativo'} />
              </div>

              <p className="text-sm text-gray-600 mb-3">{produto.descricao}</p>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xl font-bold text-primary-600">
                    {formatCurrency(produto.preco)}
                  </p>
                  {produto.precoOriginal && (
                    <p className="text-sm text-gray-400 line-through">
                      {formatCurrency(produto.precoOriginal)}
                    </p>
                  )}
                </div>
                <div className={cn(
                  'text-sm font-medium px-2 py-1 rounded',
                  produto.estoque < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                )}>
                  Estoque: {produto.estoque}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(produto)}>
                  Editar
                </Button>
                {produto.emPromocao && (
                  <span className="flex items-center px-2 bg-red-100 text-red-700 rounded text-sm font-medium">
                    🔥 OFF
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <CardContent className="pt-4">
              <h2 className="text-xl font-bold mb-4">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <div className="space-y-4">
                <Input label="Nome" placeholder="Nome do produto" defaultValue={editingProduct?.nome} />
                <Input label="Descrição" placeholder="Descrição do produto" defaultValue={editingProduct?.descricao} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Preço" type="number" step="0.01" defaultValue={editingProduct?.preco} />
                  <Input label="Estoque" type="number" defaultValue={editingProduct?.estoque} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2" defaultValue={editingProduct?.categoria}>
                    <option value="cremoso">Cremoso</option>
                    <option value="sorbet">Sorbet</option>
                    <option value="especial">Especial</option>
                    <option value="acompanhamento">Acompanhamento</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                    Cancelar
                  </Button>
                  <Button className="flex-1">
                    {editingProduct ? 'Salvar' : 'Criar'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
