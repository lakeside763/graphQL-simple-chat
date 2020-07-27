import Joi from '@hapi/joi'

export const SignUpSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
  username: Joi.string().alphanum().required().min(4).max(30).required().label('Username'),
  name: Joi.string().max(254).required().label('Name'),
  password: Joi.string().required().label('Password').pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).message('Password required atleast one letter and numer')
})

export const SignInSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().label('Password')
})

// export default Joi.object().keys({
//   email: Joi.string().email().required().label('Email'),
//   username: Joi.string().alphanum().required().min(4).max(30).required().label('Username'),
//   name: Joi.string().max(254).required().label('Name'),
//   password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).label('Password')
// })
