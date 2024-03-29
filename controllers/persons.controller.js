const path = require('path');
const fs = require('fs-extra');

const { Person, Patient, Doctor } = require('../models');

const showImage = async (req, res) => {
    const { id } = req.params;

    const image = await Person.findById(id);
    console.log(image.file);
    res.contentType('image/jpg');
    res.send(image.file)
    // console.log(image);

    // await Person.findOne({ _id: id }, (err, result) => {
    //     if (err) return console.log(err);

    //     console.log(result);
    // })

    // res.json({
    //     id
    // })
}

const createPerson = async (req, res) => {

    // Creación de persona
    const { status, user, ...body } = req.body;

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
        type_of_person: body.type_of_person.toUpperCase(),
        gender: body.gender.toUpperCase(),
        specialty: specialty,

        // file: req.file.path,
        user: req.user._id
    };

    const personDB = new Person(data);

    // Guardar DB
    await personDB.save();

    // Creación de paciente
    let patient;

    if (personDB.type_of_person === 'PATIENT') {

        const person = personDB._id;

        const {
            medical_history_number,
            relative_phone,
        } = req.body;

        const dataPatient = {
            medical_history_number,
            relative_phone,
            person
        }
        if (req.body.relation) {
            const relation = req.body.relation.toUpperCase();
            dataPatient.relation = relation;
        }
        if (req.body.relative_name) {
            const relative_name = req.body.relative_name.toUpperCase();
            dataPatient.relative_name = relative_name;
        }

        patient = new Patient(dataPatient);
        await patient.save();

    }

    // Creación de médicos
    let doctor;

    if (personDB.type_of_person === 'DOCTOR') {

        const person = personDB._id;
        const { specialty, cmp } = req.body;

        const dataDoctor = {
            cmp,
            person,
            specialty
        }

        doctor = new Doctor(dataDoctor);
        await doctor.save();

    }

    res.status(200).json({ personDB, patient, doctor });

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
    if (req.body.document_type) {
        person.document_type = req.body.document_type.toUpperCase() || person.document_type;
    }
    if (req.body.address) {
        person.address = req.body.address.toUpperCase() || person.address;
    }

    if (req.body.gender) {
        person.gender = req.body.gender.toUpperCase() || person.gender;
    }

    person.birthdate = req.body.birthdate || person.birthdate;
    person.document_number = req.body.document_number || person.document_number;
    person.department = req.body.department || person.department;
    person.province = req.body.province || person.province;
    person.district = req.body.district || person.district;
    person.phone = req.body.phone || person.phone;
    person.email = req.body.email || person.email;
    person.type_of_person = req.body.type_of_person || person.type_of_person;

    // if (req.file.path) {
    //     person.file = req.file.path;
    // }
    person.user = req.user._id

    // const photo = await Person.findOne({ _id: id });
    // console.log(photo);
    // if (photo || photo === undefined) {
    //     await fs.unlink(path.resolve(photo.file));
    // } else {
    //     person.file = req.file.path;
    // }

    let personUpdate;
    try {
        personUpdate = await person.save();
    } catch (error) {
        console.log(error);
    }

    // Actualizar paciente
    let patientUpdate;
    const { type_of_person } = await Person.findOne({ '_id': id })

    if (type_of_person === 'PATIENT') {
        const patient = await Patient.findOne({ 'person': id });

        patient.medical_history_number = req.body.medical_history_number || patient.medical_history_number;
        patient.relative_phone = req.body.relative_phone || patient.relative_phone;

        if (req.body.relation) {
            patient.relation = req.body.relation.toUpperCase() || patient.relation;
        }
        if (req.body.relative_name) {
            patient.relative_name = req.body.relative_name.toUpperCase() || patient.relative_name;
        }

        try {
            patientUpdate = await patient.save();
        } catch (error) {
            console.log(error);
        }
    }

    // Actualizar medico
    let doctorUpdate;
    if (type_of_person === 'DOCTOR') {
        const doctor = await Doctor.findOne({ 'person': id });
        console.log(doctor);
        if (req.body.specialty) {
            doctor.specialty = doctor.specialty || req.body.specialty.toUpperCase();
        }
        doctor.cmp = req.body.cmp || doctor.cmp;

        try {
            doctorUpdate = await doctor.save();
        } catch (error) {
            console.log(error);
        }
    }

    res.json({ personUpdate, patientUpdate, doctorUpdate });

}

const deletePerson = async (req, res) => {
    const { id } = req.params;
    const personDeleted = {}
    const person = await Person.findByIdAndUpdate(id, { status: false }, { new: true });
    personDeleted.person = person;

    if (person.type_of_person === 'PATIENT') {
        const { _id } = await Patient.findOne({ 'person': person._id })
        const patient = await Patient.findByIdAndUpdate(_id, { status: false }, { new: true })
        personDeleted.patient = patient
    }

    if (person.type_of_person === 'DOCTOR') {
        const { _id } = await Doctor.findOne({ 'person': person._id })
        const doctor = await Doctor.findByIdAndUpdate(_id, { status: false }, { new: true })
        personDeleted.doctor = doctor
    }

    res.status(200).json(personDeleted)
}

module.exports = {
    createPerson,
    deletePerson,
    updatePerson,
    showImage,
}