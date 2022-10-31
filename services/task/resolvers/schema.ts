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
    tasks: [Task!]!
    task(id: ID!): Task!
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
    """
      id: task id to move
      list_id: destination tasklist id
      position: new position in the destination tasklist id
    """
    moveTask(id: ID!, list_id: String!, position: Int!): Task!
  }
`
