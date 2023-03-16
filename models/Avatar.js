const { Schema, model } = require('mongoose');
const moment = require('moment')

const avatarSchema = Schema({
    image: {
        type: String
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }
});

module.exports = model('avatar', avatarSchema);