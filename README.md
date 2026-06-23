# 🌿 FloraDex

A interface B2C do protocolo Florestas.Social. Um Tabuleiro de Cristalização (Board UI) sob a estética Solarpunk Premium, onde utilizadores resgatam $LEAF, abrem Pacotes Simbióticos (Flora, Fungi, Polinizadores) e forjam dNFTs reais de Mogno Africano ancorados na rede Stellar.

<div align="center">

**Plataforma de Engajamento Sustentável com Infraestrutura Blockchain Stellar**

*System Error: The destruction of nature is profitable. We are fixing this bug with Programmable Prosperity.*

[![Network: Stellar Soroban](https://img.shields.io/badge/Network-Stellar%20Soroban-7B6FEE?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![Contracts: Rust](https://img.shields.io/badge/Contracts-Rust-orange?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![Payments: x402](https://img.shields.io/badge/Payments-x402%20Protocol-00C2FF?style=for-the-badge)](https://www.x402.org/)
[![Frontend: Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-green.svg?style=for-the-badge)](LICENSE)

</div>

---

## 🎯 Objetivo do Projeto

Transformar compensação ambiental em uma experiência engajadora e verificável onde:

- **Empresas** oferecem recompensas sustentáveis ($LEAF tokens) aos clientes via x402
- **Consumidores** coletam Leafs visitando parceiros e **forjam dNFTs** representando árvores reais
- **Projetos sociais** recebem apoio através do sistema de resgate com rastreabilidade blockchain
- **Oráculos PoF** validam biomassa e carbono via IA e dados satelitais

### Repositório Original do Protocolo

Este projeto está vinculado ao [Social Forest Protocol](https://github.com/iaiamaga/social-forests-protocol), desenvolvido por [@iaiamaga](https://github.com/iaiamaga).

🔗 **Ver protocolo completo:** https://github.com/iaiamaga/social-forests-protocol

## ⚙️ Como Funciona: O Ciclo Principal

| Ator | Ação & Proposta de Valor |
|------|--------------------------|
| 🏢 **Empresa (B2B)** | Entra via pagamento x402 USDC, compra frações de RWA (árvores reais de Mogno), e ganha impacto ESG verificável. Distribui tokens $LEAF como "Green Cashback" aos clientes. |
| 🛰️ **Oráculo (PoF)** | IA e dados satelitais validam níveis de biomassa e carbono no mundo físico. Injeta dados de crescimento no dNFT via `process_oracle_report`. |
| 🌱 **Consumidor (B2C)** | Ganha tokens $LEAF de marcas parceiras. Acumula folhas e **forja um dNFT** — um NFT dinâmico representando uma árvore real de Mogno Africano que cresce on-chain conforme a árvore física cresce. |

### A Jornada do dNFT

```
Empresa compra RWA → Protocolo mint $LEAF → Consumidor ganha $LEAF
                                              ↓
                              Consumidor queima $LEAF → Forja dNFT (Tier 1)
                                              ↓
                              Oráculo alimenta dados de crescimento → dNFT evolui
                                              ↓
                              Consumidor funde dNFTs → Tier superior (Raro → Épico → Lendário)
```

Cada **dNFT** é um ativo digital vivo lastreado por uma árvore real. Ele rastreia biomassa, sequestro de carbono e fase biológica — tudo verificado on-chain pelo oráculo Proof of Flourishing.

---

## ✨ Funcionalidades Principais

### Para Usuários
- 📱 **Passaporte Digital**: Colete carimbos ao visitar parceiros
- 🏆 **Sistema de Conquistas**: 10 níveis de progressão (Bronze → Diamante)
- 🎯 **Missões Diárias e Semanais**: Ganhe Leafs extras completando desafios
- 🔍 **Scanner de QR Code**: Escaneie para ganhar recompensas
- 💎 **Forjar dNFT**: Queime Leafs para criar NFTs dinâmicos de árvores reais
- 🌳 **Evolução de dNFT**: Funda dNFTs para alcançar tiers superiores (Raro → Épico → Lendário)

### Para Empresas
- 🏢 **Dashboard Empresarial**: Acompanhe o engajamento dos clientes
- 📊 **Métricas de Impacto ESG**: Veja árvores plantadas, carbono sequestrado e biomas beneficiados
- 🎫 **Campanhas Personalizadas**: Crie promoções com recompensas em $LEAF tokens
- 🔗 **Integração x402**: Pagamentos automáticos via protocolo x402 (USDC na Stellar)
- 🔐 **Rastreabilidade Blockchain**: Cada transação registrada na Stellar

### Para Administradores
- 👥 **Gestão de Empresas**: Aprove e gerencie parceiros
- 🌍 **Campanhas Globais**: Crie campanhas para toda a rede
- 📈 **Analytics Completo**: Dashboard de métricas da plataforma e impacto ambiental
- 🛰️ **Gestão de Oráculos**: Configure validação de dados de biomassa e carbono

## 🏗️ Arquitetura Técnica

### Stack Tecnológico Híbrido

| Camada | Tecnologia |
|--------|-----------|
| **Smart Contracts** | Rust · soroban-sdk 26.0.0 · `#![forbid(unsafe_code)]` |
| **Blockchain** | Stellar Soroban (Testnet) |
| **Pagamentos** | x402 Protocol (USDC on Stellar) via OpenZeppelin Facilitator |
| **Ponte RWA** | Etherfuse Stablebonds *(stub — em progresso)* |
| **Frontend** | Next.js 16 · React 19 · TailwindCSS 4 · Framer Motion |
| **Wallet** | Freighter API v6 |
| **Banco de Dados** | SQLite (dev) / PostgreSQL (prod) via Prisma |
| **Autenticação** | NextAuth v5 (Auth.js) |
| **QR Code** | html5-qrcode, qrcode.react |
| **CI/CD** | GitHub Actions (cargo test, WASM build, gitleaks, Next.js build) |

### Contratos Inteligentes (Soroban)

Seis contratos modulares em Rust implantados na Stellar Soroban (SDK v26.0.0):

| Contrato | Função | Status |
|----------|--------|--------|
| `leaf_token` | **Token $LEAF (SEP-41).** Token fungível com mint/burn/transfer. Limite de 1B supply. Transferência admin em 2 passos. Balances com TTL gerenciado. | ✅ Testnet |
| `guardian_id` | **SBT do Consumidor.** Token de reputação Soulbound — XP, níveis (1-50), 7 eras biológicas. Intransferível. | ✅ Testnet |
| `company_id` | **SBT da Empresa.** Identidade institucional — saldo C-Cred, C-Debt, badges ODS, verificação Vereda. | ✅ Testnet |
| `collateral_vault` | **Marketplace DeFi.** Gerencia inventário físico (mudas), trading C-Cred entre empresas, liquidação de dívidas. | ✅ Testnet |
| `forest_mythos_vault` | **Engine dNFT.** NFTs dinâmicos representando árvores reais — mint, forge (merge), relatórios de crescimento do oráculo, lock anti-flip de 90 dias, evolução de tier. | ✅ Testnet |
| `journey_orchestrator` | **Maestro.** Orquestra todos os contratos — onboarding B2B, plant_tree B2C, forge_mythos. Ponto único de entrada para fluxos complexos. | ✅ Testnet |

### Grafo de Interação dos Contratos

```
                    ┌─────────────────────────┐
                    │  journey_orchestrator    │
                    │  (Maestro)              │
                    └──────┬──────┬──────┬────┘
                           │      │      │
              ┌────────────┘      │      └────────────┐
              ▼                   ▼                    ▼
     ┌────────────────┐  ┌──────────────┐  ┌─────────────────┐
     │  leaf_token    │  │ guardian_id  │  │ forest_mythos   │
     │  ($LEAF)       │  │ (XP/SBT)    │  │ (dNFT Engine)   │
     └────────────────┘  └──────────────┘  └─────────────────┘
              ▲
              │
     ┌────────────────┐       ┌──────────────┐
     │collateral_vault│──────▶│  company_id  │
     │ (DeFi/C-Cred) │       │ (SBT Empresa)│
     └────────────────┘       └──────────────┘
```

### Estrutura do Projeto (Frontend + Backend)
```
/workspace
├── prisma/
│   ├── schema.prisma      # Modelagem do banco de dados
│   └── seed.ts            # Seed inicial
├── src/
│   ├── app/               # Rotas e páginas (App Router)
│   │   ├── (marketing)/   # Landing page B2B
│   │   ├── (auth)/        # Login e registro
│   │   ├── (app)/         # App do usuário
│   │   ├── admin/         # Painel administrativo
│   │   ├── dashboard/     # Painel da empresa
│   │   └── api/           # API routes
│   ├── components/        # Componentes React
│   │   ├── ui/            # Componentes de UI
│   │   ├── admin/         # Componentes admin
│   │   └── marketing/     # Componentes de marketing
│   └── lib/               # Utilitários e lógica de negócio
│       ├── prisma.ts      # Cliente Prisma
│       ├── auth.ts        # Configuração NextAuth
│       ├── gamification.ts # Sistema de conquistas
│       ├── achievements.ts # Definições de conquistas
│       ├── crypto.ts      # Utilitários de criptografia
│       └── stripe.ts      # Integração Stripe
└── types/                 # Tipos TypeScript
```

### Modelos Principais (Prisma)
- **User**: Usuários com sistema de roles (USER, COMPANY, ADMIN)
- **Company**: Empresas parceiras
- **Stamp**: Carimbos do passaporte
- **Campaign**: Campanhas promocionais
- **AchievementDefinition**: Definições de conquistas
- **UserAchievement**: Progresso do usuário nas conquistas
- **Mission**: Missões diárias/semanais
- **SocialProject**: Projetos para resgate

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- npm ou pnpm

### Instalação

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npm run db:generate

# Rodar migrações
npm run db:migrate

# Popular banco com dados de exemplo
npm run db:seed
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`

### Credenciais de Teste
- **Admin**: `admin@leafpass.dev` / `admin123`
- **Demo User**: `demo@leafpass.dev` / `demo123`

## 🎮 Sistema de Gamificação

### Conquistas Disponíveis
| Conquista | Descrição | Categoria |
|-----------|-----------|-----------|
| 🌱 Ajudante da Natureza | Visite viveiros e parceiros ecológicos | VISITA |
| 🧭 Explorador | Visite parceiros diferentes | VISITA |
| 📮 Colecionador | Acumule carimbos no passaporte | COLETA |
| 🔄 Frequentador Fiel | Retorne ao mesmo parceiro | VISITA |
| 🌅 Madrugador Verde | Escaneie antes das 8h | ESPECIAL |
| 🌳 Guardião da Floresta | Contribua para projetos sociais | SOCIAL |
| 👣 Primeiro Passo | Complete seu primeiro scan | ESPECIAL |
| ☕ Amante do Café | Visites cafeterias parceiras | VISITA |

### Níveis de Progressão
Cada conquista tem 10 níveis:
1. Bronze → 2. Prata → 3. Ouro → 4. Topázio → 5. Ametista → 
6. Safira → 7. Esmeralda → 8. Rubi → 9. Alexandrita → 10. Diamante

### Missões
- **Diárias**: Resetam todo dia à meia-noite
- **Semanais**: Resetam toda segunda-feira
- **Especiais**: Eventos temporários

## 🔐 Segurança

- QR Codes rotativos mensais por empresa
- Device fingerprinting para prevenção de fraudes
- Rate limiting de scans (1 por dia por empresa, máx 20/dia)
- Validação de localização (opcional)
- Hash de senha com bcrypt

## 💳 Planos (Exemplo)

| Plano | Preço | Árvores/mês | Recursos |
|-------|-------|-------------|----------|
| Semente | Grátis | 5 | Básico |
| Muda | R$ 97/mês | 50 | + Dashboard |
| Árvore | R$ 297/mês | 200 | + Campanhas |
| Floresta | R$ 997/mês | 1000 | + Suporte prioritário |

## 📱 Próximas Funcionalidades

- [ ] Integração com blockchain Stellar para tokenização
- [ ] App mobile nativo (React Native)
- [ ] Sistema de indicações
- [ ] Leaderboards regionais
- [ ] Export de relatórios ESG
- [ ] Webhooks para integrações

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 🌟 Autores

- **Florestas.Social** - Transformando consumo em impacto ambiental positivo

---

**Feito com 💚 para o meio ambiente**
