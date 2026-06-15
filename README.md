# 🌿 LeafPass - Plataforma de Engajamento Sustentável

**LeafPass** é uma plataforma que conecta marcas sustentáveis aos consumidores, transformando o plantio de árvores em uma ferramenta de fidelização, rastreável e sem fricção.

## 🎯 Objetivo do Projeto

Transformar compensação ambiental em uma experiência engajadora onde:
- **Empresas** podem oferecer recompensas sustentáveis aos seus clientes
- **Consumidores** ganham "Leafs" (folhas) ao visitar parceiros e podem resgatar por árvores plantadas
- **Projetos sociais** recebem apoio através do sistema de resgate

## ✨ Funcionalidades Principais

### Para Usuários
- 📱 **Passaporte Digital**: Colete carimbos ao visitar parceiros
- 🏆 **Sistema de Conquistas**: 10 níveis de progressão (Bronze → Diamante)
- 🎯 **Missões Diárias e Semanais**: Ganhe Leafs extras completando desafios
- 🔍 **Scanner de QR Code**: Escaneie para ganhar recompensas
- 💎 **Resgate Social**: Use seus Leafs para apoiar projetos ambientais

### Para Empresas
- 🏢 **Dashboard Empresarial**: Acompanhe o engajamento dos clientes
- 📊 **Métricas de Impacto**: Veja árvores plantadas e biomas beneficiados
- 🎫 **Campanhas Personalizadas**: Crie promoções com recompensas em Leafs
- 🔗 **Integração com QR Code**: Sistema mensal automático de QR Codes

### Para Administradores
- 👥 **Gestão de Empresas**: Aprove e gerencie parceiros
- 🌍 **Campanhas Globais**: Crie campanhas para toda a rede
- 📈 **Analytics**: Dashboard completo de métricas da plataforma

## 🏗️ Arquitetura Técnica

### Stack Tecnológico
- **Framework**: Next.js 16+ (App Router)
- **Linguagem**: TypeScript
- **Banco de Dados**: SQLite (dev) / PostgreSQL (prod) via Prisma
- **Autenticação**: NextAuth v5 (Auth.js)
- **Estilização**: Tailwind CSS v4
- **Animações**: Framer Motion
- **Pagamentos**: Stripe
- **QR Code**: html5-qrcode, qrcode.react

### Estrutura do Projeto
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
