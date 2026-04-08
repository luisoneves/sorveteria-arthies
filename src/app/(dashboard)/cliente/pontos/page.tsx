'use client';

import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import { formatCurrency, formatDate } from '@/lib/utils';
import { FIDELIDADE } from '@/lib/constants';

const mockTransacoes = [
  { id: '1', tipo: 'ganho' as const, pontos: 68, descricao: 'Pedido #1234', data: '2026-04-08' },
  { id: '2', tipo: 'uso' as const, pontos: 20, descricao: 'Desconto Pedido #1230', data: '2026-04-05' },
  { id: '3', tipo: 'ganho' as const, pontos: 46, descricao: 'Pedido #1230', data: '2026-04-05' },
  { id: '4', tipo: 'ganho' as const, pontos: 33, descricao: 'Pedido #1228', data: '2026-04-03' },
];

export default function PontosPage() {
  const { user } = useAuth();
  const pontos = user?.pontos || 0;
  const bonusDisponiveis = Math.floor(pontos / FIDELIDADE.PONTOS_PARA_BONUS);
  const valorBonus = bonusDisponiveis * FIDELIDADE.VALOR_BONUS;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">⭐ Meus Pontos</h1>

      {/* Card Principal de Pontos */}
      <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
        <CardContent className="pt-6 text-center">
          <p className="text-white/80 text-sm">Pontos Acumulados</p>
          <p className="text-5xl font-bold mt-2">{pontos}</p>
          <p className="text-white/80 mt-1">⭐ pontos</p>

          {bonusDisponiveis > 0 && (
            <div className="mt-4 p-3 bg-white/20 rounded-lg">
              <p className="text-sm">Você tem {bonusDisponiveis} bônus disponível(s)!</p>
              <p className="font-bold">
                {formatCurrency(valorBonus)} de desconto
              </p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-sm text-white/80">
              Próximo bônus em {FIDELIDADE.PONTOS_PARA_BONUS - (pontos % FIDELIDADE.PONTOS_PARA_BONUS)} pontos
            </p>
            <div className="w-full bg-white/30 rounded-full h-2 mt-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${(pontos % FIDELIDADE.PONTOS_PARA_BONUS) / FIDELIDADE.PONTOS_PARA_BONUS * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Como Funciona */}
      <Card>
        <CardHeader>
          <CardTitle>Como Funciona?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-lg">
                1
              </div>
              <div>
                <p className="font-medium">Ganhe pontos</p>
                <p className="text-sm text-gray-500">
                  A cada R$ 1 gasto, você ganha {FIDELIDADE.PONTOS_POR_REAL} ponto
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-lg">
                2
              </div>
              <div>
                <p className="font-medium">Acumule</p>
                <p className="text-sm text-gray-500">
                  A cada {FIDELIDADE.PONTOS_PARA_BONUS} pontos, você ganha R$ {FIDELIDADE.VALOR_BONUS} de desconto
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-lg">
                3
              </div>
              <div>
                <p className="font-medium">Resgate</p>
                <p className="text-sm text-gray-500">
                  Use seus pontos no carrinho para obter desconto!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Transações */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTransacoes.map((transacao) => (
              <div
                key={transacao.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-lg ${
                      transacao.tipo === 'ganho' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transacao.tipo === 'ganho' ? '📥' : '📤'}
                  </span>
                  <div>
                    <p className="font-medium">{transacao.descricao}</p>
                    <p className="text-sm text-gray-500">{formatDate(transacao.data)}</p>
                  </div>
                </div>
                <span
                  className={`font-bold ${
                    transacao.tipo === 'ganho' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transacao.tipo === 'ganho' ? '+' : '-'}{transacao.pontos}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
