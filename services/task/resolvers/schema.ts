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

  input UpdateTaskInput {
    title: String
    status: TaskStatus
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    moveTask(id: ID!, list_id: String!, position: Int!): Task!
  }
`
