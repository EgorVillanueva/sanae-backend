const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const {
    createPatient
} = require('../controllers/patients.controller');

const router = Router();

router.post('/', createPatient);

module.exports = router;