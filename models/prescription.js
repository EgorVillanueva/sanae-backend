const { Schema, model } = require('mongoose');
const moment = require('moment');

const prescriptionSchema = Schema({
    clinic_history: {
        type: Schema.Types.ObjectId,
        ref: 'clinic-history',
    },
    prescription_number: {
        type: Number
    },
    prescription_details: [{
        diagnostic: {
            type: Schema.Types.ObjectId,
            ref: 'diagnostic',
        },
        medicament: {
            type: String
        },
        indications: {
            type: String
        }
    }],
    general_indications: {
        type: String
    },
    created_at: {
        type: Date,
        default: moment() //Date.now
    },
});

prescriptionSchema.methods.toJSON = function () {
    const { __v, ...prescription } = this.toObject();
    return prescription;
}

module.exports = model('prescription', prescriptionSchema);