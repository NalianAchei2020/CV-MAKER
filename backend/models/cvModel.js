import mongoose, { Schema } from 'mongoose';

const cvSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    personalInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      address: { type: String },
      profilePicture: { type: String },
    },
    job_title: { type: String, required: true },
    summary: { type: String, required: true },

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
    languages: [
      {
        language: { type: String },
        level: { type: String },
      },
    ],
    selectedTemplate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    otherFields: [
      {
        fieldName: { type: String },
        fieldValue: { type: Schema.Types.Mixed },
      },
    ],
  },
  { timestamps: true } 
);

const CV = mongoose.model('CV', cvSchema);
export default CV;
