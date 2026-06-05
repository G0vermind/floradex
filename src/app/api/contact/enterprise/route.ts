import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Here we would typically save to the database and send an email/notification
    console.log('New enterprise contact request:', data)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Erro ao processar formulário' }, { status: 500 })
  }
}
