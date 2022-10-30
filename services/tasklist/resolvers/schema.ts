import { gql } from 'apollo-server'
import { TaskGqlType } from '../../task/resolvers/schema'

export const schema = gql`
  ${TaskGqlType}

  type Tasklist {
    id: ID!
    title: String!
    tasks: [Task!]!
  }

  type Query {
    tasklists: [Tasklist!]!
    tasklist(id: ID!): Tasklist!
  }

  type Mutation {
    createTasklist(title: String!): Tasklist!
  }
`
