const Role = require('../models/role.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

const validRole = async (role = '') => {

    const roleExists = await Role.findOne({ role: role });

    if (!roleExists) {
        throw new Error('Invalid role.');
    }
}

const emailExists = async (email) => {

    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
        throw new Error('Email invalid.');
    }
}

const userExistsById = async (id) => {

    const userExists = await User.findById(id);

    if (!userExists) {
        throw new Error('User ID not found.');
    }
}

const categoryExistsById = async (id) => {
    
    const categoryExists = await Category.findById(id);

    if (!categoryExists) {
        throw new Error('Category ID not found.');
    }
}

const productExistsById = async (id) => {

    const productExists = await Product.findById(id);

    if (!productExists) {
        throw new Error('Product ID not found.');
    }
}

module.exports = { 
    validRole,
    emailExists,
    userExistsById,
    categoryExistsById,
    productExistsById
};