'use client';

import Link from 'next/link';
import { useAuth, useCart } from '@/hooks';
import { Card, CardContent } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { FIDELIDADE } from '@/lib/constants';

export default function ClienteIndexPage() {
  const { user } = useAuth();
  const { getItemCount, getTotal } = useCart();
  const cartCount = getItemCount();
  const cartTotal = getTotal();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-6xl">🍨</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Bem-vindo, {user?.nome}!
        </h1>
        <p className="text-gray-500 mt-2">
          O que você gostaria de fazer hoje?
        </p>
      </div>

      {/* Pontos */}
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardContent className="pt-4 text-center">
          <p className="text-white/80">Seus pontos de fidelidade</p>
          <p className="text-5xl font-bold mt-2">⭐ {user?.pontos || 0}</p>
          <p className="text-white/80 text-sm mt-2">
            {FIDELIDADE.PONTOS_PARA_BONUS - ((user?.pontos || 0) % FIDELIDADE.PONTOS_PARA_BONUS)} pontos para seu próximo bônus de R$ {FIDELIDADE.VALOR_BONUS}!
          </p>
          <div className="w-full bg-white/30 rounded-full h-3 mt-3 mx-auto max-w-md">
            <div
              className="bg-white rounded-full h-3"
              style={{
                width: `${((user?.pontos || 0) % FIDELIDADE.PONTOS_PARA_BONUS) / FIDELIDADE.PONTOS_PARA_BONUS * 100}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/cliente/shop">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
            <CardContent className="pt-6 text-center">
              <span className="text-5xl">🛍️</span>
              <h3 className="font-semibold text-lg mt-3">Comprar</h3>
              <p className="text-sm text-gray-500 mt-1">Ver nossos gelatos</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/cliente/carrinho">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full relative">
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <CardContent className="pt-6 text-center">
              <span className="text-5xl">🛒</span>
              <h3 className="font-semibold text-lg mt-3">Carrinho</h3>
              <p className="text-sm text-gray-500 mt-1">
                {cartCount > 0 ? `${cartCount} itens - ${formatCurrency(cartTotal)}` : 'Seu carrinho'}
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/cliente/pedidos">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
            <CardContent className="pt-6 text-center">
              <span className="text-5xl">📦</span>
              <h3 className="font-semibold text-lg mt-3">Pedidos</h3>
              <p className="text-sm text-gray-500 mt-1">Seus pedidos anteriores</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/cliente/pontos">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
            <CardContent className="pt-6 text-center">
              <span className="text-5xl">🎁</span>
              <h3 className="font-semibold text-lg mt-3">Pontos</h3>
              <p className="text-sm text-gray-500 mt-1">Histórico e resgates</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Promoções */}
      <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">🏷️ Promoções do Dia!</p>
              <p className="text-white/90">Combo Família com 20% OFF</p>
            </div>
            <Link
              href="/cliente/shop"
              className="px-4 py-2 bg-white text-pink-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Ver Agora
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
