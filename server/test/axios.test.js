const assert = require('chai').assert,
      axios = require('axios'),
      mongoose = require('mongoose'),
      db = require('../database/db').db,
      Teachers = require('../models/TeacherSchema.js'),
      sha256 = require('js-sha256').sha256

describe('some shitty test to check a stupid schema', () => {
    before(async () => {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true
        }, err => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
        })
    })
    it('should return Saul', (done) => {
        Teachers.findOne({
            key: sha256(sha256('juan01'))
        }, (err, data) => {
            if (err) return err
            assert(data.name == 'Saul')
            done()
        })
    })
})
