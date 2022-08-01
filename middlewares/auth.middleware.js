const jwt = require('../utils/jwt');
const User = require('../models/user.model');

const validateToken = async (req, res, next) => {

    const token = req.headers['x-token'];

    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Unathorized.'
        });
    }

    try {

        const { data: user } = jwt.verify(token);

        const userDB = await User.findById(user.uid);

        req.user = userDB;

        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not active.'
            });
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    

    
};

module.exports = { validateToken };