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
    // check('doctor', 'Ingrese un médico').not().isEmpty(),
    // check('patient', 'Ingrese un paciente').not().isEmpty(),
    // check('date', 'Ingrese la fecha de la cita').not().isEmpty(),
    // check('slot', 'Ingrese la hora de la cita').not().isEmpty(),
    // check('status', 'Seleccione el estado de la cita').not().isEmpty(),
    // check('payment_status', 'Seleccione el estado del pago').not().isEmpty(),
    // validateFields
], createClinicHistory);

// router.put('/:id', [
//     validateJWT,
//     hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
// ], updateAppointment);

module.exports = router;