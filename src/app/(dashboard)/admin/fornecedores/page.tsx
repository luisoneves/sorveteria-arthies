'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Input, StatusBadge } from '@/components/ui';
import { formatPhone } from '@/lib/utils';

interface Fornecedor {
  id: string;
  nome: string;
  contato: string;
  telefone: string;
  email: string;
  produtos: string[];
  ativo: boolean;
}

const mockFornecedores: Fornecedor[] = [
  {
    id: '1',
    nome: 'Laticínios Vale Verde',
    contato: 'João Silva',
    telefone: '(11) 99999-1111',
    email: 'joao@valeverde.com.br',
    produtos: ['Leite', 'Creme de leite', 'Manteiga'],
    ativo: true,
  },
  {
    id: '2',
    nome: 'Fábrica de Chocolate',
    contato: 'Maria Santos',
    telefone: '(11) 99999-2222',
    email: 'contato@chocofabrica.com.br',
    produtos: ['Chocolate belga', 'Nutella', 'Cacau'],
    ativo: true,
  },
  {
    id: '3',
    nome: 'Frutas Frescas Ltda',
    contato: 'Pedro Costa',
    telefone: '(11) 99999-3333',
    email: 'pedro@frutasfrescas.com.br',
    produtos: ['Morango', 'Manga', 'Maracujá', 'Limão'],
    ativo: true,
  },
  {
    id: '4',
    nome: 'Pistache Importados',
    contato: 'Ana Oliveira',
    telefone: '(11) 99999-4444',
    email: 'ana@pistacheimport.com.br',
    produtos: ['Pistache', 'Nozes', 'Amêndoas'],
    ativo: false,
  },
];

export default function FornecedoresPage() {
  const [fornecedores] = useState(mockFornecedores);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = fornecedores.filter(
    (f) =>
      f.nome.toLowerCase().includes(search.toLowerCase()) ||
      f.contato.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">🚚 Fornecedores</h1>
        <Button onClick={() => setShowModal(true)}>+ Novo Fornecedor</Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-4">
          <Input
            placeholder="Buscar fornecedor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((fornecedor) => (
          <Card key={fornecedor.id}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{fornecedor.nome}</h3>
                  <StatusBadge status={fornecedor.ativo ? 'ativo' : 'inativo'} />
                </div>
                <div className="flex gap-2">
                  <button className="text-primary-600 hover:underline text-sm">
                    Editar
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>👤</span>
                  <span>{fornecedor.contato}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📞</span>
                  <span>{formatPhone(fornecedor.telefone)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>✉️</span>
                  <span>{fornecedor.email}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Produtos fornecidos:</p>
                <div className="flex flex-wrap gap-2">
                  {fornecedor.produtos.map((produto) => (
                    <span
                      key={produto}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {produto}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-4">
              <h2 className="text-xl font-bold mb-4">Novo Fornecedor</h2>
              <div className="space-y-4">
                <Input label="Nome da Empresa" placeholder="Nome da empresa" />
                <Input label="Contato" placeholder="Nome do contato" />
                <Input label="Telefone" placeholder="(00) 00000-0000" />
                <Input label="Email" type="email" placeholder="email@empresa.com" />
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
