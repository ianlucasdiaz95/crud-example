
const { Router } = require('express');
const { check } = require('express-validator');
const { validateToken, validateRole, validateFields } = require('../middlewares');
const { userExistsById, categoryExistsById } = require('../utils/db-validators');



const { 
    productsGet,
    productGet,
    productsPost,
    productsPut,
    productsDelete,
 } = require('../controllers/products.controller');

const router = Router();

router.get('/', productsGet );

router.get('/:id',[
    check('id', 'Invalid ID.').isMongoId(),
    validateFields
], productGet);

router.put('/:id',[
    check('id', 'Invalid ID.').isMongoId(),
    check('name', '"name" is required.').not().isEmpty(),
    check('price', '"price" is required.').not().isEmpty(),
    check('description', '"description" is required.').not().isEmpty(),
    check('category', '"category" is required.').not().isEmpty(),
    check('category', 'Category invalid ID.').isMongoId(),
    check('category').custom(categoryExistsById),
    validateFields,
    validateToken,
    validateRole('ADMIN_ROLE')
], productsPut );

router.post('/',[
    check('name', '"name" is required.').not().isEmpty(),
    check('price', '"price" is required.').not().isEmpty(),
    check('description', '"description" is required.').not().isEmpty(),
    check('category', '"category" is required.').not().isEmpty(),
    check('category', 'Category invalid ID.').isMongoId(),
    check('category').custom(categoryExistsById),
    validateFields,
    validateToken,
    validateRole('ADMIN_ROLE')
] ,productsPost );

router.delete('/:id',[
    check('id', 'Invalid ID.').isMongoId(),

    validateFields,
    validateToken,
    validateRole('ADMIN_ROLE')
], productsDelete );


module.exports = router;