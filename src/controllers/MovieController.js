const _ = require('lodash')
const request = require('request')
const config = require('../config')
const mockMovies = require('../mocks/movies')
const get = require('util').promisify(request.get)

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
  async search (req, res) {
    if(config.omdbapi.secretKey == null) {
      return res.send(mockMovies);
    }

    try {
      const response = await get(`http://www.omdbapi.com/?s=${req.query.title}&plot=full&apikey=${config.omdbapi.secretKey}`)
      const body = lowerCaseKeys(JSON.parse(response.body))
      if(!body || !body.search || body.error) {
        return res.status(404).send({
          error: body.error || 'No results'
        })
      }

      const moviesToFetch = body.search.map((movie, n = 0) => {
        return (n < config.omdbapi.maxCalls && n++) ? get(`http://www.omdbapi.com/?i=${movie.imdbid}&plot=full&apikey=${config.omdbapi.secretKey}`) : null
      })

      const movies = await Promise.all(moviesToFetch.filter(item => !!item));
      res.send(movies.map(movie => lowerCaseKeys(JSON.parse(movie.body))))

    } catch(error) {
      return res.status(400).send({error})
    }
  }
}