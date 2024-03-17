const Product = require("../models/product");
const mongoose = require("mongoose");
const axios = require('axios');

//Get All Products and Save into db
const getAllProductsAndSaveIntoDB = async (req, res,next) => {
    try {
        const existingProducts = await Product.find({});

        // If products already exist, send them in the response
        if (existingProducts.length > 0) {
            return res.status(200).json({
                message: "Products already exists",
                savedProducts: existingProducts
            });
        }

        // Fetch data from external API
        const response = await axios.get('https://64e0caef50713530432cafa1.mockapi.io/api/products');
        const products = response.data;

        // Save products to MongoDB
        await Product.insertMany(products);

        // Fetch products from MongoDB
        const savedProducts = await Product.find({});

        // Send products in response
        res.status(200).json({ savedProducts });
    } catch (error) {
        console.log(error);
        res.status(400);
        return next(new Error(error.message));
    }
}

//Get Product By ID
const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            res.status(400);
            return next(new Error("Invalid ID format"));
        }

        const product = await Product.findById(productId);
        if (!product) {
            res.status(400);
            return next(new Error("No such Product exist"));
        }

        res.status(200).json({
            status: "SUCCESS",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(400);
        return next(new Error(error.message));
    }
}

//Update Quiz by id
const updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { productName, price, image, productDescription, department } = req.body;

        const product = await Product.findByIdAndUpdate(productId, { productName, price, image, productDescription, department }, { new: true });

        if (!product) {
            // No product found with the provided ID
            res.status(400);
            return next(new Error("No such Product exist"));
        }

        res.json({
            status: "SUCCESS",
            message: "Product Updated Successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(400);
        return next(new Error(error.message));
    }

}


module.exports = { getAllProductsAndSaveIntoDB, getProductById, updateProduct }