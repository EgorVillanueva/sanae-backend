const moment = require('moment');
const Appointment = require("../models");

const createAppointment = async (req,res) => {

    const patient = req.body.patient;
    const appointmentTime = req.body.appointmentTime;
    const date = moment(req.body.date).format('l');

    const appointment = new Appointment({
        patient,
        appointmentTime,
        date
    });
    await appointment.save();

    res.json(appointment);

}

module.exports = {
    createAppointment
}