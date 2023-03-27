const { Router } = require('express');
const { check } = require('express-validator');

const { getBookAppointment } = require('../controllers/book-appointments.controller');
const { validateJWT, hasRole, validateFields } = require('../middlewares');

const router = Router();

router.get('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], getBookAppointment);

module.exports = router;