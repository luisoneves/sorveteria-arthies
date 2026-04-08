import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <span className="text-8xl">🍨</span>
          <h1 className="text-5xl font-bold text-gray-900 mt-6">
            Sorveteria Arthies
          </h1>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Gelatos artesanais feitos com ingredientes selecionados,
            receitas exclusivas e muito amor
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link
              href="/login"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Cadastrar
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6">
            <span className="text-5xl">🌿</span>
            <h3 className="text-xl font-semibold mt-4">Ingredientes Naturais</h3>
            <p className="text-gray-600 mt-2">
              Selecionamos os melhores ingredientes, todos naturais e de fornecedores locais
            </p>
          </div>

          <div className="text-center p-6">
            <span className="text-5xl">🍦</span>
            <h3 className="text-xl font-semibold mt-4">Receitas Exclusivas</h3>
            <p className="text-gray-600 mt-2">
              Nossas receitas foram desenvolvidas ao longo de anos para garantir o melhor sabor
            </p>
          </div>

          <div className="text-center p-6">
            <span className="text-5xl">⭐</span>
            <h3 className="text-xl font-semibold mt-4">Programa de Fidelidade</h3>
            <p className="text-gray-600 mt-2">
              A cada compra, você acumula pontos que podem ser trocados por descontos
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Sorveteria Arthies. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
