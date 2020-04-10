const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

module.exports = mongoose.model('Teachers', TeacherSchema, 'Teachers')