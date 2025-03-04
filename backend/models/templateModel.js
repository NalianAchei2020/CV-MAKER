import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  previewImage: { type: String },
  structure: { type: mongoose.Schema.Types.Mixed, required: true }, // ✅ Store template as JSON
  cssStyles: { type: String }, // ✅ Store CSS styles separately
  defaultData: { type: mongoose.Schema.Types.Mixed }, // ✅ Store default placeholders
  createdAt: { type: Date, default: Date.now },
});

const Template = mongoose.model('Template', templateSchema);
export default Template;
