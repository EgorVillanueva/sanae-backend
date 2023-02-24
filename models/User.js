const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
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
    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    
    return user;
}


module.exports = mongoose.model('User', UserSchema);
// User.createIndexes();