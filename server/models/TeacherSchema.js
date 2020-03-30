const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.Types.ObjectId

let TeacherSchema = new Schema ({
    key: {
        type: String
    },
    name: {
        type: String
    },
    groups: {
        type: Array
    }
})

module.exports = mongoose.model('Teacher', TeacherSchema)