const axios = require('axios');
const Transaction = require('../models/transaction');

exports.seedDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;
    await Transaction.insertMany(transactions);
    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  try {
    const query = {
      dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') },
    };

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: search },
      ];
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
