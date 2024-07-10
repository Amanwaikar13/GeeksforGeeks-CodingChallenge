const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/product_transactions_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Remove the deprecated options below:
    // useCreateIndex: true,
    // useFindAndModify: false
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json());


app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
