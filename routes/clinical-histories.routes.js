const { Router } = require('express');
const { check } = require('express-validator');

const { createClinicHistory } = require('../controllers/clinical_histories.controller');
const { validateJWT, hasRole, validateFields } = require('../middlewares');

const router = Router();

// router.get('/', [
//     validateJWT,
//     hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
// ], getAppointment)

router.post('/', [
    validateJWT,
    hasRole('DOCTOR_ROLE'),
    // check('patient', 'Ingrese un paciente').not().isEmpty(),
    // validateFields
], createClinicHistory);

// router.put('/:id', [
//     validateJWT,
//     hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
// ], updateAppointment);

module.exports = router;