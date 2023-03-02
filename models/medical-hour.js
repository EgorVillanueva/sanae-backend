const { Schema, model } = require('mongoose');

const medicalHourSchema = Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    hours: {
        time: {
            type: Schema.Types.ObjectId,
            ref: 'time',
            required: true
        }
    }
});

medicalHourSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('medical_hour', medicalHourSchema);