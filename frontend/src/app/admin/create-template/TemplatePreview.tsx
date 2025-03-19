import React from 'react';

// Define the props interface
interface TemplatePreviewProps {
  name: string;
  backgroundColor: string;
  fontFamily: string;
  fontColor: string;
  structure: {
    html: string;
  };
  defaultData: any;
  cssStyles: string;
  renderedHtml: string;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  name,
  backgroundColor,
  fontFamily,
  fontColor,
  structure,
  defaultData,
  cssStyles,
  renderedHtml,
}) => {
  return (
    <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Live Preview</h2>
        <p className="text-gray-600">See how your template will look</p>
      </div>
      <div className="py-6 px-2">
        <div
          className="border border-gray-200 rounded-lg py-6 px-2 mb-4 overflow-auto"
          style={{
            backgroundColor,
            fontFamily,
            color: fontColor,
            maxHeight: '600px',
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
          <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        </div>
        <div className="bg-gray-50 rounded-lg py-4">
          <h3 className="font-medium text-gray-700 mb-2">Template Details</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Name:</div>
            <div className="font-medium">{name || 'Untitled'}</div>
            <div className="text-gray-500">Font:</div>
            <div className="font-medium">{fontFamily.split(',')[0]}</div>
            <div className="text-gray-500">Colors:</div>
            <div className="flex items-center space-x-2">
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor }}
              ></span>
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor: fontColor }}
              ></span>
            </div>
            <div className="text-gray-500">Data Fields:</div>
            <div className="font-medium">
              {Object.keys(defaultData).length} fields
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
