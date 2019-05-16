const Joi = require('joi')

module.exports = {
  search (req, res, next) {
    const schema = {
      title: Joi.string().min(1).required(),
    }

    const {error} = Joi.validate(req.query, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'title':
          res.status(400).send({
            error: 'You must provide a title query parameter with at least 1 character'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}