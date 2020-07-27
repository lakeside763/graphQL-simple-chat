import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { checkSignedOut } from '../auth'
import { defaultFieldResolver } from 'graphql'

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const [, , context] = args

      checkSignedOut(context.req)
      return await resolve.apply(this, args)
    }
  }
}
export default GuestDirective
