import MonacoEditor,{ Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

export type OnMount = (
  editor: monaco.editor.IStandaloneCodeEditor,
  monaco: Monaco,
) => void;

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorDidMount = (getValue:() => string) => {
    console.log(getValue());
  };

  const handleEditorDidMount = (onChange: OnMount) => {
    console.log(onChange);
  }

  return <MonacoEditor 
      // editorDidMount={onEditorDidMount}
      onMount={() => handleEditorDidMount}
      value={initialValue}
      theme='vs-dark' 
      height='500px' 
      language='javascript'
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />;
};

export default CodeEditor;