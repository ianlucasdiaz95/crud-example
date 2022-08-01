const { response, request } = require('express');
const Category = require('../models/category.model');

const categoriesGet = async (req = request, res = response) => {

    try {

        const categories = await Category.find({
            ...req.query,
            status: true
        }).populate('user', 'name email');

        res.json({
            success: true,
            data: categories
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });

        console.log(error);
    }
    
}

const categoryGet = async (req = request, res = response) => {

    try {

        const category = await Category.findById(req.params.id).populate('user', 'name email');

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found.'
            });
        }

        res.json({
            success: true,
            data: category
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });

        console.log(error);
    }

}

const categoriesPost = async (req, res = response) => {

    const { name } = req.body;

    try {

        const categoryDB = await Category.findOne({
            name: new RegExp(["^", name, "$"].join(""), "i")
        });

        if (categoryDB && categoryDB.name.toLowerCase() === name.toLowerCase()) {
            return res.status(400).json({
                success: false,
                message: `Category ${name} already exists.`
            });
        }

        const category = new Category({
            name,
            user: req.user._id
        });

        await category.save();

        res.json({
            success: true,
            message: 'Category created',
            data: category
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

        console.log(error);

    }  

    
}

const categoriesPut = async (req, res = response) => {

    const { name } = req.body;
    const data = {
        name,
        user: req.user._id
    }
    
    try {

        const category = await Category.findByIdAndUpdate(req.params.id, data, { new: true });

        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category not found.'
            });
        }

        res.json({
            success: true,
            message: 'Category updated',
            data: category
        });
        
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

const categoriesDelete = async (req, res = response) => {

    try {

        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category not found.'
            });
        }

        res.json({
            success: true,
            message: 'Category deleted',
            data: category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}




module.exports = {
    categoriesGet,
    categoryGet,
    categoriesPost,
    categoriesPut,
    categoriesDelete,
}