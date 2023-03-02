const Person = require('./Person');
const Role = require('./Role');
const User = require('./User');
const Patient = require('./Patient');
const Doctor = require('./Doctor');
const Time = require('./time');
const MedicalHour = require('./medical-hour');
const Appointment = require('./appointment');

module.exports = {
    Appointment,
    Doctor,
    Patient,
    Person,
    Role,
    User,
    Time,
    MedicalHour
}