import { useRef } from 'react';
import MonacoEditor,{ Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import './syntax.css';


interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

export type OnMount = (
  editor: monaco.editor.IStandaloneCodeEditor,
  monaco: Monaco,
) => void;

export type OnChange = (
  value: string | undefined,
  ev: monaco.editor.IModelContentChangedEvent,
) => void;



const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();
  
  // console.log(codeShift);
  // console.log(traverse);

  const activateMonacoJSXHighlighter: OnMount = async (monacoEditor, monaco) => {
    // monaco-jsx-highlighter depends on these in addition to Monaco and an instance of a Monaco Editor.
    // const { default: traverse } = await import("@babel/traverse");
    // const { parse } = await import("@babel/parser");
    // >>> The star of the show =P >>>
    // const { default: Highlighter, JSXTypes } = await import(
    //   "monaco-jsx-highlighter" // Note: there is a polyfilled version alongside the regular version.
    // ); // For example, starting with 2.0.2, 2.0.2-polyfilled is also available.

    //! Instantiate the highlighter
    // const highlighter = new Highlighter(
    //   monaco, // highlights the content of that editor via decorations
    //   parse, // obtains an AST, internally passes to parse options: {...options, sourceType: "module",plugins: ["jsx"],errorRecovery: true}
    //   // @ts-ignore
    //   traverse, // references Range and other APIs
    // //   // helps collecting the JSX expressions within the AST
    //   monacoEditor,
    // ); 

    // monacoJSXHighlighter.highlightOnDidChangeModelContent();

    // console.log(monacoJSXHighlighter)
  }

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // console.log(editor.getModel);

    editor.onDidChangeModelContent((a) => {
      // console.log(a);
    })

    activateMonacoJSXHighlighter(editor, monaco)

    // const highlighter = new Highlighter(
    //     // @ts-ignore
    //     window.monaco,
    //     // codeShift,
    //     // editor.getModel(),
    //     parse,
    //     traverse,
    //   );

  };

  const handleChange: OnChange = (value, ev) => {
    if(value !== undefined) {
      onChange(value);
      
      // const highlighter = new Highlighter(
      //   // @ts-ignore
      //   window.monaco,
      //   // codeShift,
      //   // editor.getModel(),
      //   // parse,
      //   // traverse,
      //   value
      // );
      // console.log(highlighter);

      // highlighter.highLightOnDidChangeModelContent();
    }
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();
    // format that value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    }).replace(/\n$/, '');
    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button 
        onClick={onFormatClick}
        className='button button-format is-primary is-small'
      >Format
      </button>
      <MonacoEditor 
        // editorDidMount={onEditorDidMount}
        onMount={handleEditorDidMount}
        onChange={handleChange}
        value={initialValue}
        theme='vs-dark' 
        height='100%' 
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
          // tabSize: 2,
        }}
      />
    </div>
  )
};

export default CodeEditor;

function value(value: any): OnMount {
  throw new Error('Function not implemented.');
}
