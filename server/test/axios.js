const axios = require('axios')

module.exports = {
    getTotalStudents(group) { 
        return axios.post('http://localhost:5000/group/getTotalStudents', {group: group})
        .then(res => res.data)
        .catch(err => console.log(err))
    }
}
