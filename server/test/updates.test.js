const assert = require('chai').assert,
      Teachers = require('../models/TeacherSchema'),
      db = require('../database/db').db,
      mongoose = require('mongoose'),
      sha256 = require('js-sha256').sha256

describe('testing some stupid updating methods', () => {
    beforeAll(async () => {
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

    test('should update TEST_REGS[0] to -3', (done) => {
        //console.log(sha256(sha256('')))
         Teachers.findOne({
             key: sha256(sha256(''))
         }, async (err, data) => {
             console.log(data)
             if (err) return err

             data.groups['TEST_GROUP']
                 .regs['TEST_ACTS']['TEST_REG']
                 .regs[0] = -3
             data.markModified('groups')
             const new_data = await data.save()

             assert.equal(new_data.groups['TEST_GROUP']
                .regs['TEST_ACTS']['TEST_REG'].regs[0], -3)
             done()
         })
    })
})
