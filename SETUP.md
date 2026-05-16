# MTN MoMo Loans - Quick Setup Guide

## 📋 Requirements
- Node.js 18 or higher
- MongoDB (Atlas or local)
- npm package manager

## ⚡ Quick Start (5 minutes)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Setup Environment
Create a `.env` file:
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/innbucks_loan_platform?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

### 3️⃣ Start Server
```bash
npm start
```

### 4️⃣ Open Browser
```
http://localhost:3000
```

## 🧪 Test the App

### Demo Login Credentials
- **Phone**: 670123456 (or any 9-digit number starting with 6, 7, or 9)
- **PIN**: 12345 (or any 5 digits)
- **OTP**: 1234 (or any 4 digits)

### Test SMS Message
Copy and paste in SMS step:
```
Your MTN MoMo verification code is: 123456. Valid for 15 minutes. Do not share.
```

## 🗂️ Project Structure

```
index.html          ← Frontend (all UI/CSS/JavaScript)
server.js           ← Backend (Express.js)
database.js         ← MongoDB operations
package.json        ← Dependencies
.env               ← Configuration (create from .env.example)
.env.example       ← Template
```

## 🎨 Key Features

✅ Landing page with loan calculator
✅ 3-step application form
✅ User login (phone + 5-digit PIN)
✅ SMS verification (paste SMS from phone)
✅ Wait for approval screen
✅ OTP verification (4-digit OTP)
✅ Loan approval confirmation
✅ MTN branding (gold + dark blue)
✅ Cameroon localization (+237, XAF)
✅ Fully responsive design

## 📱 User Journey

1. **Landing** → View loan calculator
2. **Application** → 3 steps of form
3. **Processing** → Wait animation
4. **Login** → Enter phone + 5-digit PIN
5. **SMS** → Paste message from phone
6. **Wait** → Admin approval animation
7. **OTP** → Enter 5-digit PIN + 4-digit OTP
8. **Approved** → Loan details + success message

## 🔐 Security Notes

⚠️ **For Production Only:**
- Use HTTPS
- Validate all inputs server-side
- Implement rate limiting
- Add proper authentication
- Use secure cookies
- Implement CSRF protection
- Add request logging
- Monitor for suspicious activity

## 🚀 Development Commands

```bash
# Start development server
npm start

# Run with nodemon (auto-reload)
npm run dev

# Clean database
node cleanup.js apps      # Delete all applications
node cleanup.js admins    # Delete all admins
node cleanup.js both      # Delete everything
```

## 🐛 Common Issues

**Port 3000 already in use?**
```bash
PORT=3001 npm start
```

**Can't connect to MongoDB?**
- Check MONGODB_URI in .env
- Verify MongoDB is running
- Check network/IP whitelist on MongoDB Atlas

**Tests failing?**
- Clear browser cache
- Check browser console for errors
- Verify .env is set correctly
- Restart npm server

## 📞 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Create .env file with MongoDB URI
3. ✅ Start server: `npm start`
4. ✅ Open http://localhost:3000
5. ✅ Test the workflow
6. ✅ Integrate with real MTN API
7. ✅ Deploy to production

## 🎯 What to Customize

**Colors** - Edit `:root` in index.html
**Currency** - Replace XAF with your currency
**Phone Format** - Update validation for different countries
**Content** - Update all text/labels as needed
**API** - Connect to real MTN MoMo endpoints

## 📚 File Descriptions

| File | Purpose |
|------|---------|
| index.html | Complete UI with all pages and forms |
| server.js | Express.js API server |
| database.js | MongoDB operations |
| package.json | Node.js dependencies |
| .env | Configuration (not committed) |
| .env.example | Configuration template |
| cleanup.js | Database cleanup utility |
| README.md | Full documentation |

## 🌍 Deployment Options

### Render
1. Push to GitHub
2. Connect to Render
3. Set MONGODB_URI env var
4. Deploy!

### Heroku
```bash
heroku create app-name
heroku config:set MONGODB_URI=your_uri
git push heroku main
```

### Docker
```bash
docker build -t mtn-loans .
docker run -p 3000:3000 mtn-loans
```

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB connection ready
- [ ] .env file created
- [ ] Dependencies installed: `npm install`
- [ ] Server running: `npm start`
- [ ] Browser open: http://localhost:3000
- [ ] Test flow works
- [ ] Customize branding
- [ ] Connect real APIs
- [ ] Deploy to production

---

**Happy coding! 🚀**
