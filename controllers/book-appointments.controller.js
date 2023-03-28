const moment = require('moment');
// var moment = require('moment-timezone');
// moment().tz("America/Lima").format();
moment.locale('es-pe');
const { getSlots } = require("slot-calculator")
const { DateTime, Settings } = require("luxon");

const { MedicalHour } = require("../models");


const getBookAppointment = async (req, res) => {
    Settings.defaultZone = "UTC";
    const { id } = req.params;

    const bookAppointment = await MedicalHour.findById({ _id: id })
        .populate({
            path: 'doctor',
            populate: [
                {
                    path: 'person',
                    select: ['names', 'first_surname', 'second_surname']
                }
            ]
        })
    // console.log(bookAppointment.start_time);

    let startTime = bookAppointment.start_time;
    let endTime = bookAppointment.end_time;
    let slotDuration = bookAppointment.duration;

    const { allSlots } = getSlots({
        from: startTime,
        to: endTime,
        duration: slotDuration,
        timezone: "America/Lima",
    })

    const slots = allSlots.map(slot =>
        // slot.startTime + '-' + slot.endTime
        moment(slot.from).add(5, 'hours').format('LT') + ' - ' + moment(slot.to).add(5, 'hours').format('LT')
        // moment().hour(slot.from) + '/' + slot.to
        // moment(slot.from, ['DDMMMMY HH:mm:ss', 'MMMMDDY HH:mm:ss']).add(24, 'hours').format('HH:mm')
        // moment(slot.from).locale('es-pe').format('YYYY-MM-DD HH:mm:ss')
        // slot.from.toLocaleString('en-US')
    )

    const data = {
        bookAppointment,
        slots
    }

    res.json(data)
}

module.exports = {
    getBookAppointment,
}