const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_UNAME}:${process.env.DB_PWD}@cluster0.xynx5.mongodb.net/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};
connectDB();

module.exports = app;
