const assert = require('assert'),
    Teachers = require('../models/TeacherSchema'),
    db = require('../database/db').db,
    mongoose = require('mongoose'),
    sha256 = require('js-sha256').sha256

describe('Getting the tabs', () => {
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
  it('[0] should be Actividades', () => {
    Teachers.findOne({
      key: sha256(sha256('juan01'))
    }, (err, data) => {
      if (err) return err
      let tabs = Object.getOwnPropertyNames(data.groups[req.body.group].regs)
      assert.equal(tabs[0], 'Actividades')
    })
  })
})