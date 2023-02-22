const { Role } = require('../models');

const listRole = async (req, res) => {
    const users = await Role.find();

    res.json({
        users
    });
}

module.exports = {
    listRole,
}