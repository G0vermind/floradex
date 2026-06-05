import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as any
      console.log('Payment successful for session:', session.id)
      
      // Quando o pagamento é confirmado:
      // 1. Criar User no banco com role: COMPANY
      // 2. Criar Company com isActive: true
      // 3. Gerar monthlyQrSecret inicial
      // 4. Enviar e-mail de boas-vindas com link de acesso ao painel
      
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
