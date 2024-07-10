const Transaction = require('../models/transaction');

const getPieChartData = async (req, res) => {
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

        const categoryCounts = filteredTransactions.reduce((acc, transaction) => {
            const category = transaction.category;
            if (acc[category]) {
                acc[category]++;
            } else {
                acc[category] = 1;
            }
            return acc;
        }, {});

        res.status(200).json(categoryCounts);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getPieChartData
};
