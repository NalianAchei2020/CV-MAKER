interface CVData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    linkedin_profile?: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    summary: string;
  };
  workExperience: {
    experiences: {
      jobTitle: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      description: string;
    }[];
  };
  education: {
    education: {
      degree: string;
      institution: string;
      location: string;
      startDate: string;
      endDate: string;
      description?: string;
    }[];
  };
  projects: {
    projects: {
      title: string;
      url?: string;
      description: string;
    }[];
  };
  languages: {
    languages: {
      language: string;
      proficiency: string;
    }[];
  };
  skills: {
    skills: string[];
  };
}

export type { CVData };
