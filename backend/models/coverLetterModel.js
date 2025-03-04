import mongoose from 'mongoose';

const coverLetterSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Template name
  description: { type: String }, // Short description
  previewImage: { type: String }, // Optional preview image
  structure: { type: mongoose.Schema.Types.Mixed, required: true }, // JSON-based structure
  cssStyles: { type: String }, // CSS for styling
  defaultData: { type: mongoose.Schema.Types.Mixed }, // Default placeholders
  createdAt: { type: Date, default: Date.now },
});

const CoverLetter = mongoose.model('CoverLetter', coverLetterSchema);
export default CoverLetter;
