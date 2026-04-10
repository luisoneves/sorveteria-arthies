'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { formatCurrency, cn } from '@/lib/utils';
import { useAuth } from '@/hooks';

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal?: number;
  categoria: string;
  emPromocao?: boolean;
}

const mockProdutos: Produto[] = [
  { id: '1', nome: 'Chocolate Belga', descricao: 'Gelato cremoso de chocolate belga 70% cacau', preco: 18.90, categoria: 'cremoso' },
  { id: '2', nome: 'Morango Champagne', descricao: 'Morango fresco com toque de champagne', preco: 22.50, categoria: 'cremoso' },
  { id: '3', nome: 'Pistache', descricao: 'Pistache italiano importado', preco: 24.90, categoria: 'cremoso' },
  { id: '4', nome: 'Ninho com Nutella', descricao: 'Leite em pó com Nutella genuína', preco: 26.90, categoria: 'especial' },
  { id: '5', nome: 'Oreo', descricao: 'Biscoito Oreo triturado no gelato de baunilha', preco: 23.90, categoria: 'especial' },
  { id: '6', nome: 'Limão Siciliano', descricao: 'Sorbet refrescante de limão siciliano', preco: 16.90, categoria: 'sorbet' },
  { id: '7', nome: 'Manga', descricao: 'Sorbet 100% manga tropical', preco: 16.90, categoria: 'sorbet' },
  { id: '8', nome: 'Maracujá', descricao: 'Sorbet de maracujá fresco', preco: 16.90, categoria: 'sorbet' },
  { id: '9', nome: 'Caldav', descricao: 'Massa de biscoito crocante', preco: 4.90, categoria: 'acompanhamento' },
  { id: '10', nome: 'Morango', descricao: 'Morango fresco fatiado', preco: 5.90, categoria: 'acompanhamento' },
  { id: '11', nome: 'Granulado', descricao: 'Mix de chocolates coloridos', preco: 4.50, categoria: 'acompanhamento' },
  { id: '12', nome: 'Combo Família', descricao: '3 gelatos + acompanhamentos', preco: 59.90, precoOriginal: 74.70, categoria: 'especial', emPromocao: true },
];

const categorias = [
  { id: 'todos', label: 'Todos' },
  { id: 'cremoso', label: 'Cremosos' },
  { id: 'sorbet', label: 'Sorbets' },
  { id: 'especial', label: 'Especiais' },
  { id: 'acompanhamento', label: 'Acompanhamentos' },
];

