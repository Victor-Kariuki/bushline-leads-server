const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

const isAuthenicated = (parents, args, { currentUser }) => (currentUser ? skip : new ForbiddenError('Not authenticated as user.'));

module.exports = isAuthenicated;
