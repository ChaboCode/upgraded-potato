const assert = require('chai').assert,
      mongoose = require('mongoose'),
      Teachers = require('../models/TeacherSchema')
      sha256 = require('js-sha256').sha256
      db = require('../database/db')

describe('some shitty tests for the database', () => {
    before(async () => {
        await mongoose.connect(db.db, {
            useNewUrlParser: true,
            useCreateIndex: true
        }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        })
    })

    it('should return TEST', (done) => {
        Teachers.findOne({
            name: 'TEST'
        }, (err, data) => {
            if (err) return err
            assert(data.name == 'TEST')
            done()
        })
    })
    it('should return TEST_LAST', (done) => {
        Teachers.findOne({
            name: 'TEST'
        }, (err, data) => {
            if (err) return err
            assert(data.last == 'TEST_LAST')
	    done()
        })
    })
    describe('same shitty test, but using the sha256 key', () => {
        it('should return TEST with an empty sha256', (done) => {
            Teachers.find({
                key: sha256(sha256(''))
            }, (err, data) => {
                if (err) return err
		assert(data[0].name == 'TEST')
                done()
            })
	})
    })
})
