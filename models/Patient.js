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
});

PatientSchema.methods.toJSON = function () {
    const { __v, ...patient } = this.toObject();
    return patient;
}

module.exports = model('Patient', PatientSchema);