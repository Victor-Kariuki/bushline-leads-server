const { Schema, model } = require('mongoose');
const bcyrpt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
}, { timestamps: true });

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcyrpt.genSalt(10);
    this.password = await bcyrpt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(password) {
  return bcyrpt.compare(password, this.password);
};

module.exports = model('User', UserSchema);
