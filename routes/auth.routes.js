
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares');

const { 
    login,
    google
 } = require('../controllers/auth.controller');

const router = Router();


router.post('/login',[
    check('email', 'Email invalid.').isEmail(),
    check('password', '"password" is required.').not().isEmpty(),
    validateFields
], login );

router.post('/google', [
    check('id_token', 'Google Token is required.').not().isEmpty(),
    validateFields
], google);


module.exports = router;