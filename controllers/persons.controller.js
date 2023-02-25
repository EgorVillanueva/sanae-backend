const { response } = require("express");

const { Person, Patient } = require('../models');

const createPerson = async (req, res) => {

    // Creación de persona
    const { state, user, ...body } = req.body;

    // Generar data a guardar
    const data = {
        ...body,
        first_surname: body.first_surname.toUpperCase(),
        second_surname: body.second_surname.toUpperCase(),
        names: body.names.toUpperCase(),
        document_type: body.document_type.toUpperCase(),
        user: req.user._id
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

module.exports = {
    createPerson
}