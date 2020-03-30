let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router()

let user = require('../models/TeacherSchema')

router.route('/create').post((req, res) => {
    user.create(req.body, (error, data) => {
        if(err) {
            return next(error)
        }
        else {
            console.log(data)
            res.json(data)
        }
    })
})

router.route('/').get((req, res) => {
    console.log('xd')
    res.write('xd')
})

module.exports = router