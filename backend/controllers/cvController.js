import CV from '../models/cvModel.js';

// ✅ Save a CV (Create or Update)
export const saveCV = async (req, res) => {
  try {
    const { user, selectedTemplate, ...cvData } = req.body;

    // ✅ Check if a CV already exists for the user and template
    let existingCV = await CV.findOne({ user, selectedTemplate });

    if (existingCV) {
      // ✅ Update existing CV
      existingCV = await CV.findOneAndUpdate(
        { user, selectedTemplate },
        { $set: cvData },
        { new: true, runValidators: true }
      );
      return res.status(200).json(existingCV);
    }

    // ✅ Create a new CV entry
    const newCV = new CV({ user, selectedTemplate, ...cvData });
    await newCV.save();

    return res.status(201).json(newCV);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to save CV', details: error.message });
  }
};

// ✅ Get all CVs for a user
export const getUserCVs = async (req, res) => {
  try {
    const userId = req.user.id;
    const cvs = await CV.find({ user: userId }).populate('selectedTemplate');
    res.status(200).json(cvs);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch CVs', details: error.message });
  }
};

// ✅ Delete a CV
export const deleteCV = async (req, res) => {
  try {
    const { cvId } = req.params;
    await CV.findByIdAndDelete(cvId);
    res.status(200).json({ message: 'CV deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to delete CV', details: error.message });
  }
};
