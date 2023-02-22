const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { itsValidRole, existsNameUser, userExistsById } = require('../helpers/db-validators');

const {
    listRole,
} = require('../controllers/roles.controller');

const router = Router();

router.get('/', listRole);

module.exports = router;