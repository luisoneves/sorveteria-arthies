// ========================================
// Mock Dados Dashboard — 18 meses (Out/2024 - Abr/2026)
// ========================================
// Dados realistas baseados em sorveteria média brasileira

export interface VendaDiaria {
  data: string;
  dia: string;
  valor: number;
  pedidos: number;
  ticketMedio: number;
}

export interface VendaPorHora {
  hora: number;
  segunda: number;
  terca: number;
  quarta: number;
  quinta: number;
  sexta: number;
  sabado: number;
  domingo: number;
}

export interface ProdutoMaisVendido {
  id: string;
  nome: string;
  quantidade: number;
  receita: number;
}

export interface DadosDemograficos {
  adulto: number;
  idoso: number;
  crianca: number;
  masculino: number;
  feminino: number;
}

// Gerar array de datas (18 meses)
function gerarDatas(): string[] {
  const datas: string[] = [];
  const startDate = new Date('2024-10-01');
  const endDate = new Date('2026-04-11');
  
  const current = new Date(startDate);
  while (current <= endDate) {
    datas.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return datas;
}

// Dados por dia da semana (média realista)
const mediaPorDiaSemana = {
  segunda: 1200,
  terca: 1100,
  quarta: 1300,
  quinta: 1400,
  sexta: 1800,
  sabado: 2500,
  domingo: 2300,
};

// Gerar vendas diárias realistas
export function gerarVendasDiarias(): VendaDiaria[] {
  const vendas: VendaDiaria[] = [];
  const datas = gerarDatas();
  const diasPortugues = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
  
  datas.forEach((data) => {
    const date = new Date(data);
    const diaSemana = diasPortugues[date.getDay()];
    const mes = date.getMonth();
    const isFerias = mes >= 11 || mes <= 1;
    const isQuente = mes >= 9 && mes <= 3;
    
    // Multiplicador sazonal
    let multiplicador = 1;
    if (isQuente) multiplicador = 1.4;
    if (isFerias) multiplicador = 1.6;
    if (diaSemana === 'sabado' || diaSemana === 'domingo') multiplicador *= 1.3;
    
    const valorBase = mediaPorDiaSemana[diaSemana as keyof typeof mediaPorDiaSemana] || 1500;
    const valor = Math.round(valorBase * multiplicador * (0.8 + Math.random() * 0.4));
    const pedidos = Math.round(valor / 35);
    
    vendas.push({
      data,
      dia: diaSemana,
      valor,
      pedidos,
      ticketMedio: Math.round(valor / pedidos),
    });
  });
  
  return vendas;
}

// Vendas por hora (picos identificados)
export function gerarVendasPorHora(): VendaPorHora[] {
  return [
    { hora: 10, segunda: 80, terca: 75, quarta: 90, quinta: 85, sexta: 120, sabado: 180, domingo: 160 },
    { hora: 11, segunda: 120, terca: 110, quarta: 130, quinta: 125, sexta: 180, sabado: 250, domingo: 220 },
    { hora: 12, segunda: 180, terca: 170, quarta: 200, quinta: 190, sexta: 280, sabado: 380, domingo: 340 },
    { hora: 13, segunda: 220, terca: 210, quarta: 250, quinta: 240, sexta: 320, sabado: 420, domingo: 380 },
    { hora: 14, segunda: 280, terca: 270, quarta: 320, quinta: 300, sexta: 400, sabado: 520, domingo: 460 },
    { hora: 15, segunda: 320, terca: 310, quarta: 360, quinta: 340, sexta: 450, sabado: 580, domingo: 520 },
    { hora: 16, segunda: 350, terca: 340, quarta: 400, quinta: 380, sexta: 520, sabado: 650, domingo: 580 },
    { hora: 17, segunda: 400, terca: 380, quarta: 450, quinta: 420, sexta: 600, sabado: 750, domingo: 680 },
    { hora: 18, segunda: 480, terca: 450, quarta: 540, quinta: 500, sexta: 720, sabado: 900, domingo: 800 },
    { hora: 19, segunda: 520, terca: 490, quarta: 600, quinta: 560, sexta: 800, sabado: 1000, domingo: 880 },
    { hora: 20, segunda: 480, terca: 450, quarta: 550, quinta: 510, sexta: 750, sabado: 920, domingo: 820 },
    { hora: 21, segunda: 380, terca: 360, quarta: 420, quinta: 390, sexta: 580, sabado: 720, domingo: 640 },
    { hora: 22, segunda: 280, terca: 260, quarta: 320, quinta: 290, sexta: 420, sabado: 520, domingo: 460 },
  ];
}

// Produtos mais vendidos
export function gerarProdutosMaisVendidos(): ProdutoMaisVendido[] {
  return [
    { id: '1', nome: 'Casquinha Chocolate', quantidade: 12450, receita: 12450 * 8.90 },
    { id: '2', nome: 'Morango com Nutella', quantidade: 9820, receita: 9820 * 18.90 },
    { id: '3', nome: 'Ninho com Morango', quantidade: 8640, receita: 8640 * 16.90 },
    { id: '4', nome: 'Pistache Premium', quantidade: 6280, receita: 6280 * 24.90 },
    { id: '5', nome: 'Caldav', quantidade: 5420, receita: 5420 * 4.50 },
    { id: '6', nome: ' Sundae de Chocolate', quantidade: 4850, receita: 4850 * 14.90 },
    { id: '7', nome: 'Copão Misto', quantidade: 4200, receita: 4200 * 22.90 },
    { id: '8', nome: 'Sorvete 1L', quantidade: 3850, receita: 3850 * 32.90 },
    { id: '9', nome: 'Torrada', quantidade: 3200, receita: 3200 * 5.90 },
    { id: '10', nome: 'Bebida Lactea', quantidade: 2850, receita: 2850 * 7.90 },
  ];
}

// Dados demográficos
export function gerarDadosDemograficos(): DadosDemograficos {
  return {
    adulto: 58,
    idoso: 12,
    crianca: 30,
    masculino: 42,
    feminino: 58,
  };
}

// Estatísticas gerais
export interface StatsGeral {
  faturamentoTotal: number;
  pedidosTotal: number;
  ticketMedioGeral: number;
  clientesAtivos: number;
  produtosCadastrados: number;
}

export function gerarStatsGeral(): StatsGeral {
  return {
    faturamentoTotal: 287450.80,
    pedidosTotal: 8452,
    ticketMedioGeral: 34.01,
    clientesAtivos: 342,
    produtosCadastrados: 48,
  };
}

// Período atual (mês)
export function gerarStatsMesAtual() {
  return {
    faturamentoMes: 18420.50,
    pedidosMes: 542,
    ticketMedio: 33.98,
    clientesAtivos: 89,
    crescimento: 12.4,
  };
}