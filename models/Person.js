const { Schema, model } = require('mongoose');

const PersonSchema = Schema({
    first_surname: {
        type: String,
        required: [true, 'El primer apellido es obligatorio']
    },
    second_surname: {
        type: String,
        required: [true, 'El segundo apellido es obligatorio']
    },
    names: {
        type: String,
        required: [true, 'Los nombres son obligatorios']
    },
    img: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

PersonSchema.methods.toJSON = function () {
    const { __v, ...person } = this.toObject();
    return person;
}

module.exports = model('Person', PersonSchema);