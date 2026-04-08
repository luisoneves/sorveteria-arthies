import { ReactNode } from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

export function EmptyState({
  icon = '📭',
  title,
  description,
  action,
  children
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
}

interface EmptyListProps extends EmptyStateProps {
  icon?: string;
}

export function EmptyList(props: EmptyListProps) {
  return <EmptyState {...props} />;
}

export function EmptySearch({ onClear }: { onClear?: () => void }) {
  return (
    <EmptyState
      icon="🔍"
      title="Nenhum resultado encontrado"
      description="Tente ajustar sua busca ou filtros para encontrar o que procura."
      action={onClear ? { label: 'Limpar filtros', onClick: onClear } : undefined}
    />
  );
}

export function EmptyCart() {
  return (
    <EmptyState
      icon="🛒"
      title="Seu carrinho está vazio"
      description="Adicione alguns gelatos deliciosos para começar!"
    />
  );
}

export function EmptyOrders() {
  return (
    <EmptyState
      icon="📦"
      title="Você ainda não tem pedidos"
      description="Faça sua primeira compra e comece a acumular pontos!"
    />
  );
}

export function EmptyProducts() {
  return (
    <EmptyState
      icon="🍨"
      title="Nenhum produto cadastrado"
      description="Comece adicionando seus gelatos ao catálogo."
    />
  );
}

export function EmptyUsers() {
  return (
    <EmptyState
      icon="👥"
      title="Nenhum usuário encontrado"
      description="Cadastre novos usuários para começar."
    />
  );
}
