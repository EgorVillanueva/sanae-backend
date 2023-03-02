const { Schema, model } = require('mongoose');

const timeSchema = Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    day: {
        type: String,
        required: true
    },
    time: [{
        start_time: {
            type: String,
            required: true,
        },
        end_time: {
            type: String,
        },
        status: {
            type: Boolean,
            default: 1
        }
    }],
});

timeSchema.methods.toJSON = function () {
    const { __v, ...time } = this.toObject();
    return time;
}

module.exports = model('time', timeSchema);