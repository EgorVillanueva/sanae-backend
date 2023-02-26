const validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('../middlewares/validate-fields');
const validateRoles = require('../middlewares/validate-roles');
const validateFileUpload = require('../middlewares/validate-file');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFileUpload
};