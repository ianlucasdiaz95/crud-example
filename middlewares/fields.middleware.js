const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        let response = errors.errors;

        return res.status(400).json({
            success: false,
            message: 'There was an error with the request.',
            errors: response
        });
    }

    next();
};

module.exports = { validateFields };