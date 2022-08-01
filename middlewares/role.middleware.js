const jwt = require('../utils/jwt');
const User = require('../models/user.model');

const validateRole = ( ...expectedRoles ) => {

    return async (req, res, next) => {
        const token = req.headers['x-token'];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unathorized.'
            });
        }

        try {

            const { data: user } = jwt.verify(token);

            const { role } = await User.findById(user.uid);

            if (!expectedRoles.includes(role)) {
                return res.status(401).json({
                    success: false,
                    message: 'User is not authorized.'
                });
            }

            next();

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

};

module.exports = { validateRole };