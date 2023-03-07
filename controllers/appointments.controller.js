const moment = require('moment');
// moment.locale('es');
const { Appointment } = require("../models");

const getAppointment = async (req, res) => {
    const appointments = await Appointment.find()
        .populate({
            path: 'doctor',
            populate: [
                {
                    path: 'person',
                    select: ['names', 'first_surname', 'second_surname']
                }
            ]
        });

    res.json(appointments)
}

const createAppointment = async (req, res) => {

    const doctor = req.body.doctor;
    const patient = req.body.patient;
    const date = req.body.date;
    const slot = req.body.slot;
    const status = req.body.status.toUpperCase();
    const payment_status = req.body.payment_status.toUpperCase();
    const user = req.user._id

    // const db = await Appointment.find();

    // const data = await Appointment.find({
    //     $and: [{ slot: slot }, { doctor: doctor }, { date: date }]
    // })

    // const resp = db.includes(data)
    // console.log(resp);
    // if (db.includes(data)) {
    //     console.log('Existe');
    //     return res.status(400).json({
    //         msg: 'El horario de cita seleccionada ya existe'
    //     })
    // }

    // db.forEach(element => {
    //     console.log(element);
    // });

    // if (data) {
    //     return res.status(400).json({
    //         msg: 'El horario de cita seleccionada ya existe'
    //     })
    // }

    // data.forEach
    // console.log(data);
    // const exists = data.map((exist) => {
    //     if (exist.doctor === doctor && exist.date === date && exist.slot === slot) {
    //         return res.status(400).json({
    //             msg: 'El horario de cita seleccionada ya existe'
    //         })
    //     }
    // })

    // if (exists) {
    //     return res.status(400).json({
    //         msg: 'La cita ya existe'
    //     })
    // }
    // if (data) {
    //     return res.status(400).json({
    //         msg: `El horario de cita seleccionada ya existe`
    //     })
    // }

    const appointment = new Appointment({
        doctor,
        patient,
        date,
        slot,
        status,
        payment_status,
        user
    });
    await appointment.save();

    res.json(appointment);

}

const updateAppointment = async (req, res) => {

    const { id } = req.params;

    const doctor = req.body.doctor;
    const patient = req.body.patient;
    const date = req.body.date;
    const slot = req.body.slot;
    const status = req.body.status.toUpperCase();
    const payment_status = req.body.payment_status.toUpperCase();
    const user = req.user._id
    const created_at = moment();

    const data = {
        doctor,
        patient,
        date,
        slot,
        status,
        payment_status,
        user,
        created_at
    }

    const updateAppointment = await Appointment.findByIdAndUpdate(id, data, { new: true });

    res.json(updateAppointment);

}

module.exports = {
    createAppointment,
    getAppointment,
    updateAppointment
}