'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button } from '@/components/ui';
import { useCart, useAuth } from '@/hooks';
import { formatCurrency, cn } from '@/lib/utils';
import { FIDELIDADE } from '@/lib/constants';

export default function CarrinhoPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, updateQuantity, removeItem, clearCart, getTotal, getPontos } = useCart();
  const total = getTotal();
  const pontos = getPontos();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <span className="text-8xl">🛒</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-6">Carrinho vazio</h1>
        <p className="text-gray-500 mt-2">Adicione alguns gelatos deliciosos!</p>
        <Button className="mt-6" onClick={() => router.push('/cliente/shop')}>
          Ver Produtos
        </Button>
      </div>
    );
  }

  function usarPontos() {
    if (!user || (user.pontos || 0) < FIDELIDADE.PONTOS_PARA_BONUS) return;
    const pontosParaUsar = Math.floor((user.pontos || 0) / FIDELIDADE.PONTOS_PARA_BONUS) * FIDELIDADE.PONTOS_PARA_BONUS;
    alert(`Usando ${pontosParaUsar} pontos para ${(pontosParaUsar / FIDELIDADE.PONTOS_PARA_BONUS) * FIDELIDADE.VALOR_BONUS} de desconto!`);
  }

  function finalizarPedido() {
    alert('Pedido realizado com sucesso!');
    clearCart();
    router.push('/cliente/pedidos');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">🛒 Meu Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Itens */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex gap-4 pt-4">
                <div className="w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">🍨</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.nome}</h3>
                  <p className="text-sm text-gray-500">{formatCurrency(item.preco)} cada</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantidade}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">
                    {formatCurrency(item.preco * item.quantidade)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumo */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Pontos ganhos</span>
                <span>+{pontos} ⭐</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-600">{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Fidelidade */}
          {user && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="font-medium">Programa Fidelidade</p>
                    <p className="text-sm text-gray-500">
                      {user.pontos || 0} / {FIDELIDADE.PONTOS_PARA_BONUS} pontos
                    </p>
                  </div>
                </div>
                {(user.pontos || 0) >= FIDELIDADE.PONTOS_PARA_BONUS && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-yellow-400 text-yellow-700"
                    onClick={usarPontos}
                  >
                    Usar pontos ({Math.floor((user.pontos || 0) / FIDELIDADE.PONTOS_PARA_BONUS)}x = R$ {((user.pontos || 0) / FIDELIDADE.PONTOS_PARA_BONUS) * FIDELIDADE.VALOR_BONUS})
                  </Button>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  A cada {FIDELIDADE.PONTOS_PARA_BONUS} pontos, ganhe R$ {FIDELIDADE.VALOR_BONUS} de desconto!
                </p>
              </CardContent>
            </Card>
          )}

          <Button className="w-full" onClick={finalizarPedido}>
            Finalizar Pedido
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => router.push('/cliente/shop')}
          >
            Continuar Comprando
          </Button>
        </div>
      </div>
    </div>
  );
}
