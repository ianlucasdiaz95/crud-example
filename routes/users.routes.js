
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validateToken, validateRole } = require('../middlewares');
const { validRole, emailExists, userExistsById } = require('../utils/db-validators');


const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users.controller');

const router = Router();


router.get('/', usersGet );

router.put('/:id',[
    check('id', 'Invalid ID.').isMongoId(),
    check('id').custom( userExistsById ),
    validateFields,
    validateToken,
    validateRole('ADMIN_ROLE')
], usersPut );

router.post('/', [
    check('name', '"name" is required.').not().isEmpty(),
    check('email', 'Invalid email.').isEmail(),
    check('email').custom( emailExists ),
    check('password', '"password" is required.').not().isEmpty(),
    check('password', '"password" must be longer than 6 characters.').isLength( { min: 6 } ),
    check('role', '"role" is required.').not().isEmpty(),
    check('role').custom( validRole ),
    validateFields,
    validateToken,
    validateRole('ADMIN_ROLE')
], usersPost );

router.delete('/:id', [
    check('id', 'Invalid ID.').isMongoId(),
    check('id').custom(userExistsById),
    validateFields,
    validateToken,
    validateRole('ADMIN_ROLE')
], usersDelete );

router.patch('/', usersPatch );


module.exports = router;