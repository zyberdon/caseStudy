const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    'Store ID': { type: String, required: true },
    'SKU': { type: String, required: true },
    'Product Name': { type: String, required: true },
    'Price': { type: Number, required: true },
    'Date': { type: Date, required: true },
});

module.exports = mongoose.model('Product', productSchema);
