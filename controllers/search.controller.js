const { response } = require("express");
const { User } = require("../models");
const { ObjectId } = require('mongoose').Types;

// Colecciones permitidas
const allowedCollections = [
    'patients',
    'people',
    'roles',
    'users'
];

const searchUsers = async (term = '', res = response) => {

    const itsMongoID = ObjectId.isValid(term); // TRUE

    if (itsMongoID) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

}


const search = (req, res = response) => {

    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${allowedCollections}`
        })
    }

    switch (collection) {
        case 'patients':

            break;
        case 'people':
            break;
        case 'users':
            searchUsers(term, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvidó hacer esta búsqueda'
            })
    }

}

module.exports = {
    search
}