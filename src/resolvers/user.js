const { AuthenticationError, UserInputError } = require('apollo-server');

const jwt = require('jsonwebtoken');

const createToken = async (user) => {
  const { email, username } = user;
  return jwt.sign({ email, username }, process.env.SECRET_KEY);
};

module.exports = {
  Query: {
    fetchAllUsers: async (parent, args, { models }) => models.User.find(),

    fetchUserById: async (parent, args, { models }) => models.User.findById(args._id),
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

    updateUser: (parent, args, { models }) => {},
  },
};
