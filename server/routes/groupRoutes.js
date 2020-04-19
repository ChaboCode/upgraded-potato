const express = require('express'),
      router = express.Router()

const Group = require('../models/GroupSchema')

router.route('/getNameById').post((req, res) => {
    Group.findById(req.body.id, (error, data) => {
        if(error) throw error
        res.send(data.name)
    })
})

router.route('/getStudentsByName').post((req, res) => {
    Group.findOne({name: req.body.name}, (error, data) => {
        if (error) throw error
        res.json(data.s_names)
    })
})

//router.route('/getTotalStudents').post((req, res) => {
//    console.log(req.body)
//    //Group.findOne({name: req.body.group}, (error, data) => {
//    //    if (error) throw error
//    //    console.log(data)
//    //    //res.json(data.s_names.length)
//    //    res.send(data.s_names.length)
//    //})
//})

module.exports = router
