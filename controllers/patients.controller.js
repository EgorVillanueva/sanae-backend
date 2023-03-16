const path = require('path');
const fs = require('fs');

const { Patient, Person } = require('../models');

const getPatients = async (req, res) => {

    const patients = await Patient.find()
        .populate('person', [
            'names',
            'first_surname',
            'second_surname',
            'document_type',
            'document_number',
            'state',
        ], {state: true});

    // const { limit = 1, since = 0 } = req.query;
    // const query = { state: true };

    // const [total, patients] = await Promise.all([
    //     Patient.countDocuments(query),
    //     Patient.find(query)
    //         .skip(Number(since))
    //         .limit(Number(limit))
    // ]);

    res.json({
        patients
    });

}

const watchPatient = async (req, res) => {

    const { id } = req.params;

    const patient = await Patient.findById({ _id: id })
        .populate('person', [
            'first_surname',
            'second_surname',
            'names',
            'birthdate',
            'gender',
            'document_type',
            'document_number',
            'file',
            'state'
        ], { state: true});

    // const patient = await Patient.findOne({ 'person': id });

    // Mostrar imagen
    // const person = patient.person;
    // const { file } = await Person.findById({ _id: person });

    // if (file) {
    //     const pathImage = path.join(__dirname, '../uploads', 'imgs', file);

    //     if (fs.existsSync(pathImage)) {
    //         return res.sendFile(pathImage);
    //     }
    // }

    res.json({ patient });


}

module.exports = {
    getPatients,
    watchPatient,
}