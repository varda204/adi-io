# Deployment Guide - ADI-IO

This guide will help you deploy the ADI-IO platform to various hosting providers.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Vercel Deployment](#vercel-deployment)
4. [Netlify Deployment](#netlify-deployment)
5. [Docker Deployment](#docker-deployment)
6. [Manual Deployment](#manual-deployment)
7. [Post-Deployment](#post-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- Node.js 18+ installed (for local builds)
- Git repository with your ADI-IO code
- Account on your chosen hosting platform
- Environment variables configured

---

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# API Configuration
VITE_API_URL=https://api.yourdomain.com
VITE_WS_URL=wss://ws.yourdomain.com

# GitHub Integration (optional)
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_REDIRECT_URI=https://yourdomain.com/auth/callback

# Analytics (optional)
VITE_ENABLE_ANALYTICS=true
VITE_ANALYTICS_ID=your_analytics_id

# Feature Flags (optional)
VITE_ENABLE_VOICE_COMMANDS=true
VITE_ENABLE_AI_FEATURES=true
```

### Important Notes

- All environment variables must be prefixed with `VITE_` to be accessible in the client
- Never commit `.env` files with real credentials to version control
- Use your hosting provider's environment variable management for production

---

## Vercel Deployment

### Option 1: Deploy via Lovable

1. Open your [Lovable project](https://lovable.dev/projects/af50258b-3fe5-4af5-a447-478c9247b632)
2. Click on **Share** → **Publish**
3. Follow the deployment wizard
4. Your app will be live in minutes!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # From your project root
   vercel
   
   # Follow the prompts:
   # - Set up and deploy? Yes
   # - Which scope? Select your account
   # - Link to existing project? No
   # - Project name? adi-io (or your preferred name)
   # - Directory? ./ (current directory)
   # - Override build settings? No
   ```

4. **Add Environment Variables**
   ```bash
   # Add each environment variable
   vercel env add VITE_API_URL production
   # Enter the value when prompted
   
   # Repeat for all variables
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 3: Deploy via GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add environment variables in the settings
6. Click **Deploy**

### Vercel Configuration File

Create `vercel.json` in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Netlify Deployment

### Option 1: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   
   # Follow prompts:
   # - Create & configure a new site
   # - Team: Select your team
   # - Site name: adi-io (or your preferred name)
   # - Build command: npm run build
   # - Directory: dist
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 2: GitHub Integration

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variables
6. Click **Deploy site**

### Netlify Configuration File

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Docker Deployment

### Dockerfile

Create `Dockerfile` in your project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### Build and Run Docker Container

```bash
# Build the image
docker build -t adi-io:latest .

# Run the container
docker run -d -p 8080:80 --name adi-io adi-io:latest

# View logs
docker logs adi-io

# Stop container
docker stop adi-io

# Remove container
docker rm adi-io
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  adi-io:
    build: .
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - adi-network

networks:
  adi-network:
    driver: bridge
```

Run with Docker Compose:

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

---

## Manual Deployment

For custom servers or VPS:

### 1. Build the Application

```bash
# Clone repository
git clone https://github.com/varda204/adi-io.git
cd adi-io

# Install dependencies
npm install

# Build for production
npm run build

# The built files will be in the 'dist' directory
```

### 2. Configure Web Server

#### Apache

Create `.htaccess` in the `dist` directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx

Add to your nginx configuration:

```nginx
location / {
    root /var/www/adi-io/dist;
    try_files $uri $uri/ /index.html;
    expires -1;
}

location /assets/ {
    root /var/www/adi-io/dist;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Upload Files

```bash
# Using SCP
scp -r dist/* user@yourserver.com:/var/www/adi-io/

# Using rsync
rsync -avz dist/ user@yourserver.com:/var/www/adi-io/
```

### 4. Restart Web Server

```bash
# Apache
sudo systemctl restart apache2

# Nginx
sudo systemctl restart nginx
```

---

## Post-Deployment

### 1. Verify Deployment

- Visit your deployed URL
- Check that all pages load correctly
- Test navigation between pages
- Verify API connections work
- Test responsive design on mobile

### 2. Configure DNS

Point your domain to your hosting provider:

- **Vercel**: Add domain in project settings
- **Netlify**: Add domain in site settings
- **Custom**: Update A/CNAME records

### 3. Enable HTTPS

Most hosting providers offer free SSL certificates:

- **Vercel/Netlify**: Automatic HTTPS
- **Let's Encrypt**: For custom servers

### 4. Set Up Monitoring

- Configure uptime monitoring (e.g., UptimeRobot)
- Set up error tracking (e.g., Sentry)
- Enable analytics (if configured)

### 5. Performance Optimization

- Enable CDN for static assets
- Configure caching headers
- Enable compression (gzip/brotli)
- Optimize images

---

## Troubleshooting

### Build Fails

**Error**: `npm ERR! code ELIFECYCLE`

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Don't Work (404 on Refresh)

**Problem**: SPA routing not configured

**Solution**: Add rewrite rules (see platform-specific sections above)

### Environment Variables Not Working

**Problem**: Variables not prefixed with `VITE_`

**Solution**: 
- Ensure all variables start with `VITE_`
- Rebuild after changing variables
- Clear cache if needed

### Blank Page After Deployment

**Problem**: JavaScript errors or incorrect base path

**Solution**:
1. Check browser console for errors
2. Verify `base` in `vite.config.ts`
3. Check that all assets load correctly

### API Requests Fail

**Problem**: CORS or incorrect API URL

**Solution**:
- Verify `VITE_API_URL` is correct
- Check CORS configuration on backend
- Ensure API is accessible from deployed domain

---

## Support

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/varda204/adi-io/issues)
2. Join our [Discord community](https://discord.gg/adi-io) (Coming Soon)
3. Email support: deploy@adi-io.dev

---

**Last Updated**: February 17, 2026
