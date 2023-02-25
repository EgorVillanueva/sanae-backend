const { Patient, Person } = require('../models');

const createPatient = async (req, res) => {

    const first_surname = req.body.first_surname.toUpperCase();
    const second_surname = req.body.second_surname.toUpperCase();
    const names = req.body.names.toUpperCase();

    // Creación de persona

    // Generar data a guardar
    const data = {
        first_surname,
        second_surname,
        names
    };

    const personDB = new Person(data);
    // const personDB = await Person.create(data);

    // Guardar DB
    await personDB.save();

    // Creación de paciente
    const person = personDB._id;
    const { medical_history_number } = req.body;

    const dataPatient = {
        medical_history_number,
        person
    }

    const patient = new Patient(dataPatient);
    await patient.save();

    res.status(201).json({ personDB, patient });

}

// const createPatient = async (req, res) => {
// const { medical_history_number } = req.body
// const patient = new Patient({ medical_history_number })
// await patient.save();

// let data = req.body
// let personDB = await new Person();
// personDB.names = data.names;
// personDB.first_surname = data.first_surname;
// personDB.second_surname = data.second_surname;

// personDB.save((err, person_save) => {
//     console.log(person_save);
//     if (person_save) {
//         const details = data.detalles;

//         details.forEach((element, index) => {
//             console.log(element);
//             const patient =  new Patient();
//             patient.medical_history_number = element.medical_history_number
//             patient.person = person_save._id;
//             patient.save((err, patient) => {
//                 if (patient) {
//                     res.status(201).json({
//                         patient
//                     })
//                 } else {
//                     res.send(err);
//                 }
//             });
//         });

//     } else {
//         res.send(err);
//     }

// })


// Creación de paciente
// for (let item of details) {
//     item.person = personDB._id;
//     await Patient.create(item)
// }

//     res.status(201).json(patient);

// }

module.exports = {
    createPatient
}
