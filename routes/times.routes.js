const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT, hasRole } = require('../middlewares');

const {
    createTime,
    listTimes
} = require('../controllers/times.controller');
const { existsShift } = require('../helpers');

const router = Router();

router.get('/', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
], listTimes);

// router.get('/:id', [
//     validateJWT,
//     hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
//     check('id', 'No es un ID válido').isMongoId(),
//     validateFields
// ], watchDoctor);

router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
    check('shift', 'El campo turno es obligatorio').not().isEmpty(),
    check('time', 'Ingrese las horas').toUpperCase().not().isEmpty(),
    check('shift').toUpperCase().custom(existsShift),
    validateFields
], createTime)

module.exports = router;