const { MedicalHour } = require('../models');
const moment = require('moment')

const listMedicalHour = async (req, res) => {

    const medicalHour = await MedicalHour.find()
        .populate({
            path: 'doctor',
            populate: [
                {
                    path: 'person',
                    select: ['names', 'first_surname', 'second_surname', 'birthdate']
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

    const { __var, ...body } = req.body;
    console.log(body.start_time);
    body.start_time = moment(body.start_time, 'HH:mm');
    console.log(body.start_time);
    body.end_time = moment(body.end_time, 'HH:mm');
    const medicalHour = new MedicalHour(body);
    
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