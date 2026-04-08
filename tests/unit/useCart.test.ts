import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '@/hooks/useCart';

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
      result.current.addItem({
        id: '1',
        nome: 'Teste',
        preco: 10,
        categoria: 'cremoso',
        ativo: true,
        estoque: 10,
      } as any);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].nome).toBe('Teste');
    expect(result.current.getItemCount()).toBe(1);
    expect(result.current.getTotal()).toBe(10);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addItem({
        id: '1',
        nome: 'Teste',
        preco: 10,
        categoria: 'cremoso',
        ativo: true,
        estoque: 10,
      } as any);
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
      result.current.addItem({
        id: '1',
        nome: 'Teste',
        preco: 10,
        categoria: 'cremoso',
        ativo: true,
        estoque: 10,
      } as any);
    });

    act(() => {
      result.current.removeItem('1');
    });

    expect(result.current.items.length).toBe(0);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addItem({
        id: '1',
        nome: 'Teste 1',
        preco: 10,
        categoria: 'cremoso',
        ativo: true,
        estoque: 10,
      } as any);
      result.current.addItem({
        id: '2',
        nome: 'Teste 2',
        preco: 20,
        categoria: 'sorbet',
        ativo: true,
        estoque: 10,
      } as any);
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
      result.current.addItem({
        id: '1',
        nome: 'Teste',
        preco: 100,
        categoria: 'cremoso',
        ativo: true,
        estoque: 10,
      } as any);
    });

    expect(result.current.getPontos()).toBe(100);
  });
});
