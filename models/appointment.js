const { Schema, model } = require('mongoose');

const appointmentSchema = Schema({
    appointment_time: {
        time: {
            type: Schema.Types.ObjectId,
            ref: 'time',
            required: true,
        },
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
});

appointmentSchema.methods.toJSON = function () {
    const { __v, ...apointment } = this.toObject();
    return apointment;
}

module.exports = model('apointment', appointmentSchema);