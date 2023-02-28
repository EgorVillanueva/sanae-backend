const { Schema, model } = require('mongoose');

const AppointmentSchema = Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    }
});

AppointmentSchema.methods.toJSON = function () {
    const { __v, ...apointment } = this.toObject();
    return apointment;
}

module.exports = model('apointment', AppointmentSchema);