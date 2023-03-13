const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {

    const { name, password } = req.body;

    try {

        // Verificar si el usuario existe
        const user = await User.findOne({ name })
            .populate('person', ['first_surname', 'second_surname', 'names'])
            .populate('role', ['role'])

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - usuario'
            })
        }

        // Si el usuario está activo
        if (!user.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Comuníquese con el administrador'
        });
    }


}

module.exports = {
    login
}