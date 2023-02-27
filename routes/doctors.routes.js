const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT, hasRole } = require('../middlewares');

const {
    getDoctors,
    watchDoctor
} = require('../controllers/doctors.controller');

const router = Router();

router.get('/', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
], getDoctors);

router.get('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], watchDoctor);

module.exports = router;