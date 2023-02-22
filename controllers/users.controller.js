const { response } = require("express");
const bcryptjs = require('bcryptjs');

const { User } = require('../models');

const usersGet = async (req, res = response) => {

    const { limit = 1, since = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number(since) )
            .limit( Number(limit) )
    ]);

    res.json({
        total, users
    });

}

const usersPost = async (req, res = response) => {

    const {
        person,
        name,
        password,
        role
    } = req.body;

    const user = new User({
        person,
        name,
        password,
        role
    });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({
        user
    });

}

const usersPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, ...resto } = req.body;

    // Validar contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto, { new: true });

    res.json(user);
}

const usersPatch = async (req, res = response) => {

    const { id } = req.params;
    const user = await User.findById({ _id: id })
                    .populate('person', ['names', 'first_surname', 'second_surname'])
                    .populate('role', ['role']);
                    

    res.json({
        user
    });
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;
    
    const user = await User.findByIdAndUpdate( id, { state: false }, { new: true } );

    res.json(user);
}

const usersActivate = async (req, res = response) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { state: true }, { new: true } );

    res.json({
        user
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
    usersActivate
}