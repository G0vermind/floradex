import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2026-05-27.dahlia',
})

// IDs dos produtos — criar no Stripe Dashboard e colar aqui
export const PRICE_IDS = {
  BROTO_MONTHLY:    'price_broto',    // R$ 240/mês
  RAIZ_MONTHLY:     'price_raiz',     // R$ 660/mês
  FLORESTA_MONTHLY: 'price_floresta', // R$ 1.400/mês
} as const
