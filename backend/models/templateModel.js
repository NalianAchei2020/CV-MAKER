import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  previewImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Template = mongoose.model('Template', templateSchema);
module.exports = Template;
