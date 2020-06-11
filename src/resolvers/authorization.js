const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

const isAuthenticated = (parents, args, { currentUser }) => (currentUser ? skip : new ForbiddenError('Not authenticated as user.'));
const isAdmin = async (parents, args, { currentUser }) => (currentUser.isAdmin ? skip : new ForbiddenError('Not authenticated as an admin.'));

const isAccountOwner = async (parents, args, { currentUser, models }) => {
  const user = await models.User.findById(args.id);
  if (user._id !== currentUser._Id) {
    throw new ForbiddenError('Not authenticated as owner of account.');
  }
  return skip;
};

module.exports = {
  isAuthenticated,
  isAccountOwner,
  isAdmin,
};
