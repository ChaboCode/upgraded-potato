const assert = require('assert'),
      nock = require('nock')
      getGroup = require('./axios').getGroupsByKey

describe('Teachers', () => {
    describe('Read operations', () => {
        beforeEach(() => {
            nock('http://localhost:5000')
            .post('/teacher/getGroups', {key: ''})
            .reply(200)
        })

        it('should return groups TEST_GROUP with assignature -1', () => {
            return getGroup('')
            .then(response => {
                console.log(response)
                assert.equal(response[0].assign, -1)
            })
        })
    })
})