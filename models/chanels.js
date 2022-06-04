const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const chanelSchema = new Schema({
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
    workspaceId: {
        type: ObjectId,
        required: true,
        ref: 'Workspace'
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

}, {timestamps: true});

module.exports = mongoose.model('Channel', chanelSchema);
