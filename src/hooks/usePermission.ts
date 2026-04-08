'use client';

import { useAuth } from './useAuth';
import type { UserRole } from '@/types';

export function usePermission() {
  const { user, isAuthenticated } = useAuth();

  const hasRole = (allowedRoles: UserRole[]): boolean => {
    if (!isAuthenticated || !user) return false;
    return allowedRoles.includes(user.role);
  };

  const isAdmin = (): boolean => hasRole(['admin']);
  const isGerente = (): boolean => hasRole(['admin', 'gerente']);
  const isVendedor = (): boolean => hasRole(['admin', 'gerente', 'vendedor']);
  const isCliente = (): boolean => user?.role === 'cliente';

  const canManageUsers = (): boolean => isAdmin();
  const canManageProdutos = (): boolean => hasRole(['admin', 'gerente']);
  const canCreatePromocoes = (): boolean => hasRole(['admin', 'gerente']);
  const canSell = (): boolean => hasRole(['admin', 'gerente', 'vendedor']);
  const canBuy = (): boolean => user?.role === 'cliente';

  return {
    user,
    isAuthenticated,
    hasRole,
    isAdmin,
    isGerente,
    isVendedor,
    isCliente,
    canManageUsers,
    canManageProdutos,
    canCreatePromocoes,
    canSell,
    canBuy,
  };
}
