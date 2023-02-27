const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    cmp: {
        type: String,
    },
});

DoctorSchema.methods.toJSON = function () {
    const { __v, ...doctor } = this.toObject();
    return doctor;
}

module.exports = model('Doctor', DoctorSchema);