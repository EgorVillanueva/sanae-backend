const path = require('path');
const fs = require('fs');

const { uploadFile } = require("../helpers");
const { Person, Patient, Doctor } = require('../models');


const createPerson = async (req, res) => {
    // Subir imagen
    // let image;

    // try {

    //     // Archivos a subir
    //     image = await uploadFile(req.files, undefined, 'imgs');
    //     // const name = await uploadFile(req.files, ['txt', 'md'], 'documents');

    // } catch (msg) {
    //     res.status(400).json({ msg });
    // }

    // Creación de persona
    const { state, user, ...body } = req.body;

    let specialty;
    if (body.specialty) {
        specialty = body.specialty.toUpperCase()
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
    const person = await Person.findById(id);

    if (!person) {
        const error = new Error('No encontrado');
        return res.status(400).json({ msg: error.message });
    }

    if (req.body.first_surname) {
        person.first_surname = req.body.first_surname.toUpperCase() || person.first_surname;
    }

    if (req.body.second_surname) {
        person.second_surname = req.body.second_surname.toUpperCase() || person.second_surname;
    }

    if (req.body.names) {
        person.names = req.body.names.toUpperCase() || person.names;
    }
    person.birthdate = req.body.birthdate || person.birthdate;
    person.gender = req.body.gender || person.gender;

    if (req.body.document_type) {
        person.document_type = req.body.document_type.toUpperCase() || person.document_type;
    }
    person.document_number = req.body.document_number || person.document_number;
    person.department = req.body.department || person.department;
    person.province = req.body.province || person.province;
    person.district = req.body.district || person.district;

    if (req.body.address) {
        person.address = req.body.address.toUpperCase() || person.address;
    }

    person.phone = req.body.phone || person.phone;
    person.email = req.body.email || person.email;
    person.type_of_person = req.body.type_of_person || person.type_of_person;



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

    } catch (error) {
        console.log(error);
    }


    person.file = image || person.file;

    person.user = req.user._id

    let personUpdate;

    try {
        personUpdate = await person.save();
        res.json(personUpdate)
    } catch (error) {
        console.log(error);
    }

    // const personUpdate = await Person.findByIdAndUpdate(id, body, { new: true });

    // Actualizar paciente
    let patientUpdate;
    const { type_of_person } = await Person.findOne({ '_id': id })

    if (type_of_person === 'PATIENT') {
        const { _id } = await Patient.findOne({ 'person': id });

        const medical_history_number = req.body.medical_history_number;
        const form_of_income = req.body.form_of_income;
        const patientUpdateDB = {
            medical_history_number,
            form_of_income
        }

        patientUpdate = await Patient.findByIdAndUpdate(_id, patientUpdateDB, { new: true });
    }

    // Actualizar medico
    // if (type_of_person === 'DOCTOR') {
    //     const { _id, specialty, cmp } = await Doctor.findOne({ 'person': id });
    //     specialty = specialty || req.body.specialty;
    //     cmp = cmp || req.body.cmp;
    //     doctorUpdate = await Doctor.findByIdAndUpdate(_id, [req.body.medical_history_number, cmp], { new: true });
    // }

    // res.json(personUpdate);

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