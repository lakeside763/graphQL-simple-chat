import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const chatSchema = new Schema({
  title: String,
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
  lastMessage: {
    type: ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: true
})

export default mongoose.model('Chat', chatSchema)
