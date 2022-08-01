const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

const searchCollections = [
    'users',
    'categories',
    'products'
]

const searchUsers = async (query = '', res = response) => {
    

    try {

        const isMongoId = ObjectId.isValid(query);

        if (isMongoId) {
            const user = await User.findById(query);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.json({
                success: true,
                data: [ user ]
            });
        }

        const regex = new RegExp(query, 'i');

        const users = await User.find({
            $or: [
                { name: regex },   
                { email: regex }
            ],
            $and: [
                { status: true }
            ]
        });

        res.json({
            success: true,
            data: [users]
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }

    

};

const search = async (req = request, res = response) => {

    const { collection, query } = req.params;

    if(!searchCollections.includes(collection)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid collection'
        });
    }

    switch (collection) {
        case 'users': 
            searchUsers(query, res);
            break;
        case 'categories': 

            break;
        case 'products': 

        
            break;
        default:

            res.status(500).json({
                success: false,
                message: 'Search not implemented.'
            });

            break;
    }



    try {


        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
    
}




module.exports = {
    search
}