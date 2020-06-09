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
};
