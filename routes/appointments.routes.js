const { Router } = require('express');
const { check } = require('express-validator');

const { createAppointment } = require('../controllers/appointments.controller');
const { validateJWT, hasRole, validateFields } = require('../middlewares');

const router = Router();

router.post('/', validateJWT, [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
    check('doctor', 'Ingrese un médico').not().isEmpty(),
    check('patient', 'Ingrese un paciente').not().isEmpty(),
    check('date', 'Ingrese la fecha de la cita').not().isEmpty(),
    check('slot', 'Ingrese la hora de la cita').not().isEmpty(),
    check('status', 'Seleccione el estado de la cita').not().isEmpty(),
    check('payment_status', 'Seleccione el estado del pago').not().isEmpty(),
    validateFields
], createAppointment);

module.exports = router;