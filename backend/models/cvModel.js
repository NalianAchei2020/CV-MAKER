import mongoose, { Schema } from 'mongoose';

const cvSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    profilePicture: { type: String },
  },
  workExperience: [
    {
      jobTitle: { type: String, required: true },
      company: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  skills: [String],
  certifications: [
    {
      title: { type: String },
      issuer: { type: String },
      date: { type: Date },
    },
  ],
  projects: [
    {
      title: { type: String },
      description: { type: String },
      link: { type: String },
    },
  ],
  selectedTemplate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CV = mongoose.Schema('CV', cvSchema);

module.exports = CV;