const promocoes = [
  { id: '1', titulo: 'Domingo de Família', descricao: 'Combo Família com 20% OFF', desconto: '20%', codigo: 'FAMILIA20' },
  { id: '2', titulo: 'Happy Hour', descricao: '2 Sorbets pelo preço de 1', desconto: '50%', codigo: 'HAPPY' },
  { id: '3', titulo: 'Sobremesa Grátis', descricao: 'Leve 2 cremosos e ganhe 1 acompanhamento', desconto: 'FREE', codigo: 'SOBREMESA' },
];

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [categoria, setCategoria] = useState('todos');

  const produtosFiltrados = categoria === 'todos'
    ? mockProdutos
    : mockProdutos.filter((p) => p.categoria === categoria);

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* ==================== NAVBAR ==================== */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🍨</span>
              <span className="font-bold text-xl text-gray-900">Arthies</span>
            </Link>

            {/* Links Centrais */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="#cardapio" className="text-gray-600 hover:text-primary-600 transition-colors">
                Cardápio
              </Link>
              <Link href="#promocoes" className="text-gray-600 hover:text-primary-600 transition-colors">
                Promoções
              </Link>
              <Link href="#sobre" className="text-gray-600 hover:text-primary-600 transition-colors">
                Sobre
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Olá, <strong className="text-gray-900">{user.nome}</strong>
                  </span>
                  <Link
                    href="/cliente/shop"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Ver Cardápio
                  </Link>
                </div>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={handleLogin}>
                    Entrar
                  </Button>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Criar Conta
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-7xl md:text-8xl mb-4 block animate-bounce">🍨</span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Sorveteria Arthies
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Gelatos artesanais feitos com ingredientes selecionados,
              receitas exclusivas e <span className="text-primary-600 font-medium">muito amor</span> ❤️
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#cardapio"
                className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Ver Cardápio
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
              >
                Criar Conta Grátis
              </Link>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 text-6xl opacity-10">🍦</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10">🍧</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10">🍨</div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <span className="text-5xl block mb-4">🌿</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ingredientes Naturais</h3>
              <p className="text-gray-600">
                Selecionados com carinho, todos naturais e de fornecedores locais
              </p>
            </div>
            <div className="text-center p-6">
              <span className="text-5xl block mb-4">👨‍🍳</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Receitas Exclusivas</h3>
              <p className="text-gray-600">
                Desenvolvidas ao longo de anos para garantir o melhor sabor
              </p>
            </div>
            <div className="text-center p-6">
              <span className="text-5xl block mb-4">⭐</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Programa de Fidelidade</h3>
              <p className="text-gray-600">
                A cada compra, acumule pontos para trocar por descontos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CATÁLOGO ==================== */}
      <section id="cardapio" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Nosso Cardápio
            </h2>
            <p className="text-gray-600 text-lg">
              Escolha seus favoritos entre nossas opções artesanais
            </p>
          </div>

          {/* Categorias */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.id)}
                className={cn(
                  'px-5 py-2 rounded-full font-medium transition-all',
                  categoria === cat.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtosFiltrados.map((produto) => (
              <Card key={produto.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">
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
                    {produto.emPromocao && (
                      <Badge variant="danger" size="sm">OFF</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{produto.descricao}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-lg font-bold text-primary-600">
                        {formatCurrency(produto.preco)}
                      </p>
                      {produto.precoOriginal && (
                        <p className="text-sm text-gray-400 line-through">
                          {formatCurrency(produto.precoOriginal)}
                        </p>
                      )}
                    </div>
                    {isAuthenticated ? (
                      <Link
                        href="/cliente/shop"
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                      >
                        Comprar
                      </Link>
                    ) : (
                      <Link
                        href="/register"
                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-200 transition-colors"
                      >
                        Entrar para Comprar
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROMOÇÕES ==================== */}
      <section id="promocoes" className="py-16 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              🔥 Promoções Malucas!
            </h2>
            <p className="text-white/90 text-lg">
              Só aqui você encontra ofertas que parecem mentira (mas não são!)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {promocoes.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform"
              >
                <div className="flex items-center justify-between mb-4">
                    <Badge variant="warning">{promo.desconto}</Badge>
                  <span className="text-3xl">🏷️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.titulo}</h3>
                <p className="text-gray-600 mb-4">{promo.descricao}</p>
                <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between">
                  <code className="text-sm font-mono text-gray-700">{promo.codigo}</code>
                  <Link
                    href="/register"
                    className="text-sm text-primary-600 font-medium hover:underline"
                  >
                    Usar →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/register"
              className="inline-block px-8 py-4 bg-white text-rose-600 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Criar Conta para Aproveitar →
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer id="sobre" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo e Descrição */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🍨</span>
                <span className="font-bold text-xl">Sorveteria Arthies</span>
              </div>
              <p className="text-gray-400 mb-4">
                Gelatos artesanais feitos com amor, ingredientes selecionados 
                e receitas exclusivas que você não encontra em nenhum outro lugar.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-2xl hover:text-primary-400 transition-colors">📸</a>
                <a href="#" className="text-2xl hover:text-primary-400 transition-colors">📘</a>
                <a href="#" className="text-2xl hover:text-primary-400 transition-colors">📱</a>
              </div>
            </div>

            {/* Links Rápidos */}
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link href="#cardapio" className="text-gray-400 hover:text-white transition-colors">Cardápio</Link></li>
                <li><Link href="#promocoes" className="text-gray-400 hover:text-white transition-colors">Promoções</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Minha Conta</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Fale Conosco</Link></li>
              </ul>
            </div>

            {/* Informações */}
            <div>
              <h4 className="font-semibold mb-4">Informações</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📍 Rua Exemplo, 123</li>
                <li>📞 (11) 99999-9999</li>
                <li>✉️ contato@arthies.com</li>
                <li>🕐 Ter a Dom: 10h às 22h</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2026 Sorveteria Arthies. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
