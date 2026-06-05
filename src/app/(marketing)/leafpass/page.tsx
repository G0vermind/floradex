'use client';
import React from 'react';
import Image from 'next/image';
import { Leaf, MapPin, ScanLine, TreePine, Trophy, Target, HelpCircle, QrCode, ChevronDown } from 'lucide-react';

export default function LeafPassLandingPage() {
  return (
    <main className="min-h-screen text-(--leaf-cream) bg-[radial-gradient(ellipse_at_top,var(--leaf-green-mid),var(--leaf-green-dark)_80%)] font-sans">
      
      {/* HEADER: Estrutura Fixa e Alinhada */}
      <header className="fixed top-0 left-0 w-full z-50 h-20 flex items-center bg-[rgba(27,58,45,0.95)] backdrop-blur-md border-b border-(--leaf-cream-line)">
        <div className="container-lg flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/logo.png" alt="LeafPass Logo" width={36} height={36} className="object-contain" />
            <span className="font-serif text-2xl font-bold tracking-wide">LeafPass</span>
          </div>

          {/* Links */}
          <nav className="hidden md:flex gap-8">
            <a href="#como-funciona" className="text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity">Como Funciona</a>
            <a href="#o-passaporte" className="text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity">O Passaporte</a>
            <a href="#faq" className="text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity">Dúvidas Frequentes</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <a href="/login" className="hidden md:block text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity">Entrar</a>
            <button className="btn-gold py-2 px-6 text-sm">Criar Passaporte</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center justify-center min-h-[85vh]">
        <div className="container-lg flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight">
            O seu Passaporte para <br className="hidden md:block" />
            <span className="text-(--leaf-gold)">Regenerar o Planeta.</span>
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-12 max-w-2xl">
            Transformamos as suas compras e ações locais num impacto ambiental real e recompensador. Colecione carimbos, complete missões e plante árvores.
          </p>

          <div className="glass-card w-full max-w-xl p-8 flex flex-col gap-5">
            <label className="text-center font-bold text-(--leaf-gold-light) uppercase tracking-wider text-sm">
              Recebeu um código de parceiro?
            </label>
            <input 
              type="text" 
              placeholder="EX: CAFE-VERDE-2026" 
              className="input-field font-mono text-center uppercase tracking-widest h-16 text-lg" 
            />
            <button className="btn-gold w-full h-16 flex items-center justify-center gap-3">
              <Leaf className="w-5 h-5" /> Resgatar Recompensa
            </button>

            <div className="flex items-center gap-4 my-2 opacity-40">
              <div className="h-px bg-(--leaf-cream) flex-1"></div>
              <span className="text-xs font-bold uppercase tracking-widest">OU</span>
              <div className="h-px bg-(--leaf-cream) flex-1"></div>
            </div>

            <button className="w-full h-14 bg-transparent border border-(--leaf-cream-line) rounded-xl flex items-center justify-center gap-3 font-semibold hover:bg-white/5 transition-colors">
              <QrCode className="w-5 h-5 text-(--leaf-gold)" />
              Escanear QR Code
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-(--leaf-green-mid) border-y border-(--leaf-cream-line) py-12">
        <div className="container-lg grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-(--leaf-cream-line)">
          <div className="flex flex-col items-center py-4 md:py-0">
            <span className="text-4xl font-bold text-(--leaf-gold) mb-2 font-serif">+12k</span>
            <span className="text-sm font-semibold uppercase tracking-wider opacity-80">Guardiões Ativos</span>
          </div>
          <div className="flex flex-col items-center py-4 md:py-0">
            <span className="text-4xl font-bold text-(--leaf-gold) mb-2 font-serif">+45k</span>
            <span className="text-sm font-semibold uppercase tracking-wider opacity-80">Árvores Protegidas</span>
          </div>
          <div className="flex flex-col items-center py-4 md:py-0">
            <span className="text-4xl font-bold text-(--leaf-gold) mb-2 font-serif">100%</span>
            <span className="text-sm font-semibold uppercase tracking-wider opacity-80">Auditado em Blockchain</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="py-24 md:py-32">
        <div className="container-lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-(--leaf-gold) mb-4">Três passos para o impacto.</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              A sustentabilidade não tem de ser complexa. O LeafPass foi desenhado para ser intuitivo, recompensador e totalmente focado na regeneração real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 flex flex-col items-center text-center">
              <MapPin className="w-12 h-12 text-(--leaf-gold) mb-6" />
              <h3 className="text-xl font-bold font-serif text-(--leaf-gold) mb-3">1. Explore</h3>
              <p className="opacity-80 leading-relaxed text-sm">
                Visite estabelecimentos sustentáveis, participe de eventos ou projetos escolares da rede Florestas.Social.
              </p>
            </div>
            <div className="glass-card p-8 flex flex-col items-center text-center">
              <ScanLine className="w-12 h-12 text-(--leaf-gold) mb-6" />
              <h3 className="text-xl font-bold font-serif text-(--leaf-gold) mb-3">2. Capture</h3>
              <p className="opacity-80 leading-relaxed text-sm">
                Escaneie o QR Code ou digite o código da sua compra para capturar as suas recompensas digitais (Folhas).
              </p>
            </div>
            <div className="glass-card p-8 flex flex-col items-center text-center">
              <TreePine className="w-12 h-12 text-(--leaf-gold) mb-6" />
              <h3 className="text-xl font-bold font-serif text-(--leaf-gold) mb-3">3. Evolua</h3>
              <p className="opacity-80 leading-relaxed text-sm">
                Suba de nível no passaporte, ganhe troféus e converta as suas ações numa árvore real de Mogno Africano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O PASSAPORTE */}
      <section id="o-passaporte" className="py-24 md:py-32 bg-[rgba(0,0,0,0.15)] border-t border-(--leaf-cream-line)">
        <div className="container-lg grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-10">
            <div>
              <span className="text-(--leaf-gold) font-bold tracking-widest uppercase text-xs mb-3 block">Gamificação Real</span>
              <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight mb-4">
                O que tem dentro do seu Passaporte?
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex gap-5">
                <Target className="w-6 h-6 text-(--leaf-gold) shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Missões e Desafios</h4>
                  <p className="opacity-80 leading-relaxed text-sm">Cumpra tarefas criadas por marcas parceiras e acelere a sua jornada ambiental.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Trophy className="w-6 h-6 text-(--leaf-gold) shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Troféus de Gemas</h4>
                  <p className="opacity-80 leading-relaxed text-sm">Evolua de Plantador para Lenda. Desbloqueie selos luxuosos que atestam o seu compromisso.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <TreePine className="w-6 h-6 text-(--leaf-gold) shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Impacto Rastreável</h4>
                  <p className="opacity-80 leading-relaxed text-sm">Acompanhe a geolocalização e o crescimento da biomassa da árvore que ajudou a financiar.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-125 bg-(--leaf-green-mid) rounded-3xl border border-(--leaf-cream-line) flex items-center justify-center p-8 relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-linear-to-tr from-(--leaf-green-dark) to-transparent opacity-80"></div>
            <div className="relative z-10 text-center flex flex-col items-center">
              <div className="w-24 h-32 border-2 border-(--leaf-gold)/20 rounded-lg mb-6 flex items-center justify-center bg-black/20">
                <Leaf className="w-8 h-8 text-(--leaf-gold)/40" />
              </div>
              <p className="opacity-60 font-semibold tracking-widest uppercase text-xs">Apresentação Mobile App</p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32">
        <div className="container-lg max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif text-(--leaf-gold) mb-4">Dúvidas Frequentes</h2>
          </div>

          <div className="flex flex-col gap-4">
            <details className="glass-card group p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <summary className="flex justify-between items-center font-bold text-lg list-none">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-(--leaf-gold)" />
                  Como é que ganho Folhas?
                </div>
                <ChevronDown className="w-5 h-5 text-(--leaf-gold) group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 pl-9 opacity-80 leading-relaxed text-sm border-l-2 border-(--leaf-gold) ml-3">
                Ganhar Folhas é simples. Basta consumir em comércios parceiros (fazendo scan ao QR Code no local) ou participar em missões educacionais apoiadas pelas escolas da nossa rede.
              </p>
            </details>

            <details className="glass-card group p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <summary className="flex justify-between items-center font-bold text-lg list-none">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-(--leaf-gold)" />
                  Tenho de pagar alguma coisa pelo aplicativo?
                </div>
                <ChevronDown className="w-5 h-5 text-(--leaf-gold) group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 pl-9 opacity-80 leading-relaxed text-sm border-l-2 border-(--leaf-gold) ml-3">
                Não. O LeafPass é 100% gratuito para o utilizador final. O plantio das árvores é financiado pelas marcas e instituições parceiras para recompensar o seu compromisso sustentável.
              </p>
            </details>

            <details className="glass-card group p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <summary className="flex justify-between items-center font-bold text-lg list-none">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-(--leaf-gold)" />
                  As árvores são realmente plantadas?
                </div>
                <ChevronDown className="w-5 h-5 text-(--leaf-gold) group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 pl-9 opacity-80 leading-relaxed text-sm border-l-2 border-(--leaf-gold) ml-3">
                Sim. Todos os nossos ativos ambientais são árvores físicas (Mogno Africano). O seu crescimento é auditado tecnologicamente na blockchain para garantir impacto real e zero greenwashing.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 md:py-32 bg-(--leaf-green-dark) border-t border-(--leaf-cream-line)">
        <div className="container-lg">
          
          {/* CTA */}
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-8 text-(--leaf-gold)">
              O seu legado verde começa agora.
            </h2>
            <button className="btn-gold py-4 px-10 text-lg">Criar Conta Gratuita</button>
          </div>

          {/* Grid de Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="LeafPass Logo" width={32} height={32} className="object-contain" />
                <span className="font-serif text-2xl font-bold tracking-wide">LeafPass</span>
              </div>
              <p className="opacity-70 text-sm leading-relaxed">
                A tecnologia gamificada por trás do Florestas.Social. Transformamos as suas ações em impacto ambiental.
              </p>
            </div>

            <div className="flex flex-col">
              <h4 className="font-bold mb-6 text-sm tracking-widest uppercase text-(--leaf-gold-light)">LeafPass</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="opacity-80 hover:opacity-100 text-sm transition-opacity">Resgatar Código</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 text-sm transition-opacity">Ver Missões Ativas</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 text-sm transition-opacity">Ranking Guardiões</a></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="font-bold mb-6 text-sm tracking-widest uppercase text-(--leaf-gold-light)">Ecossistema</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="opacity-80 hover:opacity-100 text-sm transition-opacity">Florestas.Social (B2B)</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 text-sm transition-opacity">Seja um Parceiro</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 text-sm transition-opacity">Auditoria e Dados</a></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="font-bold mb-6 text-sm tracking-widest uppercase text-(--leaf-gold-light)">Legal</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="opacity-80 hover:opacity-100 text-sm transition-opacity">Termos de Uso</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 text-sm transition-opacity">Política de Privacidade</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100 text-sm transition-opacity">Suporte</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-(--leaf-cream-line) flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="opacity-60 text-sm">
              &copy; {new Date().getFullYear()} Florestas.Social.
            </p>
            <p className="text-(--leaf-gold) text-xs tracking-widest uppercase font-bold">
              Powered by Stellar Network
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
