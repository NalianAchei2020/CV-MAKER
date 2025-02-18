import React from 'react';
import Editor from '@monaco-editor/react';

interface TextEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  height?: string | number;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  language = 'plaintext',
  height = '300px',
}) => {
  return (
    <Editor
      height={height}
      defaultLanguage={language}
      value={value}
      onChange={onChange}
      theme="vs-light"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        lineNumbers: 'on',
        folding: true,
        lineHeight: 21,
        automaticLayout: true,
      }}
    />
  );
};

export default TextEditor;
