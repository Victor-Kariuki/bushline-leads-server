const { gql } = require('apollo-server-express');

module.exports = gql`
  type Invite {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    sender: User
    status: Boolean
  }

  input InviteInput {
    firstName: String
    lastName: String
    email: String
    phone: String
  }

  extend type Query {
    fetchAllInvites: [Invite]
    fetchInviteById(id: ID!): Invite
  }

  extend type Mutation {
    createInvite(invite: InviteInput): Invite
    deleteInvite(id: ID!): Boolean
  }
`;
