const moment = require('moment');
// moment.locale('es');
const { ClinicHistory, VitalSign, Medication, Diagnostic } = require("../models");

const createClinicHistory = async (req, res) => {

    // const { created_at, ...body } = req.body;

    // Datos en historia
    const patient = req.body.patient;
    const sick_time = req.body.sick_time.toUpperCase();
    const start_form = req.body.start_form.toUpperCase();
    const course = req.body.course.toUpperCase();
    const story = req.body.story.toUpperCase();
    const pathological_antecedents = req.body.pathological_antecedents.toUpperCase();
    const surgical_background = req.body.surgical_background.toUpperCase();
    const allergies = req.body.allergies.toUpperCase();
    const familiar = req.body.familiar.toUpperCase();
    const auxiliary_exams = req.body.auxiliary_exams.toUpperCase();
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
    await historyDB.save();

    const clinic_history = historyDB._id;

    // Datos a guardar en signos vitales
    const pa = req.body.pa;
    const t = req.body.t;
    const fr = req.body.fr;
    const fc = req.body.fc;
    const description_vital_sign = req.body.description_vital_sign;

    const dataVitalSigns = {
        pa,
        t,
        fr,
        fc,
        description_vital_sign,
    }

    dataVitalSigns.clinic_history = clinic_history;
    const vitalSigns = new VitalSign(dataVitalSigns);
    await vitalSigns.save();

    // Datos a guardar en diagnósticos
    const diagnostics = req.body.diagnostics;
    let diagnosticsDB;

    for (let item of diagnostics) {
        item.clinic_history = clinic_history;
        diagnosticsDB = new Diagnostic(item);
        await diagnosticsDB.save();

    }

    // Datos a guardar en tratamiento
    const cf = req.body.cf;
    const pf = req.body.pf;
    const cb = req.body.cb;
    const mt = req.body.mt;
    const lta = req.body.lta;
    const elect = req.body.elect;
    const chc = req.body.chc;
    const us = req.body.us;
    const ht = req.body.ht;
    const oc = req.body.oc;
    const description_medication = req.body.description_medication;
    const sessions = req.body.sessions;

    const dataMedication = {
        cf,
        pf,
        cb,
        mt,
        lta,
        elect,
        chc,
        us,
        ht,
        oc,
        description_medication,
        sessions,
    };

    dataMedication.clinic_history = clinic_history;

    if (dataMedication.sessions !== undefined) {
        const medication = new Medication(dataMedication);
        await medication.save()

    }

    res.json({
        historyDB,
        vitalSigns,
        diagnosticsDB
    })
}

module.exports = {
    createClinicHistory
}