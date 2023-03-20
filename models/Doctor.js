const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    specialty: {
        type: String,
        required: true,
        default: 'MEDICINA FISICA'
    },
    cmp: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

DoctorSchema.methods.toJSON = function () {
    const { __v, ...doctor } = this.toObject();
    return doctor;
}

module.exports = model('Doctor', DoctorSchema);