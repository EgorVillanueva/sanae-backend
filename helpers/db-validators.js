const { Role, User, Person } = require('../models');

// Rol válido
const itsValidRole = async (role = '') => {
    
    const existsRole = await Role.findById({ _id: role });
    
    if (!existsRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}

// Persona válida
const itsValidPerson = async (person = '') => {

    if (person) {
        const existsPerson = await Person.findById({ _id: person });
        
        if (!existsPerson) {
            throw new Error(`La persona ${person} no está registrado en la BD`);
        }
    }
    
}

// Verificar si existe persona para login
const existsPersonUser = async (person = '') => {
    if (person) {
        const data = await User.findOne({ person });
    
        if (data) {
            throw new Error(`Esta persona ya está registrada`);
        }

    }

}

// Verificar si existe usuario para login
const existsNameUser = async (name = '') => {

    const data = await User.findOne({ name });

    if (data) {
        throw new Error(`El usuario ${name} ya está registrado`);
    }

}

// Verifica si existe id de usuario
const userExistsById = async (id) => {

    const userExists = await User.findById({ _id: id });

    if (!userExists) {
        throw new Error(`El id no existe ${id}`);
    }

}

// Verificar si existe documento
const existsDocument = async (document = '') => {

    const data = await User.findOne({ document });

    if (data) {
        throw new Error(`El número de documento ${document} ya está registrado`);
    }

}

module.exports = {
    itsValidRole,
    itsValidPerson,
    existsDocument,
    userExistsById,
    existsPersonUser,
    existsNameUser
}