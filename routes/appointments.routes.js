const { Router } = require('express');

const { createAppointment } = require('../controllers/appointments.controller');
const { validateJWT } = require('../middlewares');

const router = Router();

router.post('/', validateJWT, createAppointment);

module.exports = router;