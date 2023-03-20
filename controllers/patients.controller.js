const path = require('path');
const fs = require('fs');

const { Patient, Person } = require('../models');

const getPatients = async (req, res) => {

    const patients = await Patient.find({status: true})
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

        res.status(200).json(patients);

    // let arr_data = [];

    // const persons = await Person.find({ type_of_person: 'PATIENT', status: true }).sort({ created_at: -1 });
    // console.log(persons);

    // for (let item of persons) {
        
    //     let patients = await Patient.find({ person: item._id });
    //     console.log(patients);
    //     // arr_data ={
    //     //     ...item,
    //     //     ...patients
    //     // }
       
    //     // if (item.status) {
    //         // arr_data.patient = patients;
    //         // arr_data.person = item;
    //         arr_data.push({
    //             person: item,
    //             patient: patients
    //         })
    //     // }
    // }

    // const { limit = 1, since = 0 } = req.query;
    // const query = { state: true };

    // const [total, patients] = await Promise.all([
    //     Patient.countDocuments(query),
    //     Patient.find(query)
    //         .skip(Number(since))
    //         .limit(Number(limit))
    // ]);

    // res.status(200).json(arr_data);

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
            'status'
        ], { status: true });

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