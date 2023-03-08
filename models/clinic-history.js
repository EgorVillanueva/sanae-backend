const { Schema, model } = require('mongoose');
const moment = require('moment')

const clinicHistorySchema = Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    // Tiempo de enfermedad
    sick_time: {
        type: Number
    },
    // Forma de inicio
    start_form: {
        type: String // insidoso, brusco
    },
    // Curso
    course: {
        type: String // estacionario, pregresivo
    },
    // Relato
    story: {
        type: String
    },
    // Antecedentes patológicos
    pathological_antecedents: {
        type: String
    },
    // Antecedentes quirúrgicos
    surgical_background: {
        type: String
    },
    // Alergias
    allergies: {
        type: String
    },
    // Antecedentes familiares
    familiar: {
        type: String
    },
    // Signos vitales
    // vital_signs: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'vital-sign',
    // },
    // Exámenes auxiliares
    auxiliary_exams: {
        type: String
    },
    diagnostics: [{
        diagnostic: {
            type: Schema.Types.ObjectId,
            ref: 'diagnostic',
        }
    }],
    // Tratamiento
    treatment: {
        type: Schema.Types.ObjectId,
        ref: 'treatment',
    },
    date: {
        type: String,
        default: moment().format('DD-MM-YYYY'),
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created_at: {
        type: Date,
        default: moment() //Date.now
    },
});

clinicHistorySchema.methods.toJSON = function () {
    const { __v, ...clinic_history } = this.toObject();
    return clinic_history;
}

module.exports = model('clinic-history', clinicHistorySchema);