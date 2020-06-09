const { Schema, model } = require('mongoose');

const InviteSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = model('Invite', InviteSchema);
