const { Schema, model } = require('mongoose');

const PatientSchema = Schema({
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    medical_history_number: {
        type: String,
        required: [true]
    },
    // forma de ingreso
    form_of_income: {
        type: String,
    },
});

PatientSchema.methods.toJSON = function () {
    const { __v, ...patient } = this.toObject();
    return patient;
}
// PatientSchema.index({ person:1 })
module.exports = model('Patient', PatientSchema);