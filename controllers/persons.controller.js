const path = require('path');
const fs = require('fs');

const { uploadFile } = require("../helpers");
const { Person, Patient, Doctor } = require('../models');

const createPerson = async (req, res) => {
    // Subir imagen
    let image;

    try {

        // Archivos a subir
        image = await uploadFile(req.files, undefined, 'imgs');
        // const name = await uploadFile(req.files, ['txt', 'md'], 'documents');

    } catch (msg) {
        res.status(400).json({ msg });
    }

    // Creación de persona
    const { state, user, ...body } = req.body;

    let specialty;
    if (body.specialty) {
        specialty= body.specialty.toUpperCase()
    }

    // Generar data a guardar
    const data = {
        ...body,
        first_surname: body.first_surname.toUpperCase(),
        second_surname: body.second_surname.toUpperCase(),
        names: body.names.toUpperCase(),
        document_type: body.document_type.toUpperCase(),
        file: image,
        type_of_person: body.type_of_person.toUpperCase(),
        specialty: specialty,
        user: req.user._id
    };

    const personDB = new Person(data);

    // Guardar DB
    await personDB.save();

    // Creación de paciente
    let patient;

    if (personDB.type_of_person === 'PATIENT') {
        
        const person = personDB._id;
        const { medical_history_number } = req.body;
    
        const dataPatient = {
            medical_history_number,
            person
        }
    
        patient = new Patient(dataPatient);
        await patient.save();

    }

    // Creación de médicos
    let doctor;

    if (personDB.type_of_person === 'DOCTOR') {
        
        const person = personDB._id;
        const { cmp } = req.body;
    
        const dataDoctor = {
            cmp,
            person
        }
    
        doctor = new Doctor(dataDoctor);
        await doctor.save();

    }
    
    res.status(201).json({ personDB, patient, doctor });

}

const updatePerson = async (req, res) => {

    const { id } = req.params;
    const { state, user, ...body } = req.body;

    if (body.first_surname) {
        body.first_surname = body.first_surname.toUpperCase();
    }

    if (body.second_surname) {
        body.second_surname = body.second_surname.toUpperCase();
    }

    if (body.names) {
        body.names = body.names.toUpperCase();
    }

    if (body.document_type) {
        body.document_type = body.document_type.toUpperCase();
    }

    if (body.type_of_person) {
        body.type_of_person = body.type_of_person.toUpperCase();
    }

    if (body.specialty) {
        body.specialty = body.specialty.toUpperCase();
    }

    let image;

    try {

        // Limpiar imágenes previas
        const { file } = await Person.findById({ _id: id });

        if (file) {
            const pathImage = path.join(__dirname, '../uploads', 'imgs', file);

            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }

        // Archivos a subir
        image = await uploadFile(req.files, undefined, 'imgs');

    } catch (msg) {
        res.status(400).json({ msg });
    }

    body.file = image;
    body.user = req.user._id

    const personUpdate = await Person.findByIdAndUpdate(id, body, { new: true });

    // Actualizar paciente
    let patientUpdate;
    const { type_of_person } = await Person.findOne({ '_id': id })

    if (type_of_person === 'PATIENT') {
        const { _id } = await Patient.findOne({ 'person': id })
        patientUpdate = await Patient.findByIdAndUpdate(_id, body, { new: true });
    }

    res.json({ personUpdate, patientUpdate });

}

const deletePerson = async (req, res) => {
    const { id } = req.params;

    const person = await Person.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json(person);
}

module.exports = {
    createPerson,
    deletePerson,
    updatePerson,
}