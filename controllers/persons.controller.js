const path = require('path');
const fs = require('fs');

const { uploadFile } = require("../helpers");
const { Person, Patient } = require('../models');

const getPersons = async (req, res) => {

    const pat = await Patient.find()
        .populate('person', [
            'names',
            'first_surname',
            'second_surname',
            'document_type',
            'document_number'
        ]);

    // const { limit = 1, since = 0 } = req.query;
    // const query = { state: true };

    // const [total, patients] = await Promise.all([
    //     Patient.countDocuments(query),
    //     Patient.find(query)
    //         .skip(Number(since))
    //         .limit(Number(limit))
    // ]);

    res.json({
        pat
    });

}

const watchPerson = async (req, res) => {

    const { id } = req.params;

    const person = await Person.findById({ _id: id })

    const patient = await Patient.findOne({ 'person': id });

    // Mostrar imagen
    // const { file } = await Person.findById({ _id: id });

    // if (file) {
    //     const pathImage = path.join(__dirname, '../uploads', 'imgs', file);

    //     if (fs.existsSync(pathImage)) {
    //         return res.sendFile(pathImage);
    //     }
    // }
    res.json({ person, patient });


}

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

    // Generar data a guardar
    const data = {
        ...body,
        first_surname: body.first_surname.toUpperCase(),
        second_surname: body.second_surname.toUpperCase(),
        names: body.names.toUpperCase(),
        document_type: body.document_type.toUpperCase(),
        file: image,
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
    const { _id } = await Patient.findOne({ 'person': id })

    const patientUpdate = await Patient.findByIdAndUpdate(_id, body, { new: true });

    res.json({ personUpdate, patientUpdate });


}

module.exports = {
    createPerson,
    getPersons,
    updatePerson,
    watchPerson,
}