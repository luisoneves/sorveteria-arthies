import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface BaseEmailProps {
  previewText: string;
  children: React.ReactNode;
}

export function BaseEmail({ previewText, children }: BaseEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>{children}</Container>
      </Body>
    </Html>
  );
}

interface WelcomeEmailProps {
  nome: string;
  email: string;
}

export function WelcomeEmail({ nome, email }: WelcomeEmailProps) {
  return (
    <BaseEmail previewText="Bem-vindo à Sorveteria Arthies!">
      <Heading style={styles.heading}>Bem-vindo, {nome}! 🎉</Heading>
      <Text style={styles.text}>
        Obrigado por se cadastrar na Sorveteria Arthies. Seu cadastro foi realizado com sucesso!
      </Text>
      <Text style={styles.text}>
        Seu email: <strong>{email}</strong>
      </Text>
      <Section style={styles.buttonContainer}>
        <Button href="#" style={styles.button}>
          Ver Cardápio
        </Button>
      </Section>
      <Hr style={styles.hr} />
      <Text style={styles.footer}>
        Sorveteria Arthies - Endereço: Rua dos Sorvetes, 123 - São Paulo, SP
      </Text>
      <Text style={styles.footerSmall}>
        Você recebeu este email porque se cadastrou em nosso site.
      </Text>
    </BaseEmail>
  );
}

interface OrderConfirmationEmailProps {
  nome: string;
  pedidoId: string;
  valor: number;
  itens: string[];
}

export function OrderConfirmationEmail({
  nome,
  pedidoId,
  valor,
  itens,
}: OrderConfirmationEmailProps) {
  return (
    <BaseEmail previewText={`Confirmação do Pedido #${pedidoId}`}>
      <Heading style={styles.heading}>Pedido Confirmado! 🍦</Heading>
      <Text style={styles.text}>Olá, {nome}!</Text>
      <Text style={styles.text}>
        Seu pedido <strong>#{pedidoId}</strong> foi confirmado e está sendo preparado.
      </Text>
      <Section style={styles.orderBox}>
        <Text style={styles.orderTitle}>Resumo do Pedido:</Text>
        <ul style={styles.itemList}>
          {itens.map((item, i) => (
            <li key={i} style={styles.item}>
              {item}
            </li>
          ))}
        </ul>
        <Hr style={styles.hr} />
        <Text style={styles.total}>Total: R$ {valor.toFixed(2)}</Text>
      </Section>
      <Text style={styles.text}>
        Tempo estimado de preparo: <strong>15-20 minutos</strong>
      </Text>
      <Section style={styles.buttonContainer}>
        <Button href="#" style={styles.button}>
          Acompanhar Pedido
        </Button>
      </Section>
      <Hr style={styles.hr} />
      <Text style={styles.footer}>
        Sorveteria Arthies - Endereço: Rua dos Sorvetes, 123 - São Paulo, SP
      </Text>
    </BaseEmail>
  );
}

interface PasswordResetEmailProps {
  nome: string;
  resetUrl: string;
}

export function PasswordResetEmail({ nome, resetUrl }: PasswordResetEmailProps) {
  return (
    <BaseEmail previewText="Recuperação de senha - Sorveteria Arthies">
      <Heading style={styles.heading}>Recuperar Senha</Heading>
      <Text style={styles.text}>Olá, {nome}!</Text>
      <Text style={styles.text}>
        Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha.
      </Text>
      <Section style={styles.buttonContainer}>
        <Button href={resetUrl} style={styles.button}>
          Redefinir Senha
        </Button>
      </Section>
      <Text style={styles.textSmall}>
        Este link expira em 1 hora. Se você não solicitou esta recuperação, ignore este email.
      </Text>
      <Hr style={styles.hr} />
      <Text style={styles.footer}>
        Sorveteria Arthies - Endereço: Rua dos Sorvetes, 123 - São Paulo, SP
      </Text>
    </BaseEmail>
  );
}

interface AdminNewOrderEmailProps {
  pedidoId: string;
  cliente: string;
  valor: number;
  tipo: string;
  itens: string[];
}

export function AdminNewOrderEmail({
  pedidoId,
  cliente,
  valor,
  tipo,
  itens,
}: AdminNewOrderEmailProps) {
  return (
    <BaseEmail previewText={`Novo Pedido #${pedidoId} - Ação Necessária`}>
      <Heading style={styles.heading}>🆕 Novo Pedido Recebido!</Heading>
      <Section style={styles.orderBox}>
        <Text style={styles.orderTitle}>Pedido #{pedidoId}</Text>
        <Text style={styles.text}>
          <strong>Cliente:</strong> {cliente || 'Cliente não cadastrado'}
        </Text>
        <Text style={styles.text}>
          <strong>Tipo:</strong> {tipo}
        </Text>
        <Text style={styles.text}>
          <strong>Valor:</strong> R$ {valor.toFixed(2)}
        </Text>
        <Hr style={styles.hr} />
        <Text style={styles.orderTitle}>Itens:</Text>
        <ul style={styles.itemList}>
          {itens.map((item, i) => (
            <li key={i} style={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </Section>
      <Section style={styles.buttonContainer}>
        <Button href="#" style={styles.button}>
          Ver Pedido no Painel
        </Button>
      </Section>
      <Hr style={styles.hr} />
      <Text style={styles.footer}>
        Sorveteria Arthies - Sistema Automático
      </Text>
    </BaseEmail>
  );
}

const styles = {
  body: {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  heading: {
    color: '#1a1a1a',
    fontSize: '24px',
    fontWeight: 'bold' as const,
    marginBottom: '20px',
  },
  text: {
    color: '#4a4a4a',
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: '16px',
  },
  textSmall: {
    color: '#888888',
    fontSize: '14px',
    lineHeight: '20px',
    marginTop: '16px',
  },
  buttonContainer: {
    textAlign: 'center' as const,
    margin: '24px 0',
  },
  button: {
    backgroundColor: '#FF6B6B',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '16px',
    padding: '12px 24px',
    textDecoration: 'none',
  },
  orderBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
  },
  orderTitle: {
    color: '#1a1a1a',
    fontSize: '18px',
    fontWeight: 'bold' as const,
    marginBottom: '12px',
  },
  itemList: {
    margin: '0',
    paddingLeft: '20px',
  },
  item: {
    color: '#4a4a4a',
    fontSize: '14px',
    marginBottom: '4px',
  },
  total: {
    color: '#FF6B6B',
    fontSize: '20px',
    fontWeight: 'bold' as const,
    textAlign: 'right' as const,
    marginTop: '12px',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid #eeeeee',
    margin: '20px 0',
  },
  footer: {
    color: '#888888',
    fontSize: '14px',
    textAlign: 'center' as const,
  },
  footerSmall: {
    color: '#aaaaaa',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '8px',
  },
};
