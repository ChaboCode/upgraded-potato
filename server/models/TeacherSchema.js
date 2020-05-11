const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TeachersSchema = new Schema ({
    key: {
        type: String
    },
    name: {
        type: String
    },
    last: {
        type: String
    },
    groups: {
        type: Object
    }
})

module.exports = mongoose.model('Teachers', TeachersSchema, 'Teachers')