import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRICE_IDS } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { priceKey, paymentMethod } = await req.json()
    // paymentMethod: 'card' | 'pix'

    const priceId = PRICE_IDS[priceKey as keyof typeof PRICE_IDS]
    if (!priceId) return NextResponse.json({ error: 'Plano inválido' }, { status: 400 })

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      payment_method_types: paymentMethod === 'pix' ? ['pix'] : ['card'],
      success_url: `${baseUrl}/bem-vindo?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#planos`,
      locale: 'pt-BR',
      billing_address_collection: 'required',
      // Metadata para criar o parceiro após pagamento confirmado
      metadata: { planKey: priceKey },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message || 'Erro ao processar checkout' }, { status: 500 })
  }
}
