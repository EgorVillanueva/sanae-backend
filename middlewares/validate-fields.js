const { validationResult } = require("express-validator");

// Valida campos: vacíos, si es correo, etc
const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validateFields
}