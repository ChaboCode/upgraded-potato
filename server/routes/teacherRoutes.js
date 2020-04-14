let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    sha256 = require('js-sha256').sha256

let Teachers = require('../models/TeacherSchema')

router.route('/create').post((req, res) => {
    Teachers.create(req.body, (error, data) => {
        if (err) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

router.route('/getGroups').post((req, res) => {
    Teachers.find({
        key: sha256(req.body.key)
    }, (error, data) => {
        if (error) return error
        try {
            res.json(data[0].groups)
        } catch (TypeError) {
            res.json(null)
        }
    })
})

router.route('/getGroupRegisters').post(function (req, res) {
    Teachers.find({
        key: sha256(req.body.key)
    }, (error, data) => {
        if (error) return error
        try {
            res.json(data[0].groups[req.body.group].regs)
        } catch (TypeError) {
            res.json(null)
        }
    })
})

router.route('/getTeacher').post((req, res) => {
    Teachers.find(req.body, (error, data) => {
        if (error) return error
        else return data
    })
})

module.exports = router
