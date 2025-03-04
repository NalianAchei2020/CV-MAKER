import CoverLetter from '../models/coverLetterModel.js';

// ✅ Get all cover letters
export const getAllCoverLetters = async (req, res) => {
  try {
    const coverLetters = await CoverLetter.find();
    res.status(200).json(coverLetters);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// ✅ Get a single cover letter by ID
export const getCoverLetterById = async (req, res) => {
  try {
    const coverLetter = await CoverLetter.findById(req.params.id);
    if (!coverLetter)
      return res.status(404).json({ error: 'Cover Letter not found.' });
    res.status(200).json(coverLetter);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// ✅ Create a new cover letter (Admin only)
export const createCoverLetter = async (req, res) => {
  try {
    const {
      name,
      description,
      previewImage,
      structure,
      cssStyles,
      defaultData,
    } = req.body;

    if (!name || !structure) {
      return res
        .status(400)
        .json({ error: 'Cover letter name and structure are required.' });
    }

    const newCoverLetter = new CoverLetter({
      name,
      description,
      previewImage,
      structure,
      cssStyles,
      defaultData,
    });
    await newCoverLetter.save();

    res.status(201).json(newCoverLetter);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// ✅ Update cover letter (Admin only)
export const updateCoverLetter = async (req, res) => {
  try {
    const {
      name,
      description,
      previewImage,
      structure,
      cssStyles,
      defaultData,
    } = req.body;
    const coverLetter = await CoverLetter.findById(req.params.id);

    if (!coverLetter)
      return res.status(404).json({ error: 'Cover Letter not found.' });

    coverLetter.name = name || coverLetter.name;
    coverLetter.description = description || coverLetter.description;
    coverLetter.previewImage = previewImage || coverLetter.previewImage;
    coverLetter.structure = structure || coverLetter.structure;
    coverLetter.cssStyles = cssStyles || coverLetter.cssStyles;
    coverLetter.defaultData = defaultData || coverLetter.defaultData;

    await coverLetter.save();
    res.status(200).json(coverLetter);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// ✅ Delete cover letter (Admin only)
export const deleteCoverLetter = async (req, res) => {
  try {
    const coverLetter = await CoverLetter.findById(req.params.id);
    if (!coverLetter)
      return res.status(404).json({ error: 'Cover Letter not found.' });

    await coverLetter.deleteOne();
    res.status(200).json({ message: 'Cover Letter deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};
