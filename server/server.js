let express = require('express')
let http = require('http')
let mongoose = require('mongoose')
let cors = require('cors')
let bodyParser = require('body-parser')
let database = require('./database/db')
let socketIO = require('socket.io')

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

app.set('port', process.env.PORT || 5000)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
    console.error(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})

const server = http.createServer(app)

const io = socketIO(server)

io.on("connection", socket => {
    console.info(`Client connected [id=${socket.id}]`)

    socket.on("disconnect", () => {
        console.log('Client disconnected')
    })

    socket.on('xd', data => {
        console.log(`${socket.id} says XD`)
        io.to(socket.id).emit('recivedXD', `Received xd from ${socket.id}`)
    })
})



server.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})
