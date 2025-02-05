import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
  subscriptionType: {
    type: String,
    enum: ['monthly', 'weekly', 'yearly', 'one-time'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed',
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
