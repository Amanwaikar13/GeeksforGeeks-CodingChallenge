
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    sold: { type: Boolean, required: true },
    dateOfSale: { type: Date, required: true }
});


const Transaction = mongoose.model('Transactions', transactionSchema);

module.exports = Transaction;
