import Joi from '@hapi/joi'
import mongoose from 'mongoose'

export const objectId = Joi.extend({
  name: 'string',
  base: Joi.string(),
  message: 'Must be a valid Object ID',
  rules: [{
    name: 'objectId',
    validate (params, value, state, options) {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return this.$_createError('objectId', {}, state, options)
      }
      return value
    }
  }]
})

// export default Joi.object(objectId)
