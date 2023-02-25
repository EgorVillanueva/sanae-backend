const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT, hasRole } = require('../middlewares');
const { existsDocument, existsEmail } = require('../helpers/db-validators');

const {
    createPerson,
} = require('../controllers/persons.controller');

const router = Router();

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

module.exports = router;