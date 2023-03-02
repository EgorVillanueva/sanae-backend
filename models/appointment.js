const { Schema, model } = require('mongoose');

const appointmentSchema = Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
        unique: true
    },
    patient: {
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

appointmentSchema.methods.toJSON = function () {
    const { __v, ...apointment } = this.toObject();
    return apointment;
}

module.exports = model('apointment', appointmentSchema);