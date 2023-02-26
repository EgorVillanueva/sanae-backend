const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT, hasRole, validateFileUpload } = require('../middlewares');
const { existsDocument, existsEmail } = require('../helpers/db-validators');

const {
    createPerson,
    getPersons,
    watchPerson,
    updatePerson
} = require('../controllers/persons.controller');

const router = Router();

router.get('/', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
], getPersons);

router.get('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], watchPerson);

router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
    check('names', 'los nombres son obligatorios').not().isEmpty(),
    check('first_surname', 'El primer apellido es obligatorio').not().isEmpty(),
    check('second_surname', 'El segundo apellido es obligatorio').not().isEmpty(),
    check('document_number', 'El número de documento es obligatorio').not().isEmpty(),
    check('document_number').custom(existsDocument),
    check('email').custom(existsEmail),
    validateFields
], createPerson);

router.put('/:id', [
    validateJWT,
    validateFileUpload,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
    check('document_number').custom(existsDocument),
    check('email').custom(existsEmail),
    validateFields
], updatePerson);

module.exports = router;