const { Time } = require('../models');

const listTimes = async (req, res) => {

    const list = await Time.find();

    res.json({ list });

}

const createTime = async (req, res) => {

    const day = req.body.day.toUpperCase();
    const time = req.body.time;

    const timeCreate = new Time({
        day, time
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