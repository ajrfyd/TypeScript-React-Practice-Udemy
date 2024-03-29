import { useState, useEffect, useRef } from "react";
import CodeEditor from '../components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import Preview from '../components/preview';
import bundle from '../bundler/index';
import Resizable from "./resizable";

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [err, setErr] = useState('');
  const [code, setCode] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(async () => {
      const outPut = await bundle(input);
      setCode(outPut.code);
      setErr(outPut.err);
    }, 750)

    return () => {
      clearTimeout(timer);
    }
  }, [input])

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
    // const output = await bundle(input);
    // setCode(output.code);
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
    <Resizable direction="ver">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="hor">
          <CodeEditor 
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        {/* <div>
          <button onClick={onClick}>
            Submit
          </button>
        </div> */}
        <Preview code={code} err={err}/>
      </div>
    </Resizable>
  )
}

export default CodeCell;