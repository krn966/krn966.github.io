const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Credit card data
const creditCards = {
    'ICICI_Sapphiro': {
        name: 'ICICI Sapphiro',
        bank: 'ICICI',
        annualFee: 3500,
        rewardRate: {
            domestic: 2,
            international: 4,
            utilities: 1
        },
        welcomeBenefits: {
            feeReversal: {
                amount: 3500,
                condition: 'Spend ₹50,000 in first 90 days'
            },
            vouchers: 2000
        },
        milestoneBenefits: [
            { threshold: 400000, points: 4000, value: 1000 },
            { threshold: 500000, points: 2000, value: 500 }
        ],
        insurance: {
            airAccident: 30000000,
            baggage: 84000,
            flightDelay: 10000
        },
        additionalBenefits: {
            loungeAccess: '4 visits per quarter',
            fuelSurcharge: '1% waiver'
        }
    },
    'SBI_Elite': {
        name: 'SBI Elite',
        bank: 'SBI',
        annualFee: 4999,
        rewardRate: {
            dining: 5,
            other: 2,
            utilities: 1
        },
        welcomeBenefits: {
            feeReversal: {
                amount: 4999,
                condition: 'Spend ₹1,00,000 in first 90 days'
            },
            vouchers: 5000
        },
        milestoneBenefits: [
            { threshold: 300000, points: 10000, value: 2500 },
            { threshold: 800000, points: 50000, value: 12500 }
        ],
        travelBenefits: {
            loungeAccess: '6 visits per year',
            airAccident: 10000000,
            flightDelay: 5000
        },
        additionalBenefits: {
            fuelSurcharge: '1% waiver',
            diningDiscount: '15% at partner restaurants'
        }
    }
};

// API Routes
app.get('/api/cards', (req, res, next) => {
    try {
        res.json(creditCards);
    } catch (error) {
        next(error);
    }
});

app.get('/api/cards/:id', (req, res, next) => {
    try {
        const card = creditCards[req.params.id];
        if (card) {
            res.json(card);
        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (error) {
        next(error);
    }
});

app.post('/api/compare', (req, res, next) => {
    try {
        const { cardIds } = req.body;
        if (!Array.isArray(cardIds)) {
            return res.status(400).json({ error: 'Invalid request format' });
        }
        const comparison = cardIds.map(id => creditCards[id]).filter(Boolean);
        res.json(comparison);
    } catch (error) {
        next(error);
    }
});

app.post('/api/check-eligibility', (req, res, next) => {
    try {
        const { monthlyIncome, creditScore } = req.body;
        if (!monthlyIncome || !creditScore) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const eligible = monthlyIncome >= 50000 && creditScore >= 750;
        res.json({ eligible });
    } catch (error) {
        next(error);
    }
});

app.post('/api/contact', (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Here you would typically send an email or store in database
        res.json({ success: true, message: 'Message received' });
    } catch (error) {
        next(error);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 