import Joi from '@hapi/joi'
// import { objectId } from './joi'

export const ChatSchema = Joi.object({
  title: Joi.string().min(6).max(50).label('Title'),
  userIds: Joi.array().label('User Ids')
})

// Joi.string().objectId().not(userId).label('User Id')
