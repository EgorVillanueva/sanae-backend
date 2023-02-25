const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateFields,
    validateJWT,
    hasRole,
    itsAdminRole } = require('../middlewares')

const {
    itsValidRole,
    existsNameUser,
    userExistsById,
    itsValidPerson,
    existsPersonUser
} = require('../helpers/db-validators');

const {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
} = require('../controllers/users.controller');

const router = Router();

router.get('/', validateJWT, usersGet);

router.post('/', [
    validateJWT,
    itsAdminRole,
    check('person', 'No es un ID válido').isMongoId(),
    check('person', 'Tiene que seleccionar una persona').not().isEmpty(),
    check('name', 'el nombre del usuario es obligatorio').not().isEmpty(),
    check('password', 'Ingrese un password').not().isEmpty(),
    check('name').custom(existsNameUser),
    check('person').custom(existsPersonUser),
    check('person').custom(itsValidPerson),
    check('role').custom(itsValidRole),
    validateFields
], usersPost);

router.put('/:id', [
    validateJWT,
    itsAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    // check('person', 'Tiene que seleccionar una persona').not().isEmpty(),
    // check('name', 'el nombre del usuario es obligatorio').not().isEmpty(),
    // check('password', 'Ingrese un password').not().isEmpty(),
    check('name').custom(existsNameUser),
    check('person').custom(existsPersonUser),
    check('person').custom(itsValidPerson),
    check('id').custom(userExistsById),
    check('role').custom(itsValidRole),
    validateFields
], usersPut);

router.patch('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], usersPatch);

router.delete('/:id', [
    validateJWT,
    itsAdminRole,
    // hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], usersDelete);

module.exports = router;