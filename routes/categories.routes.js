
const { Router } = require('express');
const { check } = require('express-validator');
const { validateToken, validateRole, validateFields } = require('../middlewares');
const { userExistsById } = require('../utils/db-validators');

const { 
    categoriesGet,
    categoriesPost,
    categoriesPut,
    categoriesDelete,
    categoryGet,
 } = require('../controllers/categories.controller');

const router = Router();

router.get('/', categoriesGet );

router.get('/:id',[
    check('id', 'Invalid ID.').isMongoId(),
    validateFields
], categoryGet);

router.put('/:id',[
    check('id', 'Invalid ID.').isMongoId(),
    check('name', '"name" is required.').not().isEmpty(),
    validateToken,
    validateRole('ADMIN_ROLE')
], categoriesPut );

router.post('/',[
    check('name', '"name" is required.').not().isEmpty(),
    validateFields,
    validateToken,
    validateRole('ADMIN_ROLE')
], categoriesPost );

router.delete('/:id',[
    check('id', 'Invalid ID.').isMongoId(),
    validateFields,
    validateToken,
    validateRole('ADMIN_ROLE')
], categoriesDelete );


module.exports = router;