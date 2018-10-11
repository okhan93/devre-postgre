const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      first_name: Joi.string(),
      last_name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp(/^[a-zA-Z0-9]{8,}$/)
      )
    }

    const { error, value } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'first_name':
          res.status(400).send({
            error: 'You must enter a valid first name'
          })
          break
        case 'last_name':
          res.status(400).send({
            error: 'You must enter a valid last name'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must enter a valid email'
          })
          break
        case 'password':
          res.status(400).send({
            error:
              'You must enter a valid password, 8-32 characters, containing A-Z, a-z, 0-9'
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
