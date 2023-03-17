const { MedicalHour } = require('../models');
const moment = require('moment')

const listMedicalHour = async (req, res) => {

    const medicalHour = await MedicalHour.find()
        .populate({
            path: 'doctor',
            populate: [
                {
                    path: 'person',
                    select: ['names', 'first_surname', 'second_surname']
                }
            ]
        });

    res.json(medicalHour);

}

const watchMedicalHour = async (req, res) => {

    const { id } = req.params;
    const medicalHour = await MedicalHour.findById({ _id: id })
        .populate({
            path: 'doctor',
            populate: [
                {
                    path: 'person',
                    select: ['names', 'first_surname', 'second_surname']
                }
            ]
        });

    res.json(medicalHour);


}

const createMedicalHour = async (req, res) => {

    const { start_time, end_time, days } = req.body;
    const startTime = moment(start_time).format('HH:mm');
    const endTime = moment(end_time).format('HH:mm');
    const data = {
        start_time: startTime,
        end_time: endTime,
        days
    }
    const medicalHour = new MedicalHour(data);

    await medicalHour.save();

    res.json(medicalHour);

}

const updateMedicalHour = async (req, res) => {

    const { id } = req.params;

    const medicalHour = await MedicalHour.findByIdAndUpdate(id, req.body, { new: true });

    res.json(medicalHour);

}

module.exports = {
    createMedicalHour,
    listMedicalHour,
    updateMedicalHour,
    watchMedicalHour
}