const { Time } = require('../models');

const listTimes = async (req, res) => {

    const list = await Time.find();

    res.json({list});

}

const createTime = async (req, res) => {

    const shift = req.body.shift.toUpperCase();
    const time = req.body.time;

    const timeCreate = new Time({
        shift, time
    });

    await timeCreate.save();

    res.json({
        timeCreate
    });

}

module.exports = {
    createTime,
    listTimes
}