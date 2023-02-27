const path = require('path');
const fs = require('fs');

const { Doctor, Person } = require('../models');

const getDoctors = async (req, res) => {

    const doctors = await Doctor.find()
        .populate('person', [
            'names',
            'first_surname',
            'second_surname',
            'document_type',
            'document_number'
        ]);

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
        ]);

    res.json({ doctor });


}

module.exports = {
    getDoctors,
    watchDoctor,
}