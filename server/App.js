const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('aqui no hay nada que ver xd')
})

app.get('/checkTeacherKey', (req, res) => {
    //TODO: implementar
})

app.listen(5000, () => {
    console.log('Escuchando en el puerto 5000')
})