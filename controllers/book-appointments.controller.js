const moment = require('moment');
const { MedicalHour } = require("../models");

const getBookAppointment = async (req, res) => {

    const { id } = req.params;

    const bookAppointment = await MedicalHour.findById({ _id: id });
    
    let startTime = bookAppointment.start_Time;
    let endTime = bookAppointment.end_Time;
    let slotDuration = bookAppointment.duration;
    const slots = [];

    while (startTime < endTime) {
        slots.push(startTime);
        startTime.add(slotDuration);
    }
    console.log(slots);
    res.json(bookAppointment);

}

module.exports = {
    getBookAppointment,
}