'use client';
import React from 'react';
import Image from 'next/image';
import { X, Check, ArrowRight, UserPlus, QrCode, TreePine, MapPin, Search } from 'lucide-react';

export default function MarketingB2BPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#112a20] via-(--leaf-green-dark) to-[#0a1511] text-(--leaf-cream) font-sans">
      
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full h-20 z-50">
        <div className="container-lg h-full flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image src="/logo.png" alt="Florestas.Social Logo" width={36} height={36} className="object-contain" />
            <span className="font-serif text-2xl font-bold tracking-wide text-(--leaf-gold)">Florestas.Social</span>
          </div>

          <nav className="hidden md:flex gap-8">
            <a href="#solucoes" className="text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity">Para Empresas</a>
            <a href="#como-funciona" className="text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity">Como Funciona</a>
            <a href="#precos" className="text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity">Planos</a>
          </nav>

          <div className="flex items-center gap-5">
            <a href="/portal/login" className="hidden md:block text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity">Entrar</a>
            <a href="/portal/cadastro" className="h-10 px-6 bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] text-(--leaf-gold) rounded-full flex items-center justify-center text-sm font-bold hover:bg-[rgba(201,168,76,0.2)] transition-colors shadow-[0_0_15px_rgba(201,168,76,0.1)]">
              Agendar Demo
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 md:pt-40 pb-20 flex flex-col items-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-(--leaf-green-glow) opacity-20 blur-[120px] pointer-events-none rounded-full"></div>
        
        <div className="container-lg grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-full text-(--leaf-gold) text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(201,168,76,0.15)]">
              TRANSFORME O CONSUMO EM IMPACTO
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[70px] font-bold leading-[1.1] mb-6 text-white drop-shadow-md">
              Cada venda que<br />sua empresa faz<br />pode plantar<br />
              <span className="text-(--leaf-gold) italic font-light drop-shadow-lg">uma árvore.</span>
            </h1>
            <p className="text-lg opacity-90 max-w-lg mb-10 leading-relaxed font-light">
              A plataforma que conecta marcas sustentáveis aos consumidores. Transformamos o plantio de árvores em uma ferramenta de fidelização, rastreável e sem fricção.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a href="#demo" className="btn-gold py-4 px-8 text-base font-bold w-full sm:w-auto text-center rounded-full shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.4)]">
                Criar Conta Gratuita
              </a>
              <a href="#como-funciona" className="h-13 px-8 bg-white/5 border border-white/20 rounded-full flex items-center justify-center font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto backdrop-blur-md">
                Agendar Demo
              </a>
            </div>
            <div className="flex items-center gap-4 mt-8 opacity-70 text-xs font-semibold">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-500 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-400 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-300 border border-white"></div>
              </div>
              <span>Junte-se a +50 marcas inovadoras</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-150 bg-(--leaf-gold) opacity-10 blur-[80px] rounded-full"></div>
            <div className="w-75 h-150 bg-linear-to-b from-[#142921] to-[#0a1511] rounded-[40px] border-[6px] border-[#0F1E18] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col items-center justify-center p-6 backdrop-blur-xl">
              {/* App Mockup */}
              <div className="w-16 h-1 rounded-full bg-black/40 absolute top-4"></div>
              <div className="w-full bg-linear-to-br from-[#1b3a2d] to-[#112a20] p-6 rounded-2xl flex flex-col items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10 relative mt-10">
                <div className="w-20 h-20 bg-linear-to-br from-(--leaf-gold) to-(--leaf-gold-light) rounded-2xl flex items-center justify-center mb-4 shadow-[0_10px_30px_rgba(201,168,76,0.4)]">
                  <TreePine size={40} className="text-[#1b3a2d]" />
                </div>
                <div className="w-3/4 h-3 bg-white/20 rounded-full mb-3 shadow-inner"></div>
                <div className="w-1/2 h-2 bg-white/10 rounded-full shadow-inner"></div>
              </div>
              <div className="w-full mt-6 flex flex-col gap-3">
                <div className="w-full h-12 bg-white/5 rounded-xl border border-white/5"></div>
                <div className="w-full h-12 bg-white/5 rounded-xl border border-white/5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OLD VS NEW */}
      <section className="bg-linear-to-b from-[#FAF7F2] to-[#F0EBE1] text-[#1b3a2d] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#E9F3EE]/50 to-transparent pointer-events-none"></div>
        <div className="container-lg relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-center max-w-3xl mx-auto mb-16 leading-tight drop-shadow-sm">
            Compensação ambiental que ninguém acredita não vale nada para ninguém.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Old Way */}
            <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-red-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-400 to-red-300"></div>
              <h3 className="font-bold mb-8 opacity-50 uppercase tracking-widest text-sm">O jeito antigo</h3>
              <ul className="flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5"><X size={14} className="text-red-500" /></div>
                  <span className="opacity-80 font-medium">Um certificado estático não te diferencia da concorrência.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5"><X size={14} className="text-red-500" /></div>
                  <span className="opacity-80 font-medium">O consumidor não se engaja porque não ganha nada com isso.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5"><X size={14} className="text-red-500" /></div>
                  <span className="opacity-80 font-medium">Sua empresa paga caro e o cliente sequer fica sabendo.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5"><X size={14} className="text-red-500" /></div>
                  <span className="opacity-80 font-medium">Você não rastreia o impacto de forma engajadora.</span>
                </li>
              </ul>
            </div>

            {/* The New Way */}
            <div className="bg-linear-to-br from-[#E9F3EE] to-[#D5E8DD] p-8 md:p-10 rounded-3xl border border-[#CDE5D8] shadow-[0_15px_50px_rgba(27,58,45,0.08)] relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-(--leaf-green-light) to-(--leaf-green-dark)"></div>
              <div className="inline-flex items-center gap-2 bg-(--leaf-green-dark) text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">
                O jeito Florestas.Social
              </div>
              <ul className="flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-(--leaf-green-dark) shadow-inner flex items-center justify-center shrink-0 mt-0.5"><Check size={14} className="text-white" /></div>
                  <span className="font-bold text-(--leaf-green-dark)">Mostre impacto real na prateleira com um QR Code.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-(--leaf-green-dark) shadow-inner flex items-center justify-center shrink-0 mt-0.5"><Check size={14} className="text-white" /></div>
                  <span className="font-bold text-(--leaf-green-dark)">O cliente escaneia, ganha o prêmio e a árvore é plantada.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-(--leaf-green-dark) shadow-inner flex items-center justify-center shrink-0 mt-0.5"><Check size={14} className="text-white" /></div>
                  <span className="font-bold text-(--leaf-green-dark)">Rastreabilidade em blockchain: árvore no nome do cliente.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-(--leaf-green-dark) shadow-inner flex items-center justify-center shrink-0 mt-0.5"><Check size={14} className="text-white" /></div>
                  <span className="font-bold text-(--leaf-green-dark)">Conexão emocional que atrai clientes e gera recompra.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STEPS */}
      <section id="como-funciona" className="py-24 md:py-32 bg-linear-to-b from-[#112a20] to-(--leaf-green-dark) border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="container-lg relative z-10">
          <div className="text-center mb-4">
            <span className="inline-block text-(--leaf-gold) text-xs font-bold tracking-widest uppercase bg-(--leaf-gold)/10 px-3 py-1 rounded-full border border-(--leaf-gold)/20 mb-4">O PROCESSO</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-center max-w-4xl mx-auto mb-20 leading-tight text-white drop-shadow-md">
            Três passos para transformar seu negócio num <span className="text-(--leaf-gold) italic">agente de impacto.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-transparent via-(--leaf-gold)/30 to-transparent z-0"></div>

            {/* Passo 1 */}
            <div className="glass-card p-8 rounded-3xl relative z-10 hover:border-(--leaf-gold)/50 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:bg-(--leaf-gold)/20 transition-colors mx-auto md:mx-0">
                <UserPlus size={28} className="text-(--leaf-gold)" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3 text-white text-center md:text-left">1. Crie a sua conta</h3>
              <p className="opacity-70 text-sm leading-relaxed text-center md:text-left">
                Cadastre a sua marca, escolha o plano que se adequa ao tamanho da sua empresa e comece a gerar impacto em menos de 10 minutos.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="glass-card p-8 rounded-3xl relative z-10 hover:border-(--leaf-gold)/50 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:bg-(--leaf-gold)/20 transition-colors mx-auto md:mx-0">
                <TreePine size={28} className="text-(--leaf-gold)" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3 text-white text-center md:text-left">2. Compre suas árvores</h3>
              <p className="opacity-70 text-sm leading-relaxed text-center md:text-left">
                Adquira pacotes de árvores pela nossa plataforma, gerando saldo imediato na sua conta para distribuir aos seus clientes.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="glass-card p-8 rounded-3xl relative z-10 hover:border-(--leaf-gold)/50 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:bg-(--leaf-gold)/20 transition-colors mx-auto md:mx-0">
                <QrCode size={28} className="text-(--leaf-gold)" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3 text-white text-center md:text-left">3. O Cliente Resgata</h3>
              <p className="opacity-70 text-sm leading-relaxed text-center md:text-left">
                Sempre que o seu cliente escaneia o QRCode ele recebe 1 Leaf. A cada 10 ele garante que 1 árvore real será plantada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DASHBOARD MOCKUP */}
      <section className="bg-linear-to-b from-[#F0EBE1] to-[#FAF7F2] text-[#1b3a2d] py-24 md:py-32 border-b border-[#E9F3EE]">
        <div className="container-lg">
          <div className="text-center mb-4">
            <span className="inline-block text-(--leaf-green-dark) text-xs font-bold tracking-widest uppercase bg-(--leaf-green-dark)/10 px-3 py-1 rounded-full mb-4 border border-(--leaf-green-dark)/20">TRANSPARÊNCIA TOTAL</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-center max-w-3xl mx-auto mb-16 leading-tight">
            Veja o impacto do engajamento dos seus clientes.
          </h2>

          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-4 md:p-8 rounded-4xl shadow-[0_30px_60px_rgba(27,58,45,0.1)] border border-[#E9F3EE]">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg shadow-inner"></div>
                <div>
                  <div className="text-sm font-bold text-gray-800">Florestas.Social Dashboard</div>
                  <div className="text-xs text-gray-500 font-medium">Minha Empresa LTDA</div>
                </div>
              </div>
              <div className="hidden md:flex gap-4">
                <div className="w-24 h-8 bg-gray-50 rounded-md border border-gray-100"></div>
                <div className="w-24 h-8 bg-gray-50 rounded-md border border-gray-100"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-linear-to-br from-[#F8FAF9] to-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="text-sm font-bold text-gray-500 mb-2">Leafs geradas</div>
                  <div className="flex items-end gap-4">
                    <div className="text-5xl font-serif font-bold text-(--leaf-green-dark)">409</div>
                    <div className="text-sm text-green-600 font-bold mb-1 bg-green-50 px-2 py-0.5 rounded-full">+12% vs mês anterior</div>
                  </div>
                  {/* Fake Chart with Gradients */}
                  <div className="w-full h-32 mt-6 flex items-end gap-2">
                    {[40, 60, 45, 80, 50, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#E9F3EE] rounded-t-md overflow-hidden relative" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 w-full bg-linear-to-t from-(--leaf-green-dark) to-(--leaf-green-light)" style={{ height: '50%' }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.03)] flex items-center gap-4 hover:shadow-[0_12px_25px_rgba(0,0,0,0.05)] transition-shadow">
                    <div className="w-14 h-14 bg-linear-to-br from-[#E9F3EE] to-[#CDE5D8] rounded-xl flex items-center justify-center text-(--leaf-green-dark) shadow-inner">
                      <TreePine size={26} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Árvores Plantadas</div>
                      <div className="text-3xl font-bold text-gray-800">8</div>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.03)] flex items-center gap-4 hover:shadow-[0_12px_25px_rgba(0,0,0,0.05)] transition-shadow">
                    <div className="w-14 h-14 bg-linear-to-br from-[#E9F3EE] to-[#CDE5D8] rounded-xl flex items-center justify-center text-(--leaf-green-dark) shadow-inner">
                      <MapPin size={26} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Biomas</div>
                      <div className="text-3xl font-bold text-gray-800">40</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-b from-[#F8FAF9] to-white p-6 rounded-2xl border border-gray-100 flex flex-col shadow-sm">
                <div className="text-sm font-bold text-gray-500 mb-4">Últimos Resgates</div>
                <div className="flex-1 flex flex-col gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-gray-200 to-gray-300"></div>
                      <div className="flex-1">
                        <div className="w-20 h-2 bg-gray-300 rounded-full mb-1"></div>
                        <div className="w-12 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+1 Leaf</div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 mt-4 text-sm font-bold text-(--leaf-green-dark) bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                  Ver relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING */}
      <section id="precos" className="bg-linear-to-b from-[#FAF7F2] to-[#F0EBE1] text-[#1b3a2d] py-24 md:py-32 relative overflow-hidden">
        <div className="container-lg relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-(--leaf-green-dark) opacity-60 text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 bg-gray-200 rounded-full">PREÇOS TRANSPARENTES</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 drop-shadow-sm">Escolha o tamanho do seu impacto.</h2>
            <p className="text-lg opacity-80">Cancele quando quiser. Sem taxas escondidas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {/* Semente */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow">
              <h3 className="font-serif text-2xl font-bold mb-2">Plano Semente</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-(--leaf-green-dark)">R$ 200</span>
                <span className="text-gray-500 text-sm mb-1">/mês</span>
              </div>
              <ul className="flex flex-col gap-4 mb-8">
                <li className="flex items-center gap-3 text-sm font-medium"><Check size={18} className="text-(--leaf-green-dark)" /> 10 árvores/mês</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check size={18} className="text-(--leaf-green-dark)" /> Dashboard básico</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check size={18} className="text-(--leaf-green-dark)" /> 1 Conta de Acesso</li>
                <li className="flex items-center gap-3 text-sm font-medium opacity-40"><X size={18} /> API de Integração</li>
              </ul>
              <button className="w-full h-12 bg-linear-to-r from-[#E9F3EE] to-[#CDE5D8] text-(--leaf-green-dark) rounded-xl font-bold hover:shadow-md transition-all">
                Assinar Plano
              </button>
            </div>

            {/* Raiz (Destaque) */}
            <div className="bg-linear-to-b from-[#1B3A2D] to-[#112a20] text-white p-10 rounded-3xl shadow-[0_30px_60px_rgba(27,58,45,0.4)] relative transform md:-translate-y-4 border border-white/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-(--leaf-gold) to-(--leaf-gold-light) text-[#1B3A2D] text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                MAIS ESCOLHIDO
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">Plano Raiz</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-5xl font-bold text-(--leaf-gold) drop-shadow-md">R$ 660</span>
                <span className="text-white/60 text-sm mb-1.5">/mês</span>
              </div>
              <ul className="flex flex-col gap-4 mb-8">
                <li className="flex items-center gap-3 text-sm font-bold"><Check size={18} className="text-(--leaf-gold)" /> 50 árvores/mês</li>
                <li className="flex items-center gap-3 text-sm font-bold"><Check size={18} className="text-(--leaf-gold)" /> Dashboard Avançado</li>
                <li className="flex items-center gap-3 text-sm font-bold"><Check size={18} className="text-(--leaf-gold)" /> Página Pública Customizada</li>
                <li className="flex items-center gap-3 text-sm font-bold"><Check size={18} className="text-(--leaf-gold)" /> Múltiplos Acessos</li>
              </ul>
              <button className="w-full h-14 btn-gold rounded-xl font-bold text-lg shadow-[0_10px_30px_rgba(201,168,76,0.3)]">
                Assinar Plano Raiz
              </button>
            </div>

            {/* Floresta */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow">
              <h3 className="font-serif text-2xl font-bold mb-2">Plano Floresta</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-(--leaf-green-dark)">R$ 1.400</span>
                <span className="text-gray-500 text-sm mb-1">/mês</span>
              </div>
              <ul className="flex flex-col gap-4 mb-8">
                <li className="flex items-center gap-3 text-sm font-medium"><Check size={18} className="text-(--leaf-green-dark)" /> 150 árvores/mês</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check size={18} className="text-(--leaf-green-dark)" /> Relatório Trimestral PDF</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check size={18} className="text-(--leaf-green-dark)" /> Acesso à API</li>
                <li className="flex items-center gap-3 text-sm font-medium"><Check size={18} className="text-(--leaf-green-dark)" /> Suporte Dedicado</li>
              </ul>
              <button className="w-full h-12 bg-linear-to-r from-[#E9F3EE] to-[#CDE5D8] text-(--leaf-green-dark) rounded-xl font-bold hover:shadow-md transition-all">
                Assinar Plano
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: STATS */}
      <section className="bg-linear-to-r from-[#0c1a15] via-[#11241d] to-[#0c1a15] py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-(--leaf-gold)/30 to-transparent"></div>
        <div className="container-lg grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold font-serif text-(--leaf-gold) mb-2 drop-shadow-md">8+</div>
            <div className="text-xs font-semibold uppercase tracking-widest opacity-70">Anos de atuação</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold font-serif text-(--leaf-gold) mb-2 drop-shadow-md">R$ 0M+</div>
            <div className="text-xs font-semibold uppercase tracking-widest opacity-70">Impacto Gerado</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold font-serif text-(--leaf-gold) mb-2 drop-shadow-md">0%</div>
            <div className="text-xs font-semibold uppercase tracking-widest opacity-70">Taxa de Setup</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold font-serif text-(--leaf-gold) mb-2 drop-shadow-md">0</div>
            <div className="text-xs font-semibold uppercase tracking-widest opacity-70">Complexidade</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-linear-to-b from-[#0a1511] to-black relative overflow-hidden">
        {/* Abstract wavy lines in background (using SVG) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="waves" width="100" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="white" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>

        <div className="container-lg relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Florestas.Social Logo" width={32} height={32} className="object-contain grayscale brightness-200" />
                <span className="font-serif text-xl font-bold tracking-wide">Florestas.Social</span>
              </div>
              <p className="opacity-50 text-sm leading-relaxed mt-4">
                Impacto real. Transparência total. Gamificação que funciona.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white/40 text-xs tracking-widest uppercase mb-4">Plataforma</h4>
              <a href="#solucoes" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Como Funciona</a>
              <a href="#precos" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Planos B2B</a>
              <a href="/leafpass" className="text-sm opacity-70 hover:opacity-100 transition-opacity">App LeafPass</a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white/40 text-xs tracking-widest uppercase mb-4">Empresa</h4>
              <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Sobre Nós</a>
              <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Blog e Casos</a>
              <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Contato</a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white/40 text-xs tracking-widest uppercase mb-4">Legal</h4>
              <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Termos de Uso</a>
              <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Privacidade</a>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="opacity-40 text-sm">&copy; {new Date().getFullYear()} Florestas.Social. Todos os direitos reservados.</p>
            <p className="text-(--leaf-gold) text-xs font-bold tracking-widest uppercase opacity-80">Made in Brazil</p>
          </div>
        </div>
      </footer>

    </main>
  );
}

