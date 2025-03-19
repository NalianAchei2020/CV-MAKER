// Define the type for the template data
interface TemplateData {
  fullName: string;
  jobTitle: string;
  linkedin_profile: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  skills: string[];
  languages: { language: string; proficiency: string }[];
  experiences: {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  projects: {
    title: string;
    url: string;
    description: string;
  }[];
  [key: string]: any;
}

interface Template {
  name: string;
  description: string;
  structure: {
    html: string;
    [key: string]: any;
  };
  cssStyles: string;
  defaultData: TemplateData;
  backgroundColor: string;
  fontFamily: string;
  fontColor: string;
  isDefault: boolean;
}

export type { Template, TemplateData };
