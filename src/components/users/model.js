const { Schema } = require('mongoose');
const connections = require('../../config/conection');

const UserSchema = new Schema(
    {
        name: String,
        lastName: String,
        phoneNumber: Number,
    },
    {
        collection: 'usermodel',
        versionKey: false,
    }
);

module.exports = connections.model('UserModel', UserSchema);