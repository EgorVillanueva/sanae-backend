const { ClinicHistory, Prescription } = require('../models');

const createPrescription = async (req, res) => {

    const { clinic_history } = req.body;
    const thereIsHomework = await ClinicHistory.findById(clinic_history);

    if (!thereIsHomework) {
        const error = new Error('La historia clínica no existe');
        return res.status(404).json({
            msg: error.message
        });
    }
    
    // const prescriptions = Prescription.find();
    // console.log(prescriptions);

    try {
        const prescription = await Prescription.create(req.body);
        thereIsHomework.prescriptions.push(prescription._id);
        await thereIsHomework.save();
        res.json(prescription);
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    createPrescription
}