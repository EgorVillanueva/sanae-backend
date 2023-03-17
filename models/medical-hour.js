const { Schema, model } = require('mongoose');

const medicalHourSchema = Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    start_time: {
        type: String,
        required: true,
    },
    end_time: {
        type: String,
        required: true,
    },
    days: [{
        type: String,
        required: true,
    }],
    duration: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: 1
    },




});

medicalHourSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('medical_hour', medicalHourSchema);