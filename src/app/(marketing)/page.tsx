'use client';
import React from 'react';
import Image from 'next/image';
import { Leaf, Box, Sprout, Network, Zap, ArrowRight, TestTube, TreePine } from 'lucide-react';

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#14120E] via-[#0F1612] to-[#0A0A0A] text-slate-200 font-sans selection:bg-emerald-900 selection:text-emerald-100">
      
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full h-24 z-50 border-b border-stone-800/50 bg-[#14120E]/50 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl h-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer">
            <span className="text-3xl drop-shadow-md">🌿</span>
            <span className="font-serif text-2xl font-bold tracking-widest uppercase text-stone-200">
              Florestas<span className="text-emerald-500">.</span>Social
            </span>
          </div>

          <nav className="hidden md:flex gap-10">
            <a href="#compendio" className="text-xs font-mono uppercase tracking-widest text-stone-400 hover:text-emerald-400 transition-colors">O Compêndio</a>
            <a href="#dnft" className="text-xs font-mono uppercase tracking-widest text-stone-400 hover:text-emerald-400 transition-colors">Matrizes dNFT</a>
            <a href="#economia" className="text-xs font-mono uppercase tracking-widest text-stone-400 hover:text-emerald-400 transition-colors">Economia Web3</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="/store" className="h-12 px-8 bg-linear-to-r from-emerald-900 to-emerald-800 border border-emerald-700/50 text-emerald-50 rounded-md flex items-center justify-center text-sm font-serif tracking-widest hover:from-emerald-800 hover:to-emerald-700 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              Abrir a App <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-40 md:pt-52 pb-24 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-100 bg-emerald-900/20 blur-[150px] pointer-events-none rounded-[100%]"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-900/10 blur-[120px] pointer-events-none rounded-full"></div>
        
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-stone-900/80 border border-stone-800 rounded-full text-stone-400 text-xs font-mono tracking-widest uppercase mb-8 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Construído em Soroban (Stellar)
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] mb-8 text-stone-200 drop-shadow-xl">
            A sua carteira agora<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400 italic font-light drop-shadow-lg">
              cultiva a vida real.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-400 max-w-2xl mb-12 leading-relaxed font-serif">
            Uma experiência web2.5 onde extrai pacotes simbióticos, coleciona reinos botânicos no seu compêndio e nutre árvores Matrizes (dNFTs) baseadas em ativos reais (Mogno Africano).
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            <a href="/store" className="py-4 px-10 bg-stone-200 text-[#14120E] font-serif tracking-widest text-sm rounded-md shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all">
              Começar a Explorar
            </a>
            <a href="#como-funciona" className="py-4 px-10 bg-transparent border border-stone-700 text-stone-300 font-serif tracking-widest text-sm rounded-md hover:bg-stone-900 transition-all">
              Ler o Manifesto
            </a>
          </div>
        </div>
      </section>

      {/* SECTION: ECOLOGICAL TCG (O COMPÊNDIO) */}
      <section id="compendio" className="py-24 md:py-32 bg-[#0A0A0A] relative border-y border-stone-900/50">
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Imagem/Mockup */}
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-linear-to-tr from-fuchsia-900/20 to-emerald-900/20 blur-[80px] rounded-full"></div>
              <div className="relative w-full max-w-sm h-125 bg-linear-to-b from-[#1a1714] to-[#111] border border-stone-800 rounded-xl shadow-2xl p-6 flex flex-col transform -rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="w-full flex justify-between items-start mb-6 border-b border-stone-800/50 pb-4">
                  <div className="px-2 py-0.5 text-[10px] uppercase tracking-widest font-mono border border-cyan-800 bg-cyan-950/50 text-cyan-400 rounded-sm">
                    REDE MICELIAL
                  </div>
                  <span className="font-mono text-[10px] text-stone-600">ID: 201</span>
                </div>
                
                <div className="w-full flex-1 border border-stone-800 rounded bg-linear-to-t from-fuchsia-950/40 to-[#0a0a0a] flex items-center justify-center mb-6 relative shadow-inner overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                   <span className="text-8xl drop-shadow-[0_0_30px_rgba(192,38,211,0.4)] grayscale-[0.2]">🍄</span>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif text-cyan-300 mb-2">Cogumelo Bioluminescente</h3>
                  <p className="text-xs text-stone-500 font-serif leading-relaxed italic">
                    "Neonothopanus gardneri. As suas hifas quebram minerais complexos, entregando-os diretamente à Matriz."
                  </p>
                </div>
              </div>
            </div>

            {/* Texto */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-900 border border-stone-800 rounded text-stone-400 text-[10px] font-mono tracking-widest uppercase mb-6">
                Mecânica TCG & Colecionismo
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight">
                Extraia pacotes.<br />
                <span className="text-stone-500">Colecione a simbiose.</span>
              </h2>
              <p className="text-stone-400 mb-10 leading-relaxed">
                Utilize o seu saldo de <strong>$LEAF</strong> (ganho ao reciclar ou escanear produtos parceiros) na Loja do Ecossistema. Em vez de comprar árvores diretamente, irá sortear elementos da natureza essenciais para a vida.
              </p>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-emerald-950/50 border border-emerald-900/50 flex items-center justify-center shrink-0">🌿</div>
                  <div>
                    <h4 className="font-serif text-emerald-400 text-lg mb-1">Flora de Base (70%)</h4>
                    <p className="text-sm text-stone-500">Samambaias, musgos e terra preta que preparam o solo e retêm a umidade vital.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-fuchsia-950/50 border border-cyan-900/50 flex items-center justify-center shrink-0">🍄</div>
                  <div>
                    <h4 className="font-serif text-cyan-400 text-lg mb-1">Rede Micelial (25%)</h4>
                    <p className="text-sm text-stone-500">Fungos brilhantes e esporos que conectam as raízes formando a internet da floresta.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-amber-950/50 border border-amber-900/50 flex items-center justify-center shrink-0">🐝</div>
                  <div>
                    <h4 className="font-serif text-amber-400 text-lg mb-1">Polinizador Catalisador (5%)</h4>
                    <p className="text-sm text-stone-500">Cartas raras e lendárias como o Beija-flor-rubi que multiplicam os rendimentos do seu ecossistema.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: BOARD & dNFT */}
      <section id="dnft" className="py-24 md:py-32 bg-[#14120E] relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-emerald-900/10 to-transparent pointer-events-none"></div>
        <div className="container mx-auto max-w-6xl px-6 relative z-10 text-center">
          
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">O Tabuleiro da Vida Real</h2>
          <p className="text-stone-400 max-w-2xl mx-auto mb-16">
            O seu compêndio botânico não é apenas estético. Aplique as suas cartas no Tabuleiro de Simbiose para nutrir o seu Mogno Africano (dNFT).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-stone-900/50 border border-stone-800 p-8 rounded-xl backdrop-blur-sm hover:border-emerald-800/50 transition-colors">
              <div className="w-12 h-12 bg-[#111] border border-stone-700 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-4"><Box size={20} /></div>
              <h3 className="font-serif text-lg text-stone-200 mb-2">Real World Assets</h3>
              <p className="text-xs text-stone-500 leading-relaxed">A Árvore Matriz no centro do seu tabuleiro é um dNFT na Soroban, lastreado numa árvore real plantada e auditada pelo protocolo.</p>
            </div>

            <div className="bg-stone-900/50 border border-stone-800 p-8 rounded-xl backdrop-blur-sm hover:border-emerald-800/50 transition-colors">
              <div className="w-12 h-12 bg-[#111] border border-stone-700 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-4"><Zap size={20} /></div>
              <h3 className="font-serif text-lg text-stone-200 mb-2">Crescimento Dinâmico</h3>
              <p className="text-xs text-stone-500 leading-relaxed">A biomassa da sua árvore (kg) cresce todos os dias. Ao equipar elementos simbióticos, você aplica multiplicadores a este crescimento.</p>
            </div>

            <div className="bg-stone-900/50 border border-stone-800 p-8 rounded-xl backdrop-blur-sm hover:border-emerald-800/50 transition-colors">
              <div className="w-12 h-12 bg-[#111] border border-stone-700 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-4"><Network size={20} /></div>
              <h3 className="font-serif text-lg text-stone-200 mb-2">Economia Blockchain</h3>
              <p className="text-xs text-stone-500 leading-relaxed">Tanto o dNFT quanto o rendimento de carbono estão ancorados de forma imutável e transparente na blockchain Stellar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-24 bg-linear-to-b from-[#0F1612] to-black border-t border-emerald-950/50 relative overflow-hidden text-center">
        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <h2 className="font-serif text-4xl font-bold text-emerald-50 mb-6 drop-shadow-lg">Pronto para iniciar a sua jornada?</h2>
          <p className="text-stone-400 mb-10 max-w-lg mx-auto">
            Aceda à aplicação, abra o seu primeiro pacote ecológico e descubra qual o papel que a natureza reservou para si.
          </p>
          <a href="/store" className="inline-flex items-center gap-3 py-4 px-12 bg-emerald-800 text-emerald-50 font-serif tracking-widest text-sm rounded-md hover:bg-emerald-700 transition-colors shadow-[0_10px_30px_rgba(16,185,129,0.2)]">
            Aceder ao Tabuleiro <TreePine size={18} />
          </a>
        </div>
      </section>

      {/* FOOTER BÁSICO */}
      <footer className="py-8 bg-black border-t border-stone-900/50 text-center">
        <p className="text-stone-600 font-mono text-[10px] uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Florestas.Social Protocol. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
