const express = require('express'),
    router = express.Router(),
    sha256 = require('js-sha256').sha256,
    Teachers = require('../models/TeacherSchema')

const checkIfExists = (name, regs) => {
    for(let reg in regs) {
        if(name === reg.name) {
            checkIfExists(name.concat('.'), regs)
        }
        return name
    }
}

router.route('/getGroups').post((req, res) => {
    Teachers.find({
        key: sha256(req.body.key)
    }, (error, data) => {
        if (error) return error
        res.json(data ? data[0].groups : null)
    })
})

router.route('/getGroupRegisters').post((req, res) => {
    Teachers.findOne({
        key: sha256(req.body.key)
    }, (error, data) => {
        if (error) return error
        res.json(data.groups[req.body.group].regs[req.body.reg])
    })
})

router.route('/addNewGroupRegister').post((req, res) => {
    const teacher = req.body.key,
          group = req.body.group,
          group_length = req.body.group_length,
          reg = req.body.reg,
          new_reg = req.body.new_reg

    Teachers.findOne({
        key: sha256(teacher)
    }, async (error, data) => {
        if (error) throw error
        let new_regs = []
        for(let i = 0; i < group_length; i++) {
            new_regs.push('')
        }

        const verified_reg = checkIfExists(new_reg, data.groups[group].regs[reg])
        data.groups[group].regs[reg][verified_reg] = {
            desc: '',
            regs: new_regs
        }
        data.markModified('groups')
        await data.save()
        res.json('xd')
    })
})

router.route('/updateRegisterOnIndex').post((req, res) => {
    const teacher = req.body.teacher,
          student = req.body.student,
          reg = req.body.reg,
          group = req.body.group,
          sup_reg = req.body.sup_reg,
          points = req.body.points

    Teachers.findOne({
        key: sha256(teacher)
    }, async (err, data) => {
        if (err){
            res.json({done: false})
            throw err
        }

        const register = Object.getOwnPropertyNames(data.groups[group].regs[sup_reg])[reg]
        data.groups[group].regs[sup_reg][register].regs[student] = points
        data.markModified('groups')
        await data.save()
    })
    res.json({done: true})
})

router.route('/getTabs').post((req, res) => {
    Teachers.findOne({
        key: sha256(req.body.key)
    }, (err, data) => {
        if (err) throw err
        res.json(Object.getOwnPropertyNames(data.groups[req.body.group].regs))
    })
})

module.exports = router
