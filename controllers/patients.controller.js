const { Patient, Person } = require('../models');

// const createPatient = async (req, res) => {

//     const first_surname = req.body.first_surname.toUpperCase();
//     const second_surname = req.body.second_surname.toUpperCase();
//     const names = req.body.names.toUpperCase();

//     // Creación de persona

//     // Generar data a guardar
//     const data = {
//         first_surname,
//         second_surname,
//         names
//     };
//     console.log(data);
//     // const personDB = new Person(data);
//     const personDB = await Person.create(data);

//     // Guardar DB
//     // await personDB.save();

//     // Creación de paciente
//     const person = personDB._id;
//     const { medical_history_number } = req.body;

//     const dataPatient = {
//         medical_history_number,
//         person
//     }
//     // console.log(dataPatient);
//     const patient = await Patient.create(dataPatient);
//     // const patient = new Patient(dataPatient);
//     // await patient.save();

//     res.status(201).json(personDB, patient);

// }

const createPatient = async (req, res) => {

    let data = req.body
    let details = JSON.parse(data.details)
    console.log(details);

    let personDB = await Person.create(data);

    // Creación de paciente
    for (let item of details) {
        item.person = personDB._id;
        await Patient.create(item)
    }

    res.status(201).json(personDB);

}

module.exports = {
    createPatient
}