const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const userSchema = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    name: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    surname: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    email: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: '',
    },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
