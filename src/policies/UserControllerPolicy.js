const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required()
    })

    console.log(`req body: ${JSON.stringify(req.body)}`)
    const {error} = schema.validate(req.body)

    if (error) {
      console.log(`UserControllerPolicy error: ${error}`)
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided must contain between 8 and 32 characters`
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