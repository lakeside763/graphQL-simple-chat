import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { checkSignedIn } from '../auth'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const [, , context] = args

      checkSignedIn(context.req)
      return await resolve.apply(this, args)
    }
  }
}
export default AuthDirective
