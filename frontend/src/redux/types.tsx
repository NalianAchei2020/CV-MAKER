import { TemplateData } from '@/lib/types';

interface ReduxTemplate {
  _id: string;
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

export type { ReduxTemplate };
