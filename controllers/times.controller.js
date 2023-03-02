const { Time } = require('../models');
const moment = require('moment');

const listTimes = async (req, res) => {

    const list = await Time.find()
        .populate({
            path: 'doctor',
            populate: [
                {
                    path: 'person',
                    select: ['names', 'first_surname', 'second_surname']
                }
            ]
        })

    res.json({ list });

}

const createTime = async (req, res) => {

    // let startTime = moment(req.body.time[0], "hh:mm A").format('hh:mm A');
    // let endTime = moment(req.body.time[1], "hh:mm A").format('hh:mm A');
    // let times = [];

    // while(moment(startTime, 'hh:mm A').isBefore(moment(endTime, 'hh:mm A'))) {
    //     let st = moment(startTime, 'hh:mm A').format('hh:mm A')
    //     let et = moment(startTime, 'hh:mm A').add(30, 'minutes').format('hh:mm A');
    //     let obj = {
    //         start_time: st,
    //         end_time: et
    //     }

    //     times.push(obj)

    //     startTime = et;
    // }

    // const timeCreate = new Time({
    //     doctor: req.body.doctor,
    //     day: req.body.day,
    //     time: times
    // });

    // await timeCreate.save();

    // res.json(timeCreate);

    const doctor = req.body.doctor
    const day = req.body.day.toUpperCase();
    const time = req.body.time;

    const timeCreate = new Time({
        doctor, day, time
    });

    await timeCreate.save();

    res.json({
        timeCreate
    });

}

const updateTime = async (req, res) => {
    const { id } = req.params;

    const { ...times } = req.body;

    if (times.day) {
        times.day = times.day.toUpperCase();
    }

    const timeUpdate = await Time.findByIdAndUpdate(id, times, { new: true })

    res.json(timeUpdate);
}

module.exports = {
    createTime,
    listTimes,
    updateTime
}