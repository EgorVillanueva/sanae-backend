const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const {
    createPatient
} = require('../controllers/patients.controller');

const router = Router();

router.post('/', [
    check('medical_history_number', 'Es obligatorio el número de historia clínica').not().isEmpty(),
    check('names', 'los nombres son obligatorios').not().isEmpty(),
    check('first_surname', 'El primer apellido es obligatorio').not().isEmpty(),
    check('second_surname', 'El segundo apellido es obligatorio').not().isEmpty(),
    validateFields
], createPatient);

module.exports = router;