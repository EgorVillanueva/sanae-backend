const moment = require('moment');
// moment.locale('es');
const { ClinicHistory, VitalSign } = require("../models");

const createClinicHistory = async (req, res) => {

    const { created_at, ...body } = req.body;

    // Datos en historia
    const patient = req.body.patient;
    const sick_time = req.body.sick_time;
    const start_form = req.body.start_form.toUppercase();
    const course = req.body.course.toUppercase();
    const story = req.body.story.toUppercase();
    const pathological_antecedents = req.body.pathological_antecedents.toUppercase();
    const surgical_background = req.body.surgical_background.toUppercase();
    const allergies = req.body.allergies.toUppercase();
    const familiar = req.body.familiar.toUppercase();
    const auxiliary_exams = req.body.auxiliary_exams.toUppercase();
    const user = req.user._id;

    // Datos a guardar en historia
    const data = {
        patient,
        sick_time,
        start_form,
        course,
        story,
        pathological_antecedents,
        surgical_background,
        allergies,
        familiar,
        auxiliary_exams,
        user,
    }

    const historyDB = new ClinicHistory(data);
    await save(historyDB);

    const clinic_history = historyDB._id;

    // Datos a guardar en signos vitales
    const pa = req.body.pa;
    const t = req.body.t;
    const fr = req.body.fr;
    const fc = req.body.fc;
    const description = req.body.description;

    const dataVitalSigns = {
        pa,
        t,
        fr,
        fc,
        description,
        clinic_history
    }

    const vitalSigns = new VitalSign(dataVitalSigns);
    await vitalSigns.save();

    // Datos a guardar en diagnósticos
    const diagnostics = req.body.diagnostics;

    // Datos a guardar en tratamiento
    const treatment = req.body.treatment;



}

exports.default = {
    createClinicHistory
}