const Joi = require('joi')
const schema = new Joi.object({
  name: Joi.string().required().min(5).max(20).messages({
    "any.required": "name is required",
    "string.min": "{{#label}} is less than 5 characters",
    "string.max": "{{#label}} is more than 20 characters"
  }),
  kindofresource: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  description: Joi.string().required().max(1000).min(1),
  image: Joi.array().items(Joi.string()).sparse(),
  rating: Joi.number().integer(),
  reviews: Joi.array().sparse(),
  phonenumber: Joi.string().required(),
  website: Joi.string().required(),
  hours: Joi.object({
    monday: {
      open: Joi.number().min(1).max(24).positive(),
      close: Joi.number().greater(Joi.ref('open')).positive(),
      isClose: Joi.boolean()
    },
    tuesday: {
      open: Joi.number().min(1).max(24).positive(),
      close: Joi.number().greater(Joi.ref('open')).positive(),
      isClose: Joi.boolean()
    },
    wednesday: {
      open: Joi.number().min(1).max(24).positive(),
      close: Joi.number().greater(Joi.ref('open')).positive(),
      isClose: Joi.boolean()
    },
    thursday: {
      open: Joi.number().min(1).max(24).positive(),
      close: Joi.number().greater(Joi.ref('open')).positive(),
      isClose: Joi.boolean()
    },
    friday: {
      open: Joi.number().min(1).max(24).positive(),
      close: Joi.number().greater(Joi.ref('open')).positive(),
      isClose: Joi.boolean()
    },
    saturday: {
      open: Joi.number().min(1).max(24).positive(),
      close: Joi.number().greater(Joi.ref('open')).positive(),
      isClose: Joi.boolean()
    },
    sunday: {
      open: Joi.number().min(1).max(24).positive(),
      close: Joi.number().greater(Joi.ref('open')).positive(),
      isClose: Joi.boolean()
    }
  })
})
//values => an object of values
const validate = (values) => schema.validate({...values})

module.exports = validate

