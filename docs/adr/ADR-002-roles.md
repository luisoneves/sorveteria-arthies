# ADR-002: Sistema de Roles e Permissões

**Data:** 08/04/2026  
**Status:** Aprovado

---

## Contexto

Precisávamos de um sistema de controle de acesso com 4 roles diferentes.

## Decisão

Usar **RBAC (Role-Based Access Control)** com 4 roles hierárquicos:

| Role | Permissões |
|------|-----------|
| **admin** | Acesso total ao sistema |
| **gerente** | Gestão de produtos, preços, promoções |
| **vendedor** | PDV, vendas, fidelidade |
| **cliente** | E-commerce, carrinho, pontos |

## Implementação

1. **Middleware:** Verifica role antes de cada rota
2. **UI:** Sidebar dinâmica baseada no role
3. **API:** Validação de role em todas as rotas protegidas

## Consequências

**Positivas:**
- Flexível para adicionar novos roles
- Fácil de manter
- UI adaptativa

**Negativas:**
- Não é granular (permissões individuais)
- Role fixo (usuário não pode ter múltiplos roles)
