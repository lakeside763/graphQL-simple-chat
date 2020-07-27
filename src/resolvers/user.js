import mongoose from 'mongoose'
import { User } from '../models'
import { UserInputError } from 'apollo-server-express'
import { SignUpSchema, SignInSchema } from '../schemas'
import * as Auth from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // Auth.checkSignedIn(req)

      return User.findById(req.session.userId)
    },
    users: (root, arg, { req }, info) => {
      // Auth.checkSignedIn(req)

      return User.find({})
    },
    user: (root, { id }, { req }, info) => {
      // Auth.checkSignedIn(req)

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid ID.`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // Auth.checkSignedOut(req)

      await SignUpSchema.validateAsync(args)

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session

      if (userId) {
        return User.findById(userId)
      }

      await SignInSchema.validateAsync(args)

      const user = await Auth.attemptSignIn(args.email, args.password)

      req.session.userId = user.id

      return user
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req)

      return Auth.signOut(req, res)
    }
  },
  User: {
    chats: async (user, args, context, info) => {
      return (await user.populate('chats').execPopulate()).chats
    }
  }
}
