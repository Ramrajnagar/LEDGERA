---
description: Complete deployment guide for Ledgera application
---

# Ledgera Deployment Guide

This guide will walk you through deploying your Decentralized Supply Chain Orchestrator to production using Vercel (recommended for Next.js applications).

## Prerequisites Checklist

Before deploying, ensure you have:
- [ ] A GitHub account
- [ ] A Vercel account (sign up at https://vercel.com)
- [ ] Supabase project credentials (already configured)
- [ ] All code committed to Git

---

## Step 1: Verify Local Build

First, ensure your application builds successfully locally.

```bash
npm run build
```

**Expected Output**: Build should complete without errors. If you see errors, fix them before proceeding.

---

## Step 2: Prepare Environment Variables

Your application needs these environment variables in production:

1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. `DATABASE_URL`
4. `DIRECT_URL`

These are already in your `.env.local` file. You'll add them to Vercel in Step 5.

---

## Step 3: Push Code to GitHub

If you haven't already pushed your code to GitHub:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

**Note**: If you don't have a remote repository set up, create one on GitHub first:
1. Go to https://github.com/new
2. Create a new repository (e.g., "Decentralized-Supply-Chain-Orchestrator")
3. Follow GitHub's instructions to push your existing code

---

## Step 4: Connect to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended for First-Time)

1. Go to https://vercel.com and sign in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Vercel will auto-detect it's a Next.js project

### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts to link your project.

---

## Step 5: Configure Environment Variables in Vercel

**CRITICAL**: Your app won't work without these!

1. In Vercel Dashboard, go to your project
2. Click **Settings** → **Environment Variables**
3. Add each variable:

   **Variable Name**: `NEXT_PUBLIC_SUPABASE_URL`
   **Value**: (Copy from your `.env.local`)
   **Environments**: Production, Preview, Development ✓

   **Variable Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   **Value**: (Copy from your `.env.local`)
   **Environments**: Production, Preview, Development ✓

   **Variable Name**: `DATABASE_URL`
   **Value**: (Copy from your `.env.local`)
   **Environments**: Production, Preview, Development ✓

   **Variable Name**: `DIRECT_URL`
   **Value**: (Copy from your `.env.local`)
   **Environments**: Production, Preview, Development ✓

4. Click **Save** for each variable

---

## Step 6: Configure Build Settings (Usually Auto-Detected)

Vercel should auto-detect these, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x or higher

---

## Step 7: Deploy

1. Click **"Deploy"** in Vercel
2. Wait for the build to complete (usually 2-5 minutes)
3. Vercel will provide a production URL (e.g., `your-app.vercel.app`)

---

## Step 8: Verify Deployment

1. Visit your production URL
2. Test key features:
   - [ ] Landing page loads correctly
   - [ ] Dashboard is accessible at `/dashboard`
   - [ ] Map visualization works
   - [ ] Agent decision feed displays
   - [ ] No console errors in browser DevTools

---

## Step 9: Set Up Custom Domain (Optional)

1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain (e.g., `ledgera.com`)
3. Follow Vercel's DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

---

## Step 10: Configure Supabase for Production

Update your Supabase project to allow your production domain:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Add your Vercel URL to **Site URL**
5. Add your Vercel URL to **Redirect URLs**

---

## Troubleshooting Common Issues

### Build Fails with "Module not found"
- Run `npm install` locally and commit `package-lock.json`
- Ensure all imports use correct paths

### Environment Variables Not Working
- Ensure variables starting with `NEXT_PUBLIC_` are used for client-side code
- Redeploy after adding environment variables

### Database Connection Errors
- Verify `DATABASE_URL` and `DIRECT_URL` are correct
- Check Supabase project is active and accessible

### 404 on Routes
- Ensure you're using Next.js App Router structure (`app/` directory)
- Check file naming conventions

---

## Continuous Deployment

Once connected to GitHub, Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically build and deploy!

---

## Monitoring and Analytics

1. **Vercel Analytics**: Enable in Dashboard → Analytics
2. **Error Tracking**: Check Vercel Dashboard → Deployments → Logs
3. **Performance**: Use Vercel Speed Insights

---

## Alternative Deployment Options

### Deploy to Netlify
1. Sign up at https://netlify.com
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables

### Deploy to Your Own Server (VPS)
```bash
# On your server
git clone your-repo
cd your-repo
npm install
npm run build
npm start
```

Use PM2 for process management:
```bash
npm install -g pm2
pm2 start npm --name "ledgera" -- start
pm2 save
pm2 startup
```

---

## Security Checklist Before Going Live

- [ ] All sensitive keys are in environment variables (not hardcoded)
- [ ] `.env.local` is in `.gitignore`
- [ ] Supabase Row Level Security (RLS) policies are configured
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled (if applicable)
- [ ] HTTPS is enforced (Vercel does this automatically)

---

## Post-Deployment

1. **Monitor**: Check Vercel logs for errors
2. **Test**: Perform end-to-end testing on production
3. **Backup**: Ensure Supabase has automatic backups enabled
4. **Document**: Update README with production URL

---

**Congratulations! Your Ledgera application is now live! 🚀**

For support, check:
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
