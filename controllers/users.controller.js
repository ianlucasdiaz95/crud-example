const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const usersGet = async (req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    try {

        const users = await User.find({
            ...req.query,
            status: true
        });

        res.json({
            success: true,
            data: users
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });

        console.log(error);
    }
    
}

const usersPost = async (req, res = response) => {

    const {
        name,
        email,
        password,
        img,
        role
    } = req.body;

    const user = new User({
        name,
        email,
        password,
        img,
        role
    });

    //Password encription
    const salt = await bcrypt.genSaltSync();
    user.password = await bcrypt.hashSync(password, salt);

    try {

        await user.save();

        res.json({
            success: true,
            user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

        console.log(error);

    }  

    
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...user } = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
    }
    
    try {

        const userDB = await User.findByIdAndUpdate(id, user, { new: true });

        if (!userDB) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User updated',
            user: userDB
        });
        
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

const usersPatch = async (req, res = response) => {
    

}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;

    try {

        const userDB = await User.findByIdAndDelete(id);

        if (!userDB) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User deleted',
            user: userDB
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}




module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}