const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const { googleVerify } = require('../utils/google-verify');


const login = async (req = request, res = response) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        //Check if user exists
        if (!user) {
            res.status(400).json({
                success: false,
                message: 'Email / Password incorrect.'
            });
        }

        //Check if user is active
        if (!user.status) {
            res.status(400).json({
                success: false,
                message: 'User is not active.'
            });
        }

        //Check if password is valid
        const validPassword = await bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            res.status(400).json({
                success: false,
                message: 'Password is not valid.'
            });
        }

        //Generate JWT

        const token = await jwt.generate(user);

        res.json({
            success: true,
            data: user,
            token
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
    
}

const google = async (req = request, res = response) => {

    try {

        const { id_token } = req.body;

        const data = await googleVerify(id_token);
        
        let user = await User.findOne({ email: data.email });

        if(!user) {
            // Create new user

            user = new User({
                name: data.name,
                email: data.email,
                img: data.img,
                password: 'google',
                google: true,
                status: true
            });

            await user.save();

        }

        if( !user.status ){
            res.status(401).json({
                success: false,
                message: 'Unauthorized.'
            });
        }

        const token = await jwt.generate(user);


        res.json({
            success: true,
            data: user,
            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}




module.exports = {
    login,
    google
}