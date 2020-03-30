let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    database = require('./database/db')

const teacherRoute = require('../server/routes/teacherRoutes')

mongoose.Promise = global.Promise
mongoose.connect(database.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully')
}, error => {
    console.log('Database could not be connected: ' + error)
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors)
app.use('/teacher', teacherRoute)

app.get('/', (req, res, next) => {
    res.render('API')
    next
})

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
    console.log(`CONNECTED! Server runing at port ${port}`)
})

// app.use((req, res, next) => {
//     next(createError(404))
// })

app.use((err, req, res, next) => {
    console.error(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})
