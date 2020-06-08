// src/index.js

// 3rd party imports
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');

// local imports
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const models = require('./models');

// init db
require('./config/db')(mongoose);

const app = express();
app.use(cors());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
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
