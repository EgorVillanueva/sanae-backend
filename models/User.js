const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    name: {
        type: String,
        required: [true, 'El usuario es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        // type: String,
        // required: true,
        // emun: ['ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE']
        // emun: ['ADMIN_ROLE', 'USER_ROLE', 'DOCTOR_ROLE']
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    state: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}


module.exports = model('User', UserSchema);
// User.createIndexes();