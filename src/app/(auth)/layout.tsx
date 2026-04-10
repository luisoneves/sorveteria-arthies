'use client';

import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Navbar Simplificada */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🍨</span>
              <span className="font-bold text-xl text-gray-900">Arthies</span>
            </Link>

            {/* Link Voltar */}
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Voltar para Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex items-center justify-center py-8">
        {children}
      </main>

      {/* Footer Minimalista */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Sorveteria Arthies. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
