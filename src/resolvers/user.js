const { AuthenticationError, UserInputError } = require('apollo-server');
const { combineResolvers } = require('graphql-resolvers');
const jwt = require('jsonwebtoken');
const { isAuthenticated, isAdmin, isAccountOwner } = require('./authorization');

const createToken = async (user) => {
  const {
    _id, email, phone, username,
  } = user;
  return jwt.sign({
    _id, email, phone, username,
  }, process.env.SECRET_KEY, { expiresIn: '1d' });
};

module.exports = {
  Query: {
    fetchAllUsers: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, args, { models }) => models.User.find(),
    ),

    fetchUserById: combineResolvers(
      isAuthenticated,
      async (parent, args, { models }) => models.User.findById(args.id),
    ),
  },

  Mutation: {
    createUser: async (parent, args, { models }) => {
      const user = await models.User.create({
        username: args.user.username,
        phone: args.user.phone,
        email: args.user.email,
        password: args.user.password,
      });
      return { token: createToken(user) };
    },

    authenticateUser: async (parent, { email, password }, { models }) => {
      const user = await models.findOne({ email });
      if (!user) {
        throw new UserInputError(email);
      }
      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }
      return { token: createToken(user) };
    },

    updateUser: combineResolvers(
      isAuthenticated,
      isAdmin,
      (parent, args, { models }) => models.User.findByIdAndUpdate(args.id, {
        username: args.user.username,
        phone: args.user.phone,
        email: args.user.email,
      }, { new: true }),
    ),

    deleteUser: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, args, { models }) => models.User.findOneAndDelete(args.id),
    ),
  },
};
