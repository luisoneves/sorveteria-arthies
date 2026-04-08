import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// Status Badge helper
interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusVariantMap: Record<string, BadgeProps['variant']> = {
  pendente: 'warning',
  em_andamento: 'info',
  concluido: 'success',
  cancelado: 'danger',
  pago: 'success',
  falhou: 'danger',
  aprovada: 'success',
  rejeitada: 'danger',
  comprada: 'info',
  solicitada: 'warning',
  recebida: 'success',
  ativo: 'success',
  inativo: 'default',
};

const statusLabelMap: Record<string, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
  pago: 'Pago',
  falhou: 'Falhou',
  aprovada: 'Aprovada',
  rejeitada: 'Rejeitada',
  comprada: 'Comprada',
  solicitada: 'Solicitada',
  recebida: 'Recebida',
  ativo: 'Ativo',
  inativo: 'Inativo',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusVariantMap[status] || 'default';
  const label = statusLabelMap[status] || status;

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
