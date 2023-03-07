const { Schema, model } = require('mongoose');
const moment = require('moment');

const vitalSignSchema = Schema({
    clinic_history: {
        type: Schema.Types.ObjectId,
        ref: 'clinic-history',
        required: true,
    },
    pa: {
        type: Number
    },
    t: {
        type: Number
    },
    fr: {
        type: Number
    },
    fc: {
        type: Number
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: moment() //Date.now
    },
})

vitalSignSchema.methods.toJSON = function () {
    const { __v, ...vital_sign } = this.toObject();
    return vital_sign;
}

module.exports = model('vital-sign', vitalSignSchema);