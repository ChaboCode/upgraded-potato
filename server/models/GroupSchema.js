const mongoose = require('mongoose')
const Schema = mongoose.Schema

let GroupSchema = new Schema ({
    name: {
        type: String
    },
    students: {
        type: Array
    },
    teachers: {
        type: Array
    },
    s_names: {
        type: Array
    }
})

module.exports = mongoose.model('Groups', GroupSchema, 'Groups')