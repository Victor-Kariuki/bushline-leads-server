const { gql } = require('apollo-server-express');

module.exports = gql`
  type Invite {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
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
    fetchInviteById(_id: ID!): Invite
  }

  extend type Mutation {
    createInvite(invite: InviteInput): Invite
  }
`;
