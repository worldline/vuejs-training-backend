const _ = require('lodash')
const request = require('request')
const config = require('../config')

const lowerCaseKeys = object => {
  if (!object) {
    return
  }
  if (object instanceof Array) {
    return object.map(lowerCaseKeys)
  }
  return _(object)
      .mapKeys((value, key) => key.toLowerCase())
      .mapValues(value => value instanceof Array ? lowerCaseKeys(value) : value)
      .value()
}

module.exports = {
  search (req, res) {
    request.get(`http://www.omdbapi.com/?s=${req.query.title}&plot=full&apikey=${config.omdbapi.secretKey}`, (err, callResponse) => {
      res.set('Content-Type', 'application/json')
      if (err) {
        return res.status(400).send(err)
      }
      let body
      try {
        body = lowerCaseKeys(JSON.parse(callResponse.body))
      } catch (error) {
        return res.status(400).send({
          error
        })
      }
      if (body.error || !body.search) {
          return res.status(404).send({
            error: body.error || 'No results found'
          })
      }
      res.send(body.search)
    })
  }
}