# Deployment Guide - MTN MoMo Loans Platform

## 🚀 Deployment Options

Choose one of the following deployment platforms:

---

## 1. 🔵 Render (Recommended - Free Tier Available)

### Prerequisites
- GitHub account
- Render account (free signup)
- MongoDB Atlas account

### Steps

#### Step 1: Prepare Your Code
```bash
# Initialize Git repo if needed
git init

# Add all files
git add .
git commit -m "Initial commit: MTN MoMo Loans"

# Push to GitHub
git push origin main
```

#### Step 2: Create Render App
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository and branch

#### Step 3: Configure Render
- **Name**: mtn-momo-loans
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free (or paid for production)

#### Step 4: Set Environment Variables
In Render dashboard:
1. Go to "Environment" tab
2. Add variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innbucks_loan_platform?retryWrites=true&w=majority
   NODE_ENV=production
   PORT=3000
   ```

#### Step 5: Deploy
- Click "Deploy"
- Wait for build to complete
- Your app is live at `https://your-app-name.onrender.com`

---

## 2. 🟪 Heroku (Easy, Paid)

### Prerequisites
- Heroku account
- Heroku CLI installed
- Git installed

### Steps

#### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download from heroku.com/download

# Verify
heroku --version
```

#### Step 2: Login to Heroku
```bash
heroku login
```

#### Step 3: Create App
```bash
heroku create mtn-momo-loans
```

#### Step 4: Set Environment Variables
```bash
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innbucks_loan_platform?retryWrites=true&w=majority

heroku config:set NODE_ENV=production
```

#### Step 5: Deploy
```bash
git push heroku main
```

#### Step 6: View Logs
```bash
heroku logs --tail
```

#### Step 7: Open App
```bash
heroku open
```

---

## 3. 🐋 Docker + Cloud Run (Google Cloud)

### Prerequisites
- Docker installed
- Google Cloud account
- gcloud CLI installed

### Steps

#### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
```

#### Step 2: Build Docker Image
```bash
docker build -t mtn-momo-loans .
```

#### Step 3: Test Locally
```bash
docker run -p 3000:3000 \
  -e MONGODB_URI=your_mongodb_uri \
  mtn-momo-loans
```

#### Step 4: Push to Google Container Registry
```bash
# Configure gcloud
gcloud config set project YOUR_PROJECT_ID

# Tag image
docker tag mtn-momo-loans gcr.io/YOUR_PROJECT_ID/mtn-momo-loans

# Push
docker push gcr.io/YOUR_PROJECT_ID/mtn-momo-loans
```

#### Step 5: Deploy to Cloud Run
```bash
gcloud run deploy mtn-momo-loans \
  --image gcr.io/YOUR_PROJECT_ID/mtn-momo-loans \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars MONGODB_URI=your_mongodb_uri
```

---

## 4. 🟢 AWS (Elastic Beanstalk)

### Prerequisites
- AWS account
- AWS CLI installed

### Steps

#### Step 1: Create .ebextensions/node.config
```yaml
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NODE_ENV: production
```

#### Step 2: Initialize EB
```bash
eb init -p "Node.js 18 running on 64bit Amazon Linux 2" mtn-momo-loans
```

#### Step 3: Set Environment Variables
```bash
eb setenv MONGODB_URI=your_mongodb_uri NODE_ENV=production
```

#### Step 4: Create Environment
```bash
eb create mtn-momo-loans-env
```

#### Step 5: Deploy
```bash
eb deploy
```

#### Step 6: Open App
```bash
eb open
```

---

## 5. 🐧 Traditional VPS (DigitalOcean, Linode, etc.)

### Prerequisites
- VPS with Ubuntu 20.04+
- SSH access
- Domain name (optional)

### Steps

#### Step 1: Connect to VPS
```bash
ssh root@your_vps_ip
```

#### Step 2: Update System
```bash
apt update && apt upgrade -y
```

