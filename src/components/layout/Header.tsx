'use client';

import { useAuth, useCart } from '@/hooks';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';

export function Header() {
  const { user, logout } = useAuth();
  const { getItemCount, getTotal } = useCart();
  const router = useRouter();
  const cartCount = getItemCount();
  const cartTotal = getTotal();

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Olá, <strong className="text-gray-900">{user?.nome}</strong>
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
            {user?.role}
          </span>
          {user?.role === 'cliente' && (
            <span className="text-sm text-yellow-600 font-medium">
              ⭐ {user.pontos || 0} pontos
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user?.role === 'cliente' && cartCount > 0 && (
            <button
              onClick={() => router.push('/cliente/carrinho')}
              className="relative flex items-center gap-2 px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <span>🛒</span>
              <span className="text-sm font-medium">
                {cartCount} item{cartCount > 1 ? 's' : ''}
              </span>
              <span className="text-sm">
                {formatCurrency(cartTotal)}
              </span>
            </button>
          )}

          <Button variant="outline" size="sm" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
