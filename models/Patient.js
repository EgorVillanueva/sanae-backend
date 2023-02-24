const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientSchema = new Schema({
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
PatientSchema.index({ person:1 })
module.exports = model('Patient', PatientSchema);