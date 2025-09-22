# 🚀 Vercel Deployment Guide for Showcase.ai

## Quick Deploy to Vercel

### Method 1: One-Click Deploy (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_REPO_URL)

### Method 2: Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # For preview deployment
   yarn deploy:preview
   
   # For production deployment
   yarn deploy
   ```

## Configuration Details

### Build Settings (Auto-detected)
- **Framework**: Vite
- **Build Command**: `yarn build`
- **Output Directory**: `dist`
- **Install Command**: `yarn install`
- **Dev Command**: `yarn dev`

### Environment Variables (Optional)
Set these in Vercel Dashboard → Project → Settings → Environment Variables:

```
VITE_APP_TITLE=Showcase.ai
VITE_APP_DESCRIPTION=Transform your projects into professional showcases
```

### Domain Configuration
- Custom domains can be added in Vercel Dashboard
- Automatic HTTPS provided
- Global CDN distribution included

## Troubleshooting

### Common Issues & Solutions

1. **Host Blocked Error**
   - Fixed: `allowedHosts: 'all'` in vite.config.js
   - Works with any Vercel preview domain

2. **Build Errors**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules dist
   yarn install
   yarn build
   ```

3. **Routing Issues**
   - Fixed: SPA fallback in vercel.json
   - All routes redirect to index.html

4. **Asset Loading**
   - Assets are cached for 1 year
   - Served from Vercel's global CDN

### Performance Optimizations
- ✅ Code splitting (vendor, ui, main chunks)
- ✅ Tree shaking enabled
- ✅ CSS optimization
- ✅ Image optimization via Vercel
- ✅ Gzip compression
- ✅ HTTP/2 & HTTP/3 support

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test form functionality
- [ ] Check responsive design on mobile
- [ ] Validate copy/download features
- [ ] Test toast notifications
- [ ] Verify loading animations

## Monitoring & Analytics

Add to your project (optional):
```bash
yarn add @vercel/analytics
yarn add @vercel/speed-insights
```

Then add to your main.jsx:
```javascript
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// Add to your App component
return (
  <div>
    <YourApp />
    <Analytics />
    <SpeedInsights />
  </div>
)
```

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [React Router with Vercel](https://vercel.com/guides/deploying-react-with-vercel)

---

**Ready to showcase your projects to the world! 🌟**