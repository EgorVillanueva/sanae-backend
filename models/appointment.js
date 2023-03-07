const { Schema, model } = require('mongoose');
const moment = require('moment')

const appointmentSchema = Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    date: {
        type: String,
        // default: moment().format('YYYY-MM-DD'),
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'PENDIENTE' // cancelado, confirmado, terminado
    },
    payment_status: {
        type: String,
        required: true,
        default: 'PENDIENTE' // pagado
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created_at: {
        type: Date,
        default: moment() //Date.now
    },
});

appointmentSchema.methods.toJSON = function () {
    const { __v, ...appointment } = this.toObject();
    return appointment;
}

module.exports = model('appointment', appointmentSchema);