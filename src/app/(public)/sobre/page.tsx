'use client';

import Link from 'next/link';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🍨</span>
              <span className="font-bold text-xl text-gray-900">Arthies</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/#cardapio" className="text-gray-600 hover:text-primary-600">Cardápio</Link>
              <Link href="/promocoes" className="text-gray-600 hover:text-primary-600">Promoções</Link>
              <Link href="/login" className="text-primary-600 hover:underline">Entrar</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-6xl block mb-4">🍨</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossa História
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mais do que sorvete, entregamos momentos de felicidade.
          </p>
        </div>
      </section>

      {/* História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Como tudo começou</h2>
              <p className="text-gray-600 leading-relaxed">
                A Sorveteria Arthies nasceu em 2020 com uma missão simples: 
                oferecer gelatos artesanais de verdade, feitos com ingredientes 
                selecionados e muito carinho. O que começou como um sonho de família 
                se tornou um point badalado na cidade.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <span className="text-5xl block mb-4">🌿</span>
                <h3 className="font-semibold text-gray-900 mb-2">Ingredientes Naturais</h3>
                <p className="text-gray-600 text-sm">
                  Selecionamos os melhores ingredientes, direto de fornecedores locais.
                </p>
              </div>
              <div className="text-center p-6">
                <span className="text-5xl block mb-4">👨‍🍳</span>
                <h3 className="font-semibold text-gray-900 mb-2">Receitas Exclusivas</h3>
                <p className="text-gray-600 text-sm">
                  Nossas receitas foram desenvolvidas ao longo de anos.
                </p>
              </div>
              <div className="text-center p-6">
                <span className="text-5xl block mb-4">❤️</span>
                <h3 className="font-semibold text-gray-900 mb-2">Feito com Amor</h3>
                <p className="text-gray-600 text-sm">
                  Cada sorvete é preparado com carinho para você.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que escolher a Arthies?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <span className="text-3xl">✨</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Sem conservantes</h3>
                <p className="text-gray-600">
                  Nossos gelatos são 100% naturais, sem aditivos químicos.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">🥜</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Sem lactose opcional</h3>
                <p className="text-gray-600">
                  Temos opções sem lactose para quem precisa.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">🍫</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Chocolate artesanal</h3>
                <p className="text-gray-600">
                  Chocolate belge importado em várias versões.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">🍓</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Frutas frescas</h3>
                <p className="text-gray-600">
                  Frutas selecionadas diariamente no mercado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Venha nos conhecer!
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Você vai adorar experimentar nossos gelatos artesanais.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/#cardapio"
              className="px-8 py-3 bg-white text-pink-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Ver Cardápio
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">
            © 2026 Sorveteria Arthies. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
