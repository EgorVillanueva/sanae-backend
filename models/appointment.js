const { Schema, model } = require('mongoose');

const appointmentSchema = Schema({
    medical_hour: {
        type: Schema.Types.ObjectId,
        ref: 'medical_hour',
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
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