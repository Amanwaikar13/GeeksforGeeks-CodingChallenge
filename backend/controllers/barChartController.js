const Transaction = require('../models/transaction');


const categorizeByPriceRange = (transactions) => {
    const ranges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901-above': 0
    };

    transactions.forEach(transaction => {
        const price = transaction.price;

        if (price <= 100) {
            ranges['0-100']++;
        } else if (price <= 200) {
            ranges['101-200']++;
        } else if (price <= 300) {
            ranges['201-300']++;
        } else if (price <= 400) {
            ranges['301-400']++;
        } else if (price <= 500) {
            ranges['401-500']++;
        } else if (price <= 600) {
            ranges['501-600']++;
        } else if (price <= 700) {
            ranges['601-700']++;
        } else if (price <= 800) {
            ranges['701-800']++;
        } else if (price <= 900) {
            ranges['801-900']++;
        } else {
            ranges['901-above']++;
        }
    });

    return ranges;
};

const getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({ error: 'Month is required' });
        }

        const monthNumber = parseInt(month, 10);

        if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ error: 'Invalid month value' });
        }

        const transactions = await Transaction.find();

        const filteredTransactions = transactions.filter(transaction => {
            const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
            return transactionMonth === monthNumber;
        });

        const categorizedData = categorizeByPriceRange(filteredTransactions);

        res.status(200).json(categorizedData);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getBarChartData
};
