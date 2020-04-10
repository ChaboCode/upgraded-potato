const axios = require('axios')

module.exports = {
    getGroupsByKey(key) {
        return axios.post('http://localhost:5000/teacher/getGroups', {key: key})
        .then(res => res.data)
        .catch(error => console.log(error))
    }
}