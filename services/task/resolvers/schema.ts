import { gql } from 'apollo-server'

export const TaskGqlType = gql`
  type Task {
    id: ID!
    title: String!
    position: Int!
    list_id: String!
    status: String!
  }
`

export const schema = gql`
  ${TaskGqlType}

  enum TaskStatus {
    Active
    Completed
  }

  type Query {
    Task: [Task!]!
  }

  input CreateTaskInput {
    title: String!
    list_id: String!
    status: TaskStatus
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
  }
`
