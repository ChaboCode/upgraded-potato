const mongoose = require('mongoose'),
      express = require('express'),
      router = express.Router()

const Group = require('../models/GroupSchema')

router.route('/getNameById').post((req, res) => {
    Group.findById(req.body.id, (error, data) => {
        if(error) throw error
        res.json(data.name)
    })
})

module.exports = router