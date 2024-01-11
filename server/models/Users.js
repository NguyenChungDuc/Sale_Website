import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
});

export default mongoose.model('User', userSchema);
