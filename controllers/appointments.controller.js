const moment = require('moment');
// moment.locale('es');
const {Appointment} = require("../models");

const createAppointment = async (req,res) => {
    
    const doctor = req.body.doctor;
    const patient = req.body.patient;
    const date = moment(req.body.date).format('DD-MM-YYYY');
    const slot = req.body.slot;
    const status = req.body.status.toUpperCase();
    const payment_status = req.body.payment_status.toUpperCase();
    const user = req.user._id
    
    const data = await Appointment.find({
        $and: [
            { doctor },
            { date },
            { slot }
        ]
    });
    console.log(data);
    // if (data) {
    //     return res.status(400).json({
    //         msg: `El horario de cita seleccionada ya existe`
    //     })
    // }

    // const appointment = new Appointment({
    //     doctor,
    //     patient,
    //     date,
    //     slot,
    //     status,
    //     payment_status,
    //     user
    // });
    // await appointment.save();

    // res.json(appointment);

}

module.exports = {
    createAppointment
}