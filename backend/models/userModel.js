import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },

  subscription: {
    type: String,
    enum: ['none', 'monthly', 'weekly', 'yearly', 'one-time'],
    default: 'none',
  },
  subscriptionStartDate: { type: Date },
  subscriptionEndDate: { type: Date },
  isActive: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
export default User;
