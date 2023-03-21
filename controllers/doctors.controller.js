
const { Doctor } = require('../models');

const getDoctors = async (req, res) => {

    const doctors = await Doctor.find({ status: true })
        .populate('person', [
            'first_surname',
            'second_surname',
            'names',
            'birthdate',
            'gender',
            'document_type',
            'document_number',
            'file',
            'status'
        ]);

    res.status(200).json({
        doctors
    });

}

const watchDoctor = async (req, res) => {

    const { id } = req.params;

    const doctor = await Doctor.findOne({ _id: id, status: true })
        .populate('person', [
            'first_surname',
            'second_surname',
            'names',
            'birthdate',
            'gender',
            'document_type',
            'document_number',
            'file',
            'status'
        ]);

    res.json({ doctor });

}

module.exports = {
    getDoctors,
    watchDoctor,
}