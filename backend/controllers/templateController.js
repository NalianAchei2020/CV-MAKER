import Template from '../models/templateModel.js';

// ✅ Get all templates
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// ✅ Get a single template by ID
// ✅ Get template by ID (with validation)
export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate if `id` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid template ID format.' });
    }

    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found.' });
    }

    res.status(200).json(template);
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};
// ✅ Create a new template (Admin only)
export const createTemplate = async (req, res) => {
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
        .json({ error: 'Template name and structure are required.' });
    }

    const newTemplate = new Template({
      name,
      description,
      previewImage,
      structure,
      cssStyles,
      defaultData,
    });
    await newTemplate.save();

    res.status(201).json({
      message: 'Template created successfully!',
      template: newTemplate,
    });
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// ✅ Update an existing template (Admin only)
export const updateTemplate = async (req, res) => {
  try {
    const {
      name,
      description,
      previewImage,
      structure,
      cssStyles,
      defaultData,
    } = req.body;
    const template = await Template.findById(req.params.id);

    if (!template)
      return res.status(404).json({ error: 'Template not found.' });

    template.name = name || template.name;
    template.description = description || template.description;
    template.previewImage = previewImage || template.previewImage;
    template.structure = structure || template.structure;
    template.cssStyles = cssStyles || template.cssStyles;
    template.defaultData = defaultData || template.defaultData;

    await template.save();
    res
      .status(200)
      .json({ message: 'Template updated successfully!', template });
  } catch (error) {
    console.error(`Error updating template (ID: ${req.params.id}):`, error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// ✅ Delete a template (Admin only)
export const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template)
      return res.status(404).json({ error: 'Template not found.' });

    await template.deleteOne();
    res.status(200).json({ message: 'Template deleted successfully.' });
  } catch (error) {
    console.error(`Error deleting template (ID: ${req.params.id}):`, error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// ✅ Live Update template JSON & CSS (Admin Only)
export const updateTemplateLive = async (req, res) => {
  try {
    const { structure, cssStyles } = req.body;
    const template = await Template.findById(req.params.id);

    if (!template)
      return res.status(404).json({ error: 'Template not found.' });

    template.structure = structure || template.structure;
    template.cssStyles = cssStyles || template.cssStyles;

    await template.save();
    res
      .status(200)
      .json({ message: 'Template updated successfully!', template });
  } catch (error) {
    console.error(
      `Error updating template (ID: ${req.params.id}) live:`,
      error
    );
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};
