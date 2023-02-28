const { Schema, model } = require('mongoose');

const MedicalHourSchema = Schema({
    shift: {
        type: String,
        required: true,
        unique: true
    },
    time: [{
        start_time: {
            type: String,
            required: true,
            unique: true
        },
        end_time: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: Boolean,
            default: 1
        }
    }],
});

MedicalHourSchema.methods.toJSON = function () {
    const { __v, ...medicalHour } = this.toObject();
    return medicalHour;
}

module.exports = model('medical_hour', MedicalHourSchema);