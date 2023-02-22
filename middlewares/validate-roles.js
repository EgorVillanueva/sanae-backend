const { request, response } = require("express");
const { Role } = require("../models");


const itsAdminRole = async (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const users = req.user;
    
    const { role } = await Role.findById({ _id: users.role });
    
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ users.name }, no es administrador - No puede hacer esto`
        });
    }

    next();

}

const hasRole = ( ... roles ) => {

    return async (req, res, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        const users = req.user;
    
        const { role } = await Role.findById({ _id: users.role });

        if ( !roles.includes(role) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            })
        }
        
        next();
    }

}

module.exports = {
    itsAdminRole, hasRole
}