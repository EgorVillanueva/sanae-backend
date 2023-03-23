const { Schema, model } = require('mongoose');

const PatientSchema = Schema({
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    medical_history_number: {
        type: String,
        default: "5536"
    },
    // parentesco (padre, madre, hermano, hijo, pareja, otro)
    relation: {
        type: String,
    },
    // Nombre de pariente
    relative_name: {
        type: String
    },
    //Telefono del pariente
    relative_phone: {
        type: String
    },
    status: {
        type: Boolean,
        default: true,
    },
});

PatientSchema.methods.toJSON = function () {
    const { __v, ...patient } = this.toObject();
    return patient;
}
// PatientSchema.index({ person:1 })
module.exports = model('Patient', PatientSchema);