let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    sha256 = require('js-sha256').sha256

let Teacher = require('../models/TeacherSchema')

router.route('/create').post((req, res) => {
    Teacher.create(req.body, (error, data) => {
        if(err) {
            return next(error)
        }
        else {
            console.log(data)
            res.json(data)
        }
    })
})

router.route('/getGroups').post((req, res) => {
    Teacher.findOne({key: sha256(req.body.key)},(error, data) => {
        if(error) return error
        try {
            res.json(data.groups)
        }
        catch(TypeError){
            res.json(null)
        }
    })
})

router.route('/getTeacher').post((req, res) => {
    Teacher.find(req.body, (error, data) => {
        if (error) return error
        else return data
    })
})

module.exports = router