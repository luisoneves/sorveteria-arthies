# ADR-003: Programa de Fidelidade

**Data:** 08/04/2026  
**Status:** Aprovado

---

## Contexto

Precisávamos de um programa de fidelidade simples e motivador.

## Decisão

**Regra:** 1 ponto por R$ 1 gasto

**Resgate:** 20 pontos = R$ 10 de desconto

## Cálculos

```
pontos_ganhos = floor(valor_total * 1)
pontos_necessarios = 20
desconto = floor(pontos / 20) * 10
```

## Exemplo

| Gasto | Pontos Ganhos | Após 20 pts |
|-------|---------------|--------------|
| R$ 45,90 | 45 | R$ 10 desconto |
| R$ 100,00 | 100 | R$ 50 desconto |

## Consequências

**Positivas:**
- Simples de entender
- Motivador (meta clara de 20 pts)
- Não稀释a margem de lucro

**Negativas:**
- Pode ser confuso se muitos bônus simultâneos
- Não considera frequência de compra
