const moment = require('moment');
// moment.locale('es');
const { ClinicHistory, VitalSign, Medication, Diagnostic } = require("../models");

const createClinicHistory = async (req, res) => {

    const user = req.user._id;
    const patient = req.body.patient;

    // Datos a guardar en historia
    const data = {
        patient,
        user,
    }

    // Datos en historia

    if (req.body.sick_time) {
        const sick_time = req.body.sick_time.toUpperCase();
        data.sick_time = sick_time;
    }

    if (req.body.start_form) {
        const start_form = req.body.start_form.toUpperCase();
        data.start_form = start_form;
    }

    if (req.body.course) {
        const course = req.body.course.toUpperCase();
        data.course = course;
    }

    if (req.body.story) {
        const story = req.body.story.toUpperCase();
        data.story = story;
    }

    if (req.body.pathological_antecedents) {
        const pathological_antecedents = req.body.pathological_antecedents.toUpperCase();
        data.pathological_antecedents = pathological_antecedents;
    }

    if (req.body.surgical_background) {
        const surgical_background = req.body.surgical_background.toUpperCase();
        data.surgical_background = surgical_background;
    }

    if (req.body.allergies) {
        const allergies = req.body.allergies.toUpperCase();
        data.allergies = allergies;
    }

    if (req.body.familiar) {
        const familiar = req.body.familiar.toUpperCase();
        data.familiar = familiar;
    }

    if (req.body.auxiliary_exams) {
        const auxiliary_exams = req.body.auxiliary_exams.toUpperCase();
        data.auxiliary_exams = auxiliary_exams;
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

    let resp = {
        historyDB,
        vitalSigns,
        diagnosticsDB,
    }

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
        resp.medication = medication;
    }


    res.json({
        resp
    })
}

module.exports = {
    createClinicHistory
}