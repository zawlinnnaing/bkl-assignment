import { gql } from 'apollo-server'

export const TaskGqlType = gql`
  type Task {
    id: ID!
    title: String!
  }
`

export const schema = gql`
  ${TaskGqlType}

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
