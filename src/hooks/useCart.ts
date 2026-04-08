'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProdutoCarrinho, Produto } from '@/types';
import { calculatePoints, FIDELIDADE } from '@/lib/constants';

interface CartState {
  items: ProdutoCarrinho[];
  addItem: (produto: Produto) => void;
  removeItem: (produtoId: string) => void;
  updateQuantity: (produtoId: string, quantidade: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDesconto: () => number;
  getTotal: () => number;
  getPontos: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (produto: Produto) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === produto.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === produto.id
                  ? { ...item, quantidade: item.quantidade + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...produto, quantidade: 1 }],
          };
        });
      },

      removeItem: (produtoId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== produtoId),
        }));
      },

      updateQuantity: (produtoId: string, quantidade: number) => {
        if (quantidade <= 0) {
          get().removeItem(produtoId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === produtoId ? { ...item, quantidade } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.preco * item.quantidade,
          0
        );
      },

      getDesconto: () => {
        return get().items.reduce(
          (sum, item) =>
            sum + (item.desconto || 0) * item.quantidade,
          0
        );
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const desconto = get().getDesconto();
        return Math.max(0, subtotal - desconto);
      },

      getPontos: () => {
        return calculatePoints(get().getTotal(), FIDELIDADE.PONTOS_POR_REAL);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantidade, 0);
      },
    }),
    {
      name: 'arthies-cart',
    }
  )
);
