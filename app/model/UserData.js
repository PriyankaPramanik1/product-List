const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false
    })
UserData = mongoose.model('UserData', UserSchema)

module.exports = UserData