import { gql } from 'apollo-server'

export const schema = gql`
  type Task {
    id: ID!
    title: String!
  }

  type Query {
    Task: [Task!]!
  }

  input CreateTaskInput {
    title: String!
    list_id: String!
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
  }
`
