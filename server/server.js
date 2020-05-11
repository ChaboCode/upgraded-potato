let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    database = require('./database/db')

const teacherRoute = require('./routes/teacherRoutes')
const groupRoute = require('./routes/groupRoutes')

mongoose.Promise = global.Promise
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
app.use(cors())
app.use('/teacher', teacherRoute)
app.use('/group', groupRoute)

app.get('/', (req, res) => {
    res.send('API')
})

app.set('port', process.env.PORT || 3000)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(app.get('port'), () => {
    console.log(`CONNECTED! Server runing at port 5000`)
})

app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
    console.error(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})