#### Step 3: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs
```

#### Step 4: Install Nginx
```bash
apt install -y nginx
```

#### Step 5: Clone Repository
```bash
cd /var/www
git clone https://github.com/yourusername/mtn-momo-loans.git
cd mtn-momo-loans
```

#### Step 6: Install Dependencies
```bash
npm install
```

#### Step 7: Create .env
```bash
cat > .env << EOF
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innbucks_loan_platform
NODE_ENV=production
PORT=3000
EOF
```

#### Step 8: Setup PM2
```bash
npm install -g pm2

pm2 start server.js --name "mtn-momo"
pm2 startup
pm2 save
```

#### Step 9: Configure Nginx
```bash
cat > /etc/nginx/sites-available/mtn-momo << 'EOF'
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```

#### Step 10: Enable Site
```bash
ln -s /etc/nginx/sites-available/mtn-momo /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### Step 11: Setup SSL (Free with Let's Encrypt)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your_domain.com
```

---

## 🔒 Production Checklist

- [ ] Environment variables are set (MONGODB_URI, NODE_ENV)
- [ ] HTTPS is enabled (SSL certificate)
- [ ] MongoDB backups are configured
- [ ] Logging is enabled
- [ ] Error monitoring is set up (Sentry, etc.)
- [ ] Rate limiting is configured
- [ ] CORS is properly configured
- [ ] CSRF protection is enabled
- [ ] Security headers are set
- [ ] Database indexes are created
- [ ] Monitoring/alerts are enabled
- [ ] Disaster recovery plan is ready

---

## 📊 Environment Variables Needed

| Variable | Value | Example |
|----------|-------|---------|
| MONGODB_URI | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| PORT | Server port | `3000` |
| NODE_ENV | Environment | `production` |

---

## 🔍 Monitoring

### Check Server Status
```bash
# On VPS
pm2 status
pm2 logs mtn-momo

# Check uptime
pm2 monit
```

### Monitor Logs
- **Render**: Dashboard → "Logs"
- **Heroku**: `heroku logs --tail`
- **AWS**: CloudWatch Logs
- **VPS**: `tail -f ~/.pm2/logs/mtn-momo-error.log`

---

## 🚨 Troubleshooting

### App Won't Start
```bash
# Check logs
npm start

# Check port is available
lsof -i :3000

# Check MongoDB connection
mongodb-compass or mongosh
```

### High Memory Usage
```bash
# Restart app
pm2 restart mtn-momo

# Check for memory leaks
pm2 monit
```

### Database Connection Error
```bash
# Verify MongoDB URI
echo $MONGODB_URI

# Test connection
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/db"
```

### Domain/DNS Issues
```bash
# Check DNS resolution
nslookup your_domain.com

# Test connectivity
curl -I https://your_domain.com
```

---

## 📈 Scaling

### Horizontal Scaling (Multiple Instances)
- Use load balancer (Nginx, HAProxy)
- Run multiple Node.js instances
- Use process manager (PM2, systemd)

### Vertical Scaling (More Resources)
- Upgrade VPS/server specs
- Upgrade MongoDB plan
- Increase cache limits

### Database Optimization
- Create proper indexes
- Archive old records
- Enable compression

---

## 🔐 Security Hardening

### Nginx Security
```nginx
# Hide version
server_tokens off;

# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

### Node.js Security
```javascript
// Helmet for headers
const helmet = require('helmet');
app.use(helmet());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

### MongoDB Security
- Enable authentication
- Use VPC networking
- IP whitelist
- Enable encryption
- Regular backups

---

## 📞 Deployment Support

If you encounter issues:

1. **Check the logs** - Most problems show in logs
2. **Verify environment variables** - Common issue
3. **Test locally** - Run on local machine first
4. **Check MongoDB connection** - Often the culprit
5. **Review firewall rules** - May block connections
6. **Contact platform support** - They're helpful!

---

## 🎉 You're Deployed!

Your MTN MoMo Loans platform is now live! 🚀

**Next Steps:**
1. Monitor the app
2. Test all features
3. Set up backups
4. Configure monitoring
5. Train admins
6. Launch to users

---

**Deployment Cost Estimates (Monthly):**
- Render Free: $0-7
- Heroku Hobby: $7
- AWS Free Tier: $0-15
- DigitalOcean Basic: $4-6
- MongoDB Atlas Free: $0

**Choose based on your needs and budget!**
