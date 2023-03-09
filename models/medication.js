const { Schema, model } = require('mongoose');
const moment = require('moment');

const medicationSchema = Schema({
    clinic_history: {
        type: Schema.Types.ObjectId,
        ref: 'clinic-history',
        required: true,
    },
    cf: {
        type: Number
    },
    pf: {
        type: Number
    },
    cb: {
        type: Number
    },
    mt: {
        type: Number
    },
    lta: {
        type: Number
    },
    elect: {
        type: Number
    },
    chc: {
        type: Number
    },
    us: {
        type: Number
    },
    ht: {
        type: Number
    },
    oc: {
        type: Number
    },
    description_medication: {
        type: String
    },
    sessions: {
        type: Number
    },
    created_at: {
        type: Date,
        default: moment() //Date.now
    },
})

medicationSchema.methods.toJSON = function () {
    const { __v, ...medication } = this.toObject();
    return medication;
}

module.exports = model('medication', medicationSchema);