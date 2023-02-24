const { response } = require("express");

const { Person } = require('../models');

const createPerson = async (req, res) => {

    const first_surname = req.body.first_surname.toUpperCase();
    const second_surname = req.body.second_surname.toUpperCase();
    const names = req.body.names.toUpperCase();

    // Generar data a guardar
    const data = {
        first_surname,
        second_surname,
        names
    };

    const person = new Person(data);

    // Guardar DB
    await person.save();

    //

    res.status(201).json(person);

}

module.exports = {
    createPerson
}