// src/index.js

// 3rd party imports
require('dotenv').config();
const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// local imports
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const models = require('./models');

// init db
require('./config/db')(mongoose);

const app = express();
app.use(cors());

const getCurrentUser = async (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const user = await jwt.verify(token, process.env.SECRET);
      return user;
    } catch (error) {
      return new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
  return new AuthenticationError('No token provided.');
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const currentUser = await getCurrentUser(req);
    return {
      currentUser,
      models,
    };
  },
});

server.applyMiddleware({ app });

// setup port
const port = parseInt(process.env.PORT, 10) || 5000;

app.listen(port, () => {
  try {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  } catch (error) {
    console.error('Error starting server');
  }
});
