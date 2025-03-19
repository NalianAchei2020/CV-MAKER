'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Palette,
  Type,
  Image,
  FileJson,
  Code,
  Info,
  Plus,
  Trash2,
} from 'lucide-react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import TemplatePreview from './TemplatePreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Template } from '@/lib/types';
import { useDispatch } from '@/redux/store';
import { createTemplate } from '@/redux/templateSlice';

// ✅ Default placeholder values
const DEFAULT_DATA = {
  fullName: 'John Doe',
  jobTitle: 'Software Engineer',
  linkedin_profile: 'linkedin.com/in/johndoe',
  email: 'john.doe@example.com',
  phone: '(123) 456-7890',
  location: 'New York, NY',
  website: 'johndoe.com',
  summary:
    'Experienced software engineer with a passion for creating elegant solutions to complex problems.',
  skills: ['JavaScript', 'React', 'Node.js'],
  languages: [
    {
      language: 'English',
      proficiency: 'Native',
    },
    {
      language: 'Spanish',
      proficiency: 'Intermediate',
    },
  ],
  experiences: [
    {
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Company',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description:
        "Led development of key features for the company's flagship product.",
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      location: 'Boston, MA',
      startDate: 'Sep 2012',
      endDate: 'May 2016',
      description:
        'Graduated with honors. Specialized in software engineering.',
    },
  ],
  projects: [
    {
      title: 'Portfolio Website',
      url: 'https://myportfolio.com',
      description: 'Personal portfolio website built with React and Next.js.',
    },
  ],
};

// ✅ Default CV HTML template
const DEFAULT_CV_STRUCTURE = {
  html: `
    <div class="cv-container">
      <div class="header">
        <h1>{{fullName}}</h1>
        <p>{{jobTitle}}</p>
      </div>
      <div class="contact">
        <p>Email: {{email}}</p>
        <p>Phone: {{phone}}</p>
        <p>Location: {{location}}</p>
        <p>Website: {{website}}</p>
        <p>LinkedIn: {{linkedin_profile}}</p>
      </div>
      <div class="section">
        <h2>Summary</h2>
        <p>{{summary}}</p>
      </div>
      <div class="section">
        <h2>Work Experience</h2>
        <div class="experience-item">
          <h3>{{experiences.0.jobTitle}} at {{experiences.0.company}}</h3>
          <p>{{experiences.0.location}} | {{experiences.0.startDate}} - {{experiences.0.endDate}}</p>
          <p>{{experiences.0.description}}</p>
        </div>
      </div>
      <div class="section">
        <h2>Education</h2>
        <div class="education-item">
          <h3>{{education.0.degree}}</h3>
          <p>{{education.0.institution}} | {{education.0.location}}</p>
          <p>{{education.0.startDate}} - {{education.0.endDate}}</p>
          <p>{{education.0.description}}</p>
        </div>
      </div>
      <div class="section">
        <h2>Skills</h2>
        <ul>
          <li>{{skills.0}}</li>
          <li>{{skills.1}}</li>
          <li>{{skills.2}}</li>
        </ul>
      </div>
      <div class="section">
        <h2>Projects</h2>
        <div class="project-item">
          <h3>{{projects.0.title}}</h3>
          <p>URL: {{projects.0.url}}</p>
          <p>{{projects.0.description}}</p>
        </div>
      </div>
      <div class="section">
        <h2>Languages</h2>
        <ul>
          <li>{{languages.0.language}} - {{languages.0.proficiency}}</li>
          <li>{{languages.1.language}} - {{languages.1.proficiency}}</li>
        </ul>
      </div>
    </div>
  `,
};

// ✅ Default CV CSS styles
const DEFAULT_CV_CSS = `
  .cv-container {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border: 2px solid #333;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.1);
  }
  .header {
    text-align: center;
    background: #333;
    color: white;
    padding: 10px;
  }
  .contact, .section {
    margin: 10px 0;
  }
  .section h2 {
    border-bottom: 2px solid #333;
    padding-bottom: 5px;
  }
  .experience-item, .education-item, .project-item {
    margin-bottom: 15px;
  }
  .experience-item h3, .education-item h3, .project-item h3 {
    margin-bottom: 5px;
  }
  ul {
    padding-left: 20px;
  }
`;
const DEFAULT_FONT_FAMILY = 'Inter, sans-serif';
const DEFAULT_FONT_COLOR = '#1e293b';
const DEFAULT_BACKGROUND_COLOR = '#f8fafc';

