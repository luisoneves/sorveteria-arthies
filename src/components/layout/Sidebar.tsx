'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  // Admin
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊', roles: ['admin'] },
  { label: 'Usuários', href: '/admin/usuarios', icon: '👥', roles: ['admin'] },
  { label: 'Relatórios', href: '/admin/relatorios', icon: '📈', roles: ['admin'] },
  { label: 'Fornecedores', href: '/admin/fornecedores', icon: '🚚', roles: ['admin'] },
  { label: 'Compras', href: '/admin/compras', icon: '📦', roles: ['admin'] },
  
  // Gerente
  { label: 'Dashboard', href: '/gerente/dashboard', icon: '📊', roles: ['gerente'] },
  { label: 'Produtos', href: '/gerente/produtos', icon: '🍨', roles: ['gerente'] },
  { label: 'Promoções', href: '/gerente/promocoes', icon: '🏷️', roles: ['gerente'] },
  { label: 'Reposiçoes', href: '/gerente/reposicoes', icon: '📋', roles: ['gerente'] },
  
  // Vendedor
  { label: 'PDV', href: '/vendedor/pdv', icon: '💳', roles: ['vendedor'] },
  { label: 'Vendas', href: '/vendedor/vendas', icon: '🛒', roles: ['vendedor'] },
  { label: 'Fidelidade', href: '/vendedor/fidelidade', icon: '⭐', roles: ['vendedor'] },
  
  // Cliente
  { label: 'Loja', href: '/cliente/shop', icon: '🛍️', roles: ['cliente'] },
  { label: 'Carrinho', href: '/cliente/carrinho', icon: '🛒', roles: ['cliente'] },
  { label: 'Meus Pedidos', href: '/cliente/pedidos', icon: '📦', roles: ['cliente'] },
  { label: 'Meus Pontos', href: '/cliente/pontos', icon: '🎁', roles: ['cliente'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredItems = navItems.filter((item) =>
    item.roles.includes(user?.role as UserRole)
  );

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-center">🍨 Arthies</h1>
        <p className="text-xs text-gray-400 text-center mt-1">Gestão</p>
      </div>

      <nav className="space-y-1">
        {filteredItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              pathname === item.href
                ? 'bg-primary-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            )}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
