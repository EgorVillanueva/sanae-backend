const { Router } = require('express');
const { check } = require('express-validator');

const { createPrescription } = require('../controllers/prescriptions.controller');
const { validateJWT, hasRole, validateFields } = require('../middlewares');

const router = Router();

router.post('/', [
    validateJWT,
    hasRole('DOCTOR_ROLE'),
    check('prescription_details', 'Ingrese prescripción').not().isEmpty(),
], createPrescription);

module.exports = router;