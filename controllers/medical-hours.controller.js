const { MedicalHour } = require('../models');

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
        })
        .populate({
            path: 'hours.time',
            model: 'time'
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
        })
        .populate({
            path: 'hours.time',
            model: 'time'
        });

    res.json(medicalHour);


}

const createMedicalHour = async (req, res) => {

    const medicalHour = new MedicalHour(req.body);
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