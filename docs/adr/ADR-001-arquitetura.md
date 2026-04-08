# ADR-001: Arquitetura do Sistema

**Data:** 08/04/2026  
**Status:** Aprovado  
**Decisor:** Sistema

---

## Contexto

Precisávamos definir a arquitetura para o sistema de gestão da Sorveteria Arthies.

## Decisões

1. **Frontend:** Next.js 14 com App Router
   - Razão: SSR para SEO, hot-reload, ecossistema React maduro

2. **Estilização:** Tailwind CSS
   - Razão: Produtividade, consistência, tamanho de bundle otimizado

3. **Estado:** Zustand para cliente
   - Razão: API simples, performático, persistência nativa

4. **Validação:** Zod
   - Razão: Type-safe, schema-based, leve

5. **Backend:** Next.js API Routes (Serverless)
   - Razão: Mesma codebase, deploy simplificado

6. **Database:** PostgreSQL via Supabase
   - Razão: Gratuito, real-time, auth built-in

7. **Auth:** Cookie-based com JWT
   - Razão: Segurança (httpOnly), stateless no servidor

8. **Deploy:** Vercel
   - Razão: Otimizado para Next.js, CDN global, gratuito para starters

## Consequências

**Positivas:**
- Stack moderna e escalável
- Deploy simplificado
- Performance otimizada

**Negativas:**
- Acoplamento com Supabase (migração futura se necessário)
- Limite de recursos no tier gratuito
