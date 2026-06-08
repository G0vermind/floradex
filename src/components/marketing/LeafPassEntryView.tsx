'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Leaf, MapPin, ScanLine, TreePine, Trophy, Target, HelpCircle, QrCode, ChevronDown } from 'lucide-react'

interface Partner {
  tradeName: string
  category: string
  city: string
  stampImageUrl: string | null
}

interface Props {
  partner: Partner | null
  inviteCode?: string
  rawFrom?: string
}

function buildUrl(action: 'login' | 'register', from?: string, invite?: string) {
  const p = new URLSearchParams({ callbackUrl: '/app' })
  if (from) p.set('from', from)
  if (invite) p.set('invite', invite)
  return `/${action}?${p}`
}

export function LeafPassEntryView({ partner, inviteCode, rawFrom }: Props) {
  const router = useRouter()
  const [code, setCode] = useState(inviteCode ?? '')
  const [loading, setLoading] = useState(false)
  
  const loginUrl = buildUrl('login', rawFrom, inviteCode)
  const regUrl = buildUrl('register', rawFrom, inviteCode)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim() || loading) return
    setLoading(true)
    router.push(buildUrl('register', code.trim()))
  }

  return (
    <main className="min-h-screen bg-[#021f14] text-emerald-50 font-sans selection:bg-[#FFA800] selection:text-[#021f14]">

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 w-full z-50 bg-[#021f14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <Leaf className="w-8 h-8 text-[#FFA800] transition-transform group-hover:scale-110" />
            <span className="font-serif text-2xl font-bold tracking-wide text-white">LeafPass</span>
          </Link>

          <nav className="hidden md:flex gap-10">
            <a href="#como-funciona" className="text-sm font-medium text-emerald-200/80 hover:text-[#FFA800] transition-colors">Como Funciona</a>
            <a href="#beneficios" className="text-sm font-medium text-emerald-200/80 hover:text-[#FFA800] transition-colors">O Passaporte</a>
            <a href="#faq" className="text-sm font-medium text-emerald-200/80 hover:text-[#FFA800] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-6">
            <Link href={loginUrl} className="hidden md:block text-sm font-medium text-emerald-200/80 hover:text-white transition-colors">
              Acessar
            </Link>
            <Link href={regUrl} className="bg-[#FFA800] text-[#021f14] px-7 py-2.5 rounded-full font-bold text-sm hover:scale-105 hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(255,168,0,0.2)]">
              Criar Passaporte
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION (RESGATE) ================= */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-32 pb-24 px-6 overflow-hidden">
        {/* Efeito de luz de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#FFA800]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {partner && (
            <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-[#FFA800]/10 border border-[#FFA800]/20 text-[#FFA800] text-sm font-bold backdrop-blur-sm">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{partner.tradeName} <span className="opacity-40 mx-2">·</span> {partner.city}</span>
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Seu Passaporte para <br className="hidden md:block" />
            <span className="text-[#FFA800]">Regenerar o Planeta.</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-200/70 mb-16 max-w-2xl">
            Colecione carimbos, complete missões locais e dê vida a árvores reais. Tudo através de uma experiência gamificada.
          </p>

          {/* CAIXA MÁGICA DE RESGATE */}
          <div className="w-full max-w-xl bg-white/3 backdrop-blur-2xl border border-white/10 rounded-4xl p-8 md:p-12 shadow-2xl">
            <label className="block text-emerald-100 font-medium mb-4 text-lg text-left">
              Recebeu um código de recompensa?
            </label>
            <form onSubmit={submit} className="w-full">
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9\-]/g, ''))}
                placeholder="Ex: CAFE-VERDE-2026"
                className="w-full h-16 bg-black/40 border border-white/10 rounded-2xl px-6 text-white text-lg placeholder-emerald-100/30 focus:outline-none focus:border-[#FFA800] focus:ring-1 focus:ring-[#FFA800] mb-6 transition-all text-center tracking-wider uppercase"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="submit"
                disabled={!code.trim() || loading}
                className="w-full h-16 bg-[#FFA800] text-[#021f14] text-lg font-bold rounded-2xl hover:bg-amber-400 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Leaf className="w-5 h-5" />
                {loading ? 'Processando...' : 'Resgatar Minhas Folhas'}
              </button>
            </form>

            <div className="flex items-center gap-4 my-8 opacity-40">
              <div className="h-px bg-white flex-1"></div>
              <span className="text-sm font-medium uppercase tracking-widest">OU</span>
              <div className="h-px bg-white flex-1"></div>
            </div>

            <button className="w-full h-14 bg-transparent border border-white/20 text-emerald-50 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-colors">
              <QrCode className="w-5 h-5 text-[#FFA800]" />
              Escanear QR Code do Parceiro
            </button>
          </div>
        </div>
      </section>

      {/* ================= ESTATÍSTICAS (PROVA SOCIAL) ================= */}
      <section className="py-16 bg-[#FFA800]/2 border-y border-[#FFA800]/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-[#FFA800]/10">
          <div className="flex flex-col items-center pt-4 md:pt-0">
            <span className="text-5xl font-black text-[#FFA800] mb-2">+12k</span>
            <span className="text-emerald-200/70 font-medium">Guardiões Ativos</span>
          </div>
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <span className="text-5xl font-black text-[#FFA800] mb-2">+45k</span>
            <span className="text-emerald-200/70 font-medium">Árvores Protegidas</span>
          </div>
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <span className="text-5xl font-black text-[#FFA800] mb-2">100%</span>
            <span className="text-emerald-200/70 font-medium">Transparência On-chain</span>
          </div>
        </div>
      </section>

      {/* ================= COMO FUNCIONA ================= */}
      <section id="como-funciona" className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Três passos para mudar o mundo</h2>
          <p className="text-emerald-200/70 text-lg max-w-2xl mx-auto">Transforme suas idas ao café, compras locais ou projetos escolares em um impacto ambiental imensurável.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white/2 border border-white/5 rounded-3xl p-10 flex flex-col items-center text-center hover:bg-white/4 transition-colors">
            <div className="w-16 h-16 rounded-full bg-[#FFA800]/10 flex items-center justify-center mb-8 shrink-0">
              <MapPin className="w-8 h-8 text-[#FFA800]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">1. Explore</h3>
            <p className="text-emerald-200/60 leading-relaxed">Visite estabelecimentos sustentáveis e escolas que fazem parte da rede Florestas.Social.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white/2 border border-white/5 rounded-3xl p-10 flex flex-col items-center text-center hover:bg-white/4 transition-colors">
            <div className="w-16 h-16 rounded-full bg-[#FFA800]/10 flex items-center justify-center mb-8 shrink-0">
              <ScanLine className="w-8 h-8 text-[#FFA800]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">2. Capture</h3>
            <p className="text-emerald-200/60 leading-relaxed">Escaneie o QR Code no balcão ou digite o código da nota para capturar suas Folhas mágicas.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white/2 border border-white/5 rounded-3xl p-10 flex flex-col items-center text-center hover:bg-white/4 transition-colors">
            <div className="w-16 h-16 rounded-full bg-[#FFA800]/10 flex items-center justify-center mb-8 shrink-0">
              <TreePine className="w-8 h-8 text-[#FFA800]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">3. Evolua</h3>
            <p className="text-emerald-200/60 leading-relaxed">Acumule Folhas, suba de nível no passaporte e dê vida a mudas reais de Mogno Africano.</p>
          </div>
        </div>
      </section>

      {/* ================= FUNCIONALIDADES DO APP ================= */}
      <section id="beneficios" className="py-32 bg-black/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              O que tem dentro do seu Passaporte?
            </h2>

            <div className="flex gap-6">
              <div className="mt-1 shrink-0"><Target className="w-7 h-7 text-[#FFA800]" /></div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Missões e Desafios</h4>
                <p className="text-emerald-200/60">Complete tarefas criadas por marcas parceiras e veja a sua barra de evolução disparar.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="mt-1 shrink-0"><Trophy className="w-7 h-7 text-[#FFA800]" /></div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Troféus de Gemas</h4>
                <p className="text-emerald-200/60">Da semente ao Diamante. Desbloqueie conquistas luxuosas que provam o seu compromisso ecológico.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="mt-1 shrink-0"><TreePine className="w-7 h-7 text-[#FFA800]" /></div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Rastreabilidade Real</h4>
                <p className="text-emerald-200/60">Visualize exatamente onde as árvores que você ajudou a financiar estão sendo plantadas e cuidadas no mapa.</p>
              </div>
            </div>
          </div>

          {/* Placeholder Elegante para Imagem do App */}
          <div className="w-full h-150 bg-linear-to-br from-white/10 to-transparent rounded-[3rem] border border-white/10 flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="text-center z-10">
              <Trophy className="w-20 h-20 text-white/20 mx-auto mb-4" />
              <p className="text-white/30 font-medium tracking-widest uppercase">Visualização do App</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="py-32 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">Dúvidas Frequentes</h2>
          <p className="text-emerald-200/70">Tudo o que precisa saber sobre o LeafPass.</p>
        </div>

        <div className="flex flex-col gap-4">
          <details className="group bg-white/2 border border-white/5 rounded-2xl p-6 cursor-pointer hover:bg-white/4 transition-colors">
            <summary className="text-lg font-bold text-white flex justify-between items-center list-none outline-none">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#FFA800]" /> Como ganho Folhas?
              </div>
              <ChevronDown className="w-5 h-5 text-emerald-200/50 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="text-emerald-200/60 leading-relaxed mt-4 pl-8">
              Você ganha Folhas consumindo em comércios parceiros (escaneando o QR code na loja) ou concluindo missões em campanhas patrocinadas.
            </p>
          </details>
          
          <details className="group bg-white/2 border border-white/5 rounded-2xl p-6 cursor-pointer hover:bg-white/4 transition-colors">
            <summary className="text-lg font-bold text-white flex justify-between items-center list-none outline-none">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#FFA800]" /> O aplicativo é gratuito?
              </div>
              <ChevronDown className="w-5 h-5 text-emerald-200/50 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="text-emerald-200/60 leading-relaxed mt-4 pl-8">
              100% gratuito para o usuário final. As marcas e escolas é que patrocinam o plantio de árvores para recompensar o seu engajamento ambiental.
            </p>
          </details>

          <details className="group bg-white/2 border border-white/5 rounded-2xl p-6 cursor-pointer hover:bg-white/4 transition-colors">
            <summary className="text-lg font-bold text-white flex justify-between items-center list-none outline-none">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#FFA800]" /> As árvores são reais?
              </div>
              <ChevronDown className="w-5 h-5 text-emerald-200/50 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="text-emerald-200/60 leading-relaxed mt-4 pl-8">
              Sim! Todos os nossos ativos ambientais são Mognos Africanos monitorados com tecnologia de ponta e auditados na blockchain, garantindo impacto real.
            </p>
          </details>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#01140d] border-t border-white/5 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Comece o seu legado verde.</h2>
            <Link href={regUrl} className="inline-block bg-[#FFA800] text-[#021f14] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 hover:bg-amber-400 transition-all shadow-[0_0_30px_rgba(255,168,0,0.15)]">
              Abrir Passaporte Grátis
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                <Leaf className="w-6 h-6 text-[#FFA800] transition-transform group-hover:scale-110" />
                <span className="font-serif text-xl font-bold text-white">LeafPass</span>
              </Link>
              <p className="text-emerald-200/50 text-sm leading-relaxed">
                A tecnologia gamificada por trás do Florestas.Social. Transformando impacto em recompensas.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Aplicativo</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-emerald-200/60 hover:text-[#FFA800] transition-colors text-sm">Resgatar Código</a></li>
                <li><a href="#" className="text-emerald-200/60 hover:text-[#FFA800] transition-colors text-sm">Missões Ativas</a></li>
                <li><a href="#" className="text-emerald-200/60 hover:text-[#FFA800] transition-colors text-sm">Leaderboard</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Ecossistema</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-emerald-200/60 hover:text-[#FFA800] transition-colors text-sm">Protocolo Florestas.Social</a></li>
                <li><a href="/empresas" className="text-emerald-200/60 hover:text-[#FFA800] transition-colors text-sm">Para Empresas B2B</a></li>
                <li><a href="#" className="text-emerald-200/60 hover:text-[#FFA800] transition-colors text-sm">Auditoria Oracle</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Suporte & Legal</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-emerald-200/60 hover:text-[#FFA800] transition-colors text-sm">Termos de Uso</a></li>
                <li><a href="#" className="text-emerald-200/60 hover:text-[#FFA800] transition-colors text-sm">Política de Privacidade</a></li>
                <li><a href="#" className="text-emerald-200/60 hover:text-[#FFA800] transition-colors text-sm">Central de Ajuda</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-emerald-200/40 text-sm">
              &copy; 2026 Florestas.Social. Todos os direitos reservados.
            </p>
            <p className="text-emerald-200/30 text-xs">Construído na rede Stellar</p>
          </div>
        </div>
      </footer>

    </main>
  )
}