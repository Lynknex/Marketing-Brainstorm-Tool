# Deployment Guide

## Vercel Deployment (Recommended)

### 1. Prerequisites

- Vercel account (sign up at vercel.com)
- PostgreSQL database (Neon, Supabase, or Railway recommended)
- Anthropic API key

### 2. Set Up Database

**Option A: Neon (Serverless PostgreSQL)**
1. Sign up at neon.tech
2. Create new project
3. Copy connection string (starts with `postgresql://`)

**Option B: Supabase**
1. Sign up at supabase.com
2. Create new project
3. Go to Project Settings → Database → Connection string
4. Copy the connection string in "Connection Pooling" mode

### 3. Deploy to Vercel

1. Push code to GitHub:
```bash
git push origin main
```

2. Import project in Vercel:
   - Go to vercel.com/new
   - Import your GitHub repository
   - Click Deploy

3. Set environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add these variables:
     - `DATABASE_URL` - Your PostgreSQL connection string
     - `NEXTAUTH_URL` - Your production URL (e.g., https://your-app.vercel.app)
     - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
     - `ANTHROPIC_API_KEY` - Your Claude API key
     - `GOOGLE_CLIENT_ID` (optional)
     - `GOOGLE_CLIENT_SECRET` (optional)

4. Run database migrations:
```bash
# Install Vercel CLI
npm i -g vercel

# Pull environment variables locally
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy
```

### 4. Configure Domain (Optional)

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Self-Hosting with Docker

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t marketing-tool .
docker run -p 3000:3000 \
  -e DATABASE_URL="..." \
  -e ANTHROPIC_API_KEY="..." \
  marketing-tool
```

## Environment Variables for Production

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="..." # 32+ character random string
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_CLIENT_ID="..." # If using Google OAuth
GOOGLE_CLIENT_SECRET="..." # If using Google OAuth
```

## Post-Deployment Checklist

- [ ] Database migrations applied
- [ ] Environment variables set correctly
- [ ] Health check endpoint responds (/)
- [ ] Authentication works (try logging in)
- [ ] Create a test campaign
- [ ] Export functionality works
- [ ] Set up monitoring (Vercel Analytics, Sentry)

## Troubleshooting

**Build fails:** Check that all environment variables are set
**Database connection error:** Verify DATABASE_URL is correct
**Auth redirect loop:** Verify NEXTAUTH_URL matches your domain exactly
**Claude API errors:** Check ANTHROPIC_API_KEY is valid

## Backup Strategy

Schedule automatic database backups:
```bash
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

Store backups securely in S3 or similar.
