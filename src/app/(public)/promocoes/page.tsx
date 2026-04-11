'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui';

const promocoes = [
  { 
    id: '1', 
    titulo: 'Domingo de Família', 
    descricao: 'Combo Família com 20% OFF. Perfeito para reunir a galera!',
    desconto: '20%', 
    codigo: 'FAMILIA20',
    validoAte: '31/12/2026'
  },
  { 
    id: '2', 
    titulo: 'Happy Hour', 
    descricao: '2 Sorbets pelo preço de 1. Das 17h às 19h!',
    desconto: '50%', 
    codigo: 'HAPPY',
    validoAte: '31/12/2026'
  },
  { 
    id: '3', 
    titulo: 'Sobremesa Grátis', 
    descricao: 'Leve 2 cremosos e ganhe 1 acompanhamento sortudo.',
    desconto: 'FREE', 
    codigo: 'SOBREMESA',
    validoAte: '31/12/2026'
  },
  { 
    id: '4', 
    titulo: 'Clube do Pistache', 
    descricao: '20% OFF em todos os sabores com pistache.',
    desconto: '20%', 
    codigo: 'PISTACHE20',
    validoAte: '30/06/2026'
  },
  { 
    id: '5', 
    titulo: 'Mega Chocolate', 
    descricao: '3 chocolates artesanais por R$49,90.',
    desconto: '15%', 
    codigo: 'CHOC15',
    validoAte: '31/05/2026'
  },
];

export default function PromocoesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🍨</span>
              <span className="font-bold text-xl text-gray-900">Arthies</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/sobre" className="text-gray-600 hover:text-primary-600">Sobre</Link>
              <Link href="/login" className="text-primary-600 hover:underline">Entrar</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-16 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <span className="text-7xl block mb-4">🏷️</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Promoções Malucas!
          </h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto">
            Ofertas que parecem mentira, mas não são!
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promocoes.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="warning">{promo.desconto}</Badge>
                  <span className="text-sm text-gray-500">
                    Válido até {promo.validoAte}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.titulo}</h3>
                <p className="text-gray-600 mb-4">{promo.descricao}</p>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Código:</p>
                  <code className="text-lg font-mono font-bold text-primary-600">
                    {promo.codigo}
                  </code>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center mt-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Usar Agora →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">
            © 2026 Sorveteria Arthies. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
