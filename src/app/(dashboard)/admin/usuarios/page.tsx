'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge, StatusBadge } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { ROLE_LABELS } from '@/lib/constants';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'gerente' | 'vendedor' | 'cliente';
  pontos: number;
  ativo: boolean;
  created_at: string;
}

const mockUsuarios: Usuario[] = [
  { id: '1', nome: 'Carlos Admin', email: 'admin@arthies.com', role: 'admin', pontos: 0, ativo: true, created_at: '2026-01-01' },
  { id: '2', nome: 'Maria Gerente', email: 'maria@arthies.com', role: 'gerente', pontos: 0, ativo: true, created_at: '2026-01-15' },
  { id: '3', nome: 'João Vendedor', email: 'joao@arthies.com', role: 'vendedor', pontos: 0, ativo: true, created_at: '2026-02-01' },
  { id: '4', nome: 'Ana Cliente', email: 'ana@email.com', role: 'cliente', pontos: 156, ativo: true, created_at: '2026-03-01' },
  { id: '5', nome: 'Pedro Cliente', email: 'pedro@email.com', role: 'cliente', pontos: 89, ativo: true, created_at: '2026-03-15' },
];

const roleColors = {
  admin: 'bg-purple-100 text-purple-800',
  gerente: 'bg-blue-100 text-blue-800',
  vendedor: 'bg-green-100 text-green-800',
  cliente: 'bg-gray-100 text-gray-800',
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  function toggleAtivo(id: string) {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ativo: !u.ativo } : u))
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">👥 Usuários</h1>
        <Button onClick={() => setShowModal(true)}>+ Novo Usuário</Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-4">
          <Input
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Lista de Usuários */}
      <Card>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="py-3 px-2">Nome</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">Tipo</th>
                  <th className="py-3 px-2">Pontos</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Data</th>
                  <th className="py-3 px-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{usuario.nome}</td>
                    <td className="py-3 px-2 text-gray-600">{usuario.email}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[usuario.role]}`}>
                        {ROLE_LABELS[usuario.role]}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {usuario.role === 'cliente' ? (
                        <span className="text-yellow-600">⭐ {usuario.pontos}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={usuario.ativo ? 'ativo' : 'inativo'} />
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-500">
                      {formatDate(usuario.created_at)}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button className="text-primary-600 hover:underline text-sm">
                          Editar
                        </button>
                        <button
                          onClick={() => toggleAtivo(usuario.id)}
                          className={`text-sm hover:underline ${
                            usuario.ativo ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {usuario.ativo ? 'Desativar' : 'Ativar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Novo Usuário */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Novo Usuário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Nome" placeholder="Nome completo" />
              <Input label="Email" type="email" placeholder="email@exemplo.com" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="cliente">Cliente</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="gerente">Gerente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <Input label="Telefone" placeholder="(00) 00000-0000" />
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button className="flex-1">Criar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
