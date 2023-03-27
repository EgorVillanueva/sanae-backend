const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            appointments: '/api/appointments',
            auth: '/api/auth',
            book_appointments: '/api/book-appointments',
            clinic_histories: '/api/clinical-histories',
            doctors: '/api/doctors',
            medical_hours: '/api/medical-hours',
            patients: '/api/patients',
            persons: '/api/persons',
            prescriptions: '/api/prescriptions',
            roles: '/api/roles',
            search: '/api/search',
            times: '/api/times',
            uploads: '/api/uploads',
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
        this.app.use('./uploads', express.static(path.resolve('uploads')));

        // FileUpload - Carga de archivos
        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/tmp/',
        //     createParentPath: true
        // }));

    }

    routes() {
        this.app.use(this.paths.appointments, require('../routes/appointments.routes'));
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.book_appointments, require('../routes/book-appointments.routes'));
        this.app.use(this.paths.clinic_histories, require('../routes/clinical-histories.routes'));
        this.app.use(this.paths.doctors, require('../routes/doctors.routes'));
        this.app.use(this.paths.medical_hours, require('../routes/medical-hours.routes'));
        this.app.use(this.paths.patients, require('../routes/patients.routes'));
        this.app.use(this.paths.persons, require('../routes/persons.routes'));
        this.app.use(this.paths.prescriptions, require('../routes/prescriptions.routes'));
        this.app.use(this.paths.roles, require('../routes/roles.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.times, require('../routes/times.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
        this.app.use(this.paths.users, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;