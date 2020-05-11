const axios = require('axios')

module.exports = {
    getTotalStudents(group) { 
        return axios.post('https://heroku-super.herokuapp.com/group/getTotalStudents', {group: group})
        .then(res => res.data)
        .catch(err => console.log(err))
    }
}