const TemplateForm = () => {
  const [template, setTemplate] = useState<Template>({
    name: 'My CV Template',
    description: 'A professional CV template for job applications',
    structure: DEFAULT_CV_STRUCTURE,
    cssStyles: DEFAULT_CV_CSS,
    defaultData: DEFAULT_DATA,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    fontFamily: DEFAULT_FONT_FAMILY,
    fontColor: DEFAULT_FONT_COLOR,
    isDefault: false,
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [dataTab, setDataTab] = useState('personal');

  const renderPreviewContent = () => {
    let renderedHtml = template.structure.html;

    // Replace placeholders with actual data
    Object.entries(template.defaultData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        renderedHtml = renderedHtml.replace(
          new RegExp(`{{${key}}}`, 'g'),
          value
        );
      } else if (Array.isArray(value)) {
        // Handle arrays like skills, experiences, etc.
        value.forEach((item, index) => {
          if (typeof item === 'string') {
            renderedHtml = renderedHtml.replace(
              new RegExp(`{{${key}.${index}}}`, 'g'),
              item
            );
          } else if (typeof item === 'object') {
            // Handle nested objects like experiences[0].jobTitle
            Object.entries(item).forEach(([nestedKey, nestedValue]) => {
              if (typeof nestedValue === 'string') {
                renderedHtml = renderedHtml.replace(
                  new RegExp(`{{${key}.${index}.${nestedKey}}}`, 'g'),
                  nestedValue
                );
              }
            });
          }
        });
      }
    });

    return renderedHtml;
  };

  const handleJsonChange = (field: string, value: string) => {
    try {
      setTemplate({
        ...template,
        [field]: JSON.parse(value || '{}'),
      });
    } catch (error) {
      // Keep the previous value if JSON is invalid
      console.error('Invalid JSON:', error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setTemplate({
      ...template,
      [field]: value,
    });
  };

  const updateDefaultData = (path: string, value: any) => {
    const newData = { ...template.defaultData };
    const keys = path.split('.');

    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      const nextKey = keys[i + 1];

      // Handle array indices
      if (!isNaN(Number(nextKey))) {
        if (!Array.isArray(current[key])) {
          current[key] = [];
        }
        if (current[key].length <= Number(nextKey)) {
          // Extend array if needed
          const arrayType = keys[i + 2]
            ? typeof current[key][0]?.[keys[i + 2]]
            : typeof current[key][0];
          if (arrayType === 'object') {
            current[key][Number(nextKey)] = {};
          } else if (arrayType === 'string') {
            current[key][Number(nextKey)] = '';
          }
        }
      }

      current = current[key];
      if (current === undefined) {
        break;
      }
    }

    const lastKey = keys[keys.length - 1];
    if (current !== undefined) {
      current[lastKey] = value;
    }

    setTemplate({
      ...template,
      defaultData: newData,
    });
  };

  const addArrayItem = (path: string, template: any) => {
    const newData = { ...template.defaultData };
    const keys = path.split('.');

    let current = newData;
    for (const key of keys) {
      if (current[key] === undefined) {
        current[key] = [];
        break;
      }
      current = current[key];
    }

    if (Array.isArray(current)) {
      if (typeof current[0] === 'string') {
        current.push('');
      } else if (typeof current[0] === 'object') {
        current.push({ ...current[0] });
        // Clear values in the new object
        Object.keys(current[current.length - 1]).forEach((key) => {
          current[current.length - 1][key] = '';
        });
      }
    }

    setTemplate({
      ...template,
      defaultData: newData,
    });
  };

  const removeArrayItem = (path: string, index: number) => {
    const newData = { ...template.defaultData };
    const keys = path.split('.');

    let current = newData;
    for (const key of keys) {
      if (current[key] === undefined) {
        break;
      }
      current = current[key];
    }

    if (Array.isArray(current) && current.length > 1) {
      current.splice(index, 1);
    }

    setTemplate({
      ...template,
      defaultData: newData,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createTemplate(template));
    console.log(template);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto p-6">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Template Builder</h2>
          <p className="text-gray-600">Create and customize your template</p>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'basic'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Info
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'appearance'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('appearance')}
            >
              Appearance
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'data'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('data')}
            >
              CV Data
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'advanced'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('advanced')}
            >
              Advanced
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Type className="w-4 h-4 mr-2" />
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={template.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Info className="w-4 h-4 mr-2" />
                    Description
                  </label>
                  <textarea
                    value={template.description}
                    onChange={(e) =>
                      handleChange('description', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Palette className="w-4 h-4 mr-2" />
                    Background Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={template.backgroundColor}
                      onChange={(e) =>
                        handleChange('backgroundColor', e.target.value)
                      }
                      className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={template.backgroundColor}
                      onChange={(e) =>
                        handleChange('backgroundColor', e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Type className="w-4 h-4 mr-2" />
                    Font Family
                  </label>
                  <select
                    value={template.fontFamily}
                    onChange={(e) => handleChange('fontFamily', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Inter, sans-serif">Inter</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="Helvetica, sans-serif">Helvetica</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="'Times New Roman', serif">
                      Times New Roman
                    </option>
                    <option value="monospace">Monospace</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Palette className="w-4 h-4 mr-2" />
                    Font Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={template.fontColor}
                      onChange={(e) =>
                        handleChange('fontColor', e.target.value)
                      }
                      className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={template.fontColor}
                      onChange={(e) =>
                        handleChange('fontColor', e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CV Data Tab */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <Tabs value={dataTab} onValueChange={setDataTab}>
                  <TabsList className="grid grid-cols-5 mb-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                  </TabsList>

                  {/* Personal Info */}
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                          value={template.defaultData.fullName}
                          onChange={(e) =>
                            updateDefaultData('fullName', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input
                          value={template.defaultData.jobTitle}
                          onChange={(e) =>
                            updateDefaultData('jobTitle', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          value={template.defaultData.email}
                          onChange={(e) =>
                            updateDefaultData('email', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={template.defaultData.phone}
                          onChange={(e) =>
                            updateDefaultData('phone', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={template.defaultData.location}
                          onChange={(e) =>
                            updateDefaultData('location', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Website</Label>
                        <Input
                          value={template.defaultData.website}
                          onChange={(e) =>
                            updateDefaultData('website', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>LinkedIn Profile</Label>
                        <Input
                          value={template.defaultData.linkedin_profile}
                          onChange={(e) =>
                            updateDefaultData(
                              'linkedin_profile',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Professional Summary</Label>
                      <Textarea
                        value={template.defaultData.summary}
                        onChange={(e) =>
                          updateDefaultData('summary', e.target.value)
                        }
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Languages</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayItem('languages', template)}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Language
                        </Button>
                      </div>

                      {template.defaultData.languages.map(
                        (lang: any, index: number) => (
                          <Card key={index} className="p-4">
                            <CardContent className="p-0 space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">
                                  Language {index + 1}
                                </h4>
                                {template.defaultData.languages.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      removeArrayItem('languages', index)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Language</Label>
                                  <Input
                                    value={lang.language}
                                    onChange={(e) =>
                                      updateDefaultData(
                                        `languages.${index}.language`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Proficiency</Label>
                                  <Input
                                    value={lang.proficiency}
                                    onChange={(e) =>
                                      updateDefaultData(
                                        `languages.${index}.proficiency`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  </TabsContent>

                  {/* Work Experience */}
                  <TabsContent value="experience" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Work Experience</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('experiences', template)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Experience
                      </Button>
                    </div>

                    {template.defaultData.experiences.map(
                      (exp: any, index: number) => (
                        <Card key={index} className="p-4">
                          <CardContent className="p-0 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">
                                Experience {index + 1}
                              </h4>
                              {template.defaultData.experiences.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeArrayItem('experiences', index)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Job Title</Label>
                                <Input
                                  value={exp.jobTitle}
                                  onChange={(e) =>
                                    updateDefaultData(
                                      `experiences.${index}.jobTitle`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) =>
                                    updateDefaultData(
                                      `experiences.${index}.company`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Location</Label>
                                <Input
                                  value={exp.location}
                                  onChange={(e) =>
                                    updateDefaultData(
                                      `experiences.${index}.location`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                  <Label>Start Date</Label>
                                  <Input
                                    value={exp.startDate}
                                    onChange={(e) =>
                                      updateDefaultData(
                                        `experiences.${index}.startDate`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>End Date</Label>
                                  <Input
                                    value={exp.endDate}
                                    onChange={(e) =>
                                      updateDefaultData(
                                        `experiences.${index}.endDate`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                value={exp.description}
                                onChange={(e) =>
                                  updateDefaultData(
                                    `experiences.${index}.description`,
                                    e.target.value
                                  )
                                }
                                className="min-h-[100px]"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )}
                  </TabsContent>

                  {/* Education */}
                  <TabsContent value="education" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Education</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('education', template)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Education
                      </Button>
                    </div>

                    {template.defaultData.education.map(
                      (edu: any, index: number) => (
                        <Card key={index} className="p-4">
                          <CardContent className="p-0 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">
                                Education {index + 1}
                              </h4>
                              {template.defaultData.education.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeArrayItem('education', index)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) =>
                                    updateDefaultData(
                                      `education.${index}.degree`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Institution</Label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) =>
                                    updateDefaultData(
                                      `education.${index}.institution`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Location</Label>
                                <Input
                                  value={edu.location}
                                  onChange={(e) =>
                                    updateDefaultData(
                                      `education.${index}.location`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                  <Label>Start Date</Label>
                                  <Input
                                    value={edu.startDate}
                                    onChange={(e) =>
                                      updateDefaultData(
                                        `education.${index}.startDate`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>End Date</Label>
                                  <Input
                                    value={edu.endDate}
                                    onChange={(e) =>
                                      updateDefaultData(
                                        `education.${index}.endDate`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                value={edu.description}
                                onChange={(e) =>
                                  updateDefaultData(
                                    `education.${index}.description`,
                                    e.target.value
                                  )
                                }
                                className="min-h-[100px]"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )}
                  </TabsContent>

                  {/* Skills */}
                  <TabsContent value="skills" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Skills</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('skills', template)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Skill
                      </Button>
                    </div>

                    {template.defaultData.skills.map(
                      (skill: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={skill}
                            onChange={(e) =>
                              updateDefaultData(
                                `skills.${index}`,
                                e.target.value
                              )
                            }
                            placeholder={`Skill ${index + 1}`}
                          />
                          {template.defaultData.skills.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeArrayItem('skills', index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      )
                    )}
                  </TabsContent>

                  {/* Projects */}
                  <TabsContent value="projects" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Projects</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('projects', template)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Project
                      </Button>
                    </div>

                    {template.defaultData.projects.map(
                      (project: any, index: number) => (
                        <Card key={index} className="p-4">
                          <CardContent className="p-0 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">
                                Project {index + 1}
                              </h4>
                              {template.defaultData.projects.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeArrayItem('projects', index)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                  value={project.title}
                                  onChange={(e) =>
                                    updateDefaultData(
                                      `projects.${index}.title`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>URL</Label>
                                <Input
                                  value={project.url}
                                  onChange={(e) =>
                                    updateDefaultData(
                                      `projects.${index}.url`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                  value={project.description}
                                  onChange={(e) =>
                                    updateDefaultData(
                                      `projects.${index}.description`,
                                      e.target.value
                                    )
                                  }
                                  className="min-h-[100px]"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FileJson className="w-4 h-4 mr-2" />
                    Structure (HTML)
                  </label>
                  <CodeEditor
                    value={template.structure.html}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        structure: {
                          ...template.structure,
                          html: e.target.value,
                        },
                      })
                    }
                    padding={15}
                    language="html"
                    style={{
                      backgroundColor: '#f5f5f5',
                      height: '300px',
                      overflow: 'auto',
                      fontFamily:
                        'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Code className="w-4 h-4 mr-2" />
                    CSS Styles
                  </label>
                  <CodeEditor
                    value={template.cssStyles}
                    onChange={(e) => handleChange('cssStyles', e.target.value)}
                    padding={15}
                    language="css"
                    style={{
                      backgroundColor: '#f5f5f5',
                      height: '300px',
                      overflow: 'auto',
                      fontFamily:
                        'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FileJson className="w-4 h-4 mr-2" />
                    Default Data (JSON)
                  </label>
                  <CodeEditor
                    value={JSON.stringify(template.defaultData, null, 2)}
                    onChange={(e) =>
                      handleJsonChange('defaultData', e.target.value)
                    }
                    padding={15}
                    language="json"
                    style={{
                      backgroundColor: '#f5f5f5',
                      height: '300px',
                      overflow: 'auto',
                      fontSize: '15px',
                      fontFamily:
                        'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm min-h-[120px]"
                  />
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button type="submit" className="w-full">
                Create Template
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Preview Section */}
      <TemplatePreview
        name={template.name}
        backgroundColor={template.backgroundColor}
        fontFamily={template.fontFamily}
        fontColor={template.fontColor}
        structure={template.structure}
        defaultData={template.defaultData}
        cssStyles={template.cssStyles}
        renderedHtml={renderPreviewContent()}
      />
    </div>
  );
};

export default TemplateForm;
