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
    birthdate: {
        type: Date
    },
    gender: {
        type: Boolean
    },
    document_type: {
        type: String
    },
    document_number: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String
    },
    province: {
        type: String
    },
    district: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    file: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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