# Interactive Marketing Campaign Brainstorm Tool

AI-powered marketing campaign planning tool with interactive brainstorming, calendar management, and export capabilities.

## Features

- 🤖 **AI-Powered Brainstorming** - Claude-assisted campaign design
- 📅 **Visual Calendar** - Week-by-week campaign planning
- 📊 **Campaign Management** - Track multiple campaigns
- 📤 **Export** - Markdown and PDF export
- 🔐 **Authentication** - Secure multi-user support with NextAuth.js
- 📱 **Responsive** - Works on all devices

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **AI:** Claude API (Anthropic)
- **Auth:** NextAuth.js (Google OAuth + Credentials)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Anthropic API key

### Installation

1. Clone the repository
```bash
cd marketing-brainstorm-tool
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. Set up database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Run development server
```bash
npm run dev
```

6. Open http://localhost:3000

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/marketing_tool"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_CLIENT_ID="..." # Optional for Google OAuth
GOOGLE_CLIENT_SECRET="..." # Optional for Google OAuth
```

## Documentation

- [API Documentation](docs/API.md) - API endpoints and usage
- [Deployment Guide](docs/DEPLOYMENT.md) - Deploy to Vercel or self-host
- [User Guide](docs/USER_GUIDE.md) - How to use the tool

## Testing

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# E2E tests (requires dev server running)
npm run test:e2e

# Coverage
npm run test:coverage
```

## Project Structure

```
marketing-brainstorm-tool/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (dashboard)/       # Protected routes
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── brainstorm/        # Question flow UI
│   │   ├── calendar/          # Calendar view
│   │   └── campaigns/         # Campaign management
│   ├── lib/                   # Utilities
│   │   ├── brainstorm/        # Question engine
│   │   ├── export/            # Markdown/PDF export
│   │   ├── auth.ts            # NextAuth config
│   │   ├── claude.ts          # Claude AI client
│   │   └── prisma.ts          # Prisma client
│   └── types/                 # TypeScript types
├── prisma/                    # Database schema
├── tests/                     # Unit + E2E tests
└── docs/                      # Documentation
```

## License

MIT

## Support

For issues and questions, please open a GitHub issue.
