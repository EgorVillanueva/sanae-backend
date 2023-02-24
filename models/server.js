const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // this.usersPath = '/api/users';
        // this.personsPath = '/api/persons';
        // this.rolesPath = '/api/roles';
        // this.authPath = '/api/auth';

        this.paths = {
            auth: '/api/auth',
            patients: '/api/patients',
            persons: '/api/persons',
            roles: '/api/roles',
            search: '/api/search',
            users: '/api/users',
        };

        // Conectar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();

    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        // this.app.use(this.authPath, require('../routes/auth.routes'));
        // this.app.use(this.personsPath, require('../routes/persons.routes'));
        // this.app.use(this.rolesPath, require('../routes/roles.routes'));
        // this.app.use(this.usersPath, require('../routes/users.routes'));

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.patients, require('../routes/patients.routes'));
        this.app.use(this.paths.persons, require('../routes/persons.routes'));
        this.app.use(this.paths.roles, require('../routes/roles.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.users, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;