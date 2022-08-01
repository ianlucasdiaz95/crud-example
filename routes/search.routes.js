
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares');

const { 
    search
 } = require('../controllers/search.controller');

const router = Router();


router.get('/:collection/:query',[
    
], search );


module.exports = router;