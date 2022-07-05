import { useState, useEffect, useRef } from "react";
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugins";
import { fetchPlugin } from "../plugins/fetch-plugin";
import CodeEditor from '../components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from '../components/preview';
import bundle from '../bundler/index';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  

  // const startService = async () => {
  //   await esbuild.initialize({
  //     worker: true,
  //     // wasmURL: '/esbuild.wasm'
  //     wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.47/esbuild.wasm'
  //   })
  // }


  const onClick = async () => {
    // esbuild.build({
    //   entryPoints: ['index.js'],
    //   bundle: true,
    //   write: false,
    //   plugins: [
    //     unpkgPathPlugin(),
    //     fetchPlugin(input)
    //   ],
    //   define: {
    //     "process.env.NODE_ENV": '"production"',
    //     global: 'window'
    //   }
    // }).then(result => {
    //   setCode(result.outputFiles[0].text);
    // });
    const output = await bundle(input);
    setCode(output);
  }

  // useEffect(() => {
  //   let mounted = true;
  //   if(mounted) {
  //     startService()
  //   }

  //   return () => {
  //     mounted = false;
  //   }
  // }, [])

  
  return (
    <div>
      <CodeEditor 
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>
          Submit
        </button>
      </div>
      <Preview code={code}/>
    </div>
  )
}

export default CodeCell;