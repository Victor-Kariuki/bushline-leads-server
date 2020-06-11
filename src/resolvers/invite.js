const { ForbiddenError } = require('apollo-server');

module.exports = {
  Query: {
    fetchAllInvites: async (parents, args, { currentUser, models }) => {
      if (!currentUser) {
        throw new ForbiddenError('Not authenticated as user.');
      }
      return models.Invite.findAll();
    },
  },

  Mutation: {
    createInvite: async (parents, args, { currentUser, models }) => {
      if (!currentUser) {
        throw new ForbiddenError('Not authenticated as user.');
      }

      const invite = new models.Invite({
        firstName: args.invite.firstName,
        lastName: args.invite.lastName,
        email: args.invite.email,
        phone: args.invite.phone,
      });
      invite.sender.push(currentUser._id);
      invite.save();

      return invite;
    },
  },
};
