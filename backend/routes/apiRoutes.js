const express = require('express');
const axios = require('axios');
const Transaction = require('../models/transaction');
const barChartRoutes = require('./barChartRoutes');
const pieChartRoutes = require('./pieChartRoutes');

const router = express.Router();

router.use(barChartRoutes);
router.use(pieChartRoutes);

router.get('/transactions', async (req, res) => {
    try {
        const { search = '', page = 1, perPage = 6 } = req.query;

        console.log('Search term:', search);

        let searchQuery = {};

        if (search) {
            if (!isNaN(searchNumber)) {
                searchQuery = {
                    $or: [
                        { title: new RegExp(search, 'i') },
                        { description: new RegExp(search, 'i') },
                        { price: searchNumber } 
                    ]
                };
            } else {
                searchQuery = {
                    $or: [
                        { title: new RegExp(search, 'i') },
                        { description: new RegExp(search, 'i') }
                    ]
                };
            }
        }

        console.log('Search Query:', JSON.stringify(searchQuery));

        const pageNumber = parseInt(page, 10);
        const perPageNumber = parseInt(perPage, 10);

        const totalDocuments = await Transaction.countDocuments(searchQuery);
        const transactions = await Transaction.find(searchQuery)
            .skip((pageNumber - 1) * perPageNumber)
            .limit(perPageNumber);

        console.log('Transactions found:', transactions.length);

        res.status(200).json({
            transactions,
            totalDocuments,
            totalPages: Math.ceil(totalDocuments / perPageNumber),
            currentPage: pageNumber
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/statistics', async (req, res) => {
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

        const totalSaleAmount = filteredTransactions.reduce((acc, transaction) => acc + transaction.price, 0);
        const totalSoldItems = filteredTransactions.filter(transaction => transaction.sold).length;
        const totalNotSoldItems = filteredTransactions.filter(transaction => !transaction.sold).length;

        res.status(200).json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems,
            totalTransactions: filteredTransactions.length
        });

    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;