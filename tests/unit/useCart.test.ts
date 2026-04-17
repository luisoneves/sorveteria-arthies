import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '@/hooks/useCart';
import type { Produto } from '@/types';

const mockProduto: Produto = {
  id: '1',
  nome: 'Teste',
  descricao: 'Teste desc',
  preco: 10,
  categoria: 'cremoso',
  ativo: true,
  estoque: 10,
  created_at: '2024-01-01',
};

describe('useCart', () => {
  it('should start with empty cart', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.getItemCount()).toBe(0);
    expect(result.current.getTotal()).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addItem(mockProduto);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].nome).toBe('Teste');
    expect(result.current.getItemCount()).toBe(1);
    expect(result.current.getTotal()).toBe(10);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addItem(mockProduto);
    });

    act(() => {
      result.current.updateQuantity('1', 3);
    });

    expect(result.current.items[0].quantidade).toBe(3);
    expect(result.current.getItemCount()).toBe(3);
    expect(result.current.getTotal()).toBe(30);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addItem(mockProduto);
    });

    act(() => {
      result.current.removeItem('1');
    });

    expect(result.current.items.length).toBe(0);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addItem({ ...mockProduto, id: '1' });
      result.current.addItem({ ...mockProduto, id: '2', nome: 'Teste 2', preco: 20 });
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.getTotal()).toBe(0);
  });

  it('should calculate points correctly', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addItem({ ...mockProduto, preco: 100 });
    });

    expect(result.current.getPontos()).toBe(100);
  });
});
