const assert = require('chai').assert,
      mongoose = require('mongoose'),
      db = require('../database/db').db,
      Teachers = require('../models/TeacherSchema'),
      sha256 = require('js-sha256').sha256,
      nock = require('nock'),
      getTotalStudents = require('./axios.js').getTotalStudents

describe('some shitty test to check a stupid schema', () => {
    beforeEach(async () => {
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
    test('should return Saul', (done) => {
        Teachers.findOne({
            key: sha256(sha256('juan01'))
        }, (err, data) => {
            if (err) return err
            assert.equal(data.name, 'Saul')
            done()
        })
    })

    describe('Update functions', () => {
        test('Should add NEW_REG to TEST.groups.TEST_GROUP.regs.TEST_ACTS', (done) => {
            Teachers.findOne({
                key: sha256(sha256(''))
            }, async (err, data) => {
                if (err) return err
                console.log(data.groups.TEST_GROUP.regs)
                data.groups.TEST_GROUP.regs.TEST_ACTS.NEW_REG = 'NEW_REG'
                data.markModified('groups')
                await data.save((err, new_data) => {
                    if (err) return err
                    assert.equal(new_data.groups.TEST_GROUP.regs.TEST_ACTS.NEW_REG, 'NEW_REG')
                    console.log(new_data.groups.TEST_GROUP.regs)
                    done()
                })
            })
        })
    })
})
