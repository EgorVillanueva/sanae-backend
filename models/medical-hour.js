const { Schema, model } = require('mongoose');
const moment = require('moment')

const medicalHourSchema = Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    start_time: {
        type: Date,
        default: moment().format('HH:mm'),
        required: true,
    },
    end_time: {
        type: Date,
        default: moment().format('HH:mm'),
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