const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// POST: Save multiple products
router.post('/upload', async (req, res) => {
    try {
        const products = req.body; // Array of objects from the CSV
        console.log(products)
        await Product.insertMany(products); // Insert data into MongoDB
        res.status(201).json({ message: 'Products saved successfully!', count: products.length });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to save products', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const products = req.body; // Array of objects from the CSV
        const updatedData = req.body;
        console.log(products)
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        );
        res.status(201).json({ message: 'Products updated successfully!', 'SKU': updatedProduct['SKU'], 'Product Name': updatedProduct['Product Name'] });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to save products', details: error.message });
    }
});



// GET: Retrieve all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const reqParams = req.body
        for (let key in reqParams) {
            if (key !== 'Date')
                reqParams[key] = { $regex: reqParams[key] };
            else
                reqParams[key] = { $gte: new Date(reqParams[key]).toISOString() };

        }
        console.log(reqParams)
        const products = await Product.find({ ...reqParams });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
});



module.exports = router;
