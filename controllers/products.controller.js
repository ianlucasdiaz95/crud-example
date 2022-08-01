const { response, request } = require('express');
const Product = require('../models/product.model');

const productsGet = async (req = request, res = response) => {

    try {

        const products = await Product.find({
            ...req.query,
            status: true
        }).populate('user', 'name email').populate('category', 'name');

        res.json({
            success: true,
            data: products
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });

        console.log(error);
    }
    
}

const productGet = async (req = request, res = response) => {

    try {

        const product = await Product.findById(req.params.id).populate('user', 'name email').populate('category', 'name');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        res.json({
            success: true,
            data: product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });

        console.log(error);
    }

}

const productsPost = async (req, res = response) => {

    const { 
        name,
        category,
        price,
        description,
        available
    } = req.body;

    try {

        const productDB = await Product.findOne({
            name: new RegExp(["^", name, "$"].join(""), "i")
        });

        if (productDB && productDB.name.toLowerCase() === name.toLowerCase()) {
            return res.status(400).json({
                success: false,
                message: `Product ${name} already exists.`
            });
        }

        const product = new Product({
            name,
            category,
            price,
            description,
            available,
            user: req.user._id
        });

        await product.save();

        res.json({
            success: true,
            data: product
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

        console.log(error);

    }  

    
}

const productsPut = async (req, res = response) => {

    const {
        name,
        category,
        price,
        description,
        available
    } = req.body;

    const data = {
        name,
        category,
        price,
        description,
        available,
        user: req.user._id
    }
    
    try {

        const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found.'
            });
        }

        res.json({
            success: true,
            data: product
        });
        
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

const productsDelete = async (req, res = response) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found.'
            });
        }

        res.json({
            success: true,
            message: 'User deleted',
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}




module.exports = {
    productsGet,
    productGet,
    productsPost,
    productsPut,
    productsDelete,
}