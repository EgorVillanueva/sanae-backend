const { Schema, model } = require('mongoose');
const moment = require('moment');

const diagnosticSchema = Schema({
    clinic_history: {
        type: Schema.Types.ObjectId,
        ref: 'clinic-history',
        required: true,
    },
    ciex: {
        type: String
    },
    type_attention: {
        type: String,
        default: 'PRESUNTIVO' // DEFINITIVO, REPETITIVO
    },
    created_at: {
        type: Date,
        default: moment() //Date.now
    },
})

diagnosticSchema.methods.toJSON = function () {
    const { __v, ...diagnostic } = this.toObject();
    return diagnostic;
}

module.exports = model('diagnostic', diagnosticSchema);