const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT, hasRole } = require('../middlewares');

const {
    createTime,
    listTimes,
    updateTime
} = require('../controllers/times.controller');
const { existsDay } = require('../helpers');

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
    check('day', 'El campo día es obligatorio').not().isEmpty(),
    check('time', 'Ingrese las horas').toUpperCase().not().isEmpty(),
    check('day').toUpperCase().custom(existsDay),
    validateFields
], createTime)

router.put('/', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE'),
    check('day').toUpperCase().custom(existsDay),
    validateFields
], updateTime)

module.exports = router;