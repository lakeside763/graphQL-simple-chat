import mongoose, { Schema } from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.doesNotExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken.`
    }
  },
  username: {
    type: String,
    validate: {
      validator: username => User.doesNotExist({ username }),
      message: ({ username }) => `Username ${username} has already been taken.`
    }
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  name: String,
  password: String
}, {
  timestamps: true
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10)
      next()
    } catch (err) {
      next(err)
    }
  }
  next()
})

userSchema.statics.doesNotExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
export default User

// validator: async email => await User.where({ email }).countDocuments() === 0
