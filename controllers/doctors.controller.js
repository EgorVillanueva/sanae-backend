
const { Doctor } = require('../models');

const getDoctors = async (req, res) => {

    const doctors = await Doctor.find()
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
        ], { status: true });

    res.json({
        doctors
    });

}

const watchDoctor = async (req, res) => {

    const { id } = req.params;

    const doctor = await Doctor.findById({ _id: id })
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
        ], { status: true });

    res.json({ doctor });

}

module.exports = {
    getDoctors,
    watchDoctor,
}