import { useState, useEffect, useRef } from "react";
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugins";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from './components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();
  const iframe = useRef<any>();

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      // wasmURL: '/esbuild.wasm'
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.47/esbuild.wasm'
    })
  }

  

  const onClick = async () => {
    // const onClick = async () => {
    // e.preventDefault();
    // if(!ref.current) return;

    // esbuild.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // }).then(result => setCode(result.code));

    iframe.current.srcdoc = html;

    esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: 'window'
      }
    }).then(result => {
      setCode(result.outputFiles[0].text);
      ref.current = result.outputFiles[0].text;

      iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
      // try {
      //   eval(result.outputFiles[0].text);
      // } catch(e) {
      //   alert(e);
      // }
    });
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      startService()
    }

    return () => {
      mounted = false;
    }
  }, [])

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (e) => {
          try {
            eval(e.data);
          } catch(e) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red" ><h4>Runtime Error</h4>' + e + '</div>'
            console.error(e);
          }
        }, false);
      </script>
    </body>
  </html>
  `
  
  // console.log(input);
  return (
    // <form onSubmit={onClick}>
    <div>
      <CodeEditor 
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <textarea 
        value={input} 
        id="" 
        cols={50} 
        rows={10} 
        onChange={e => {
          // onClick(e.target.value);
          setInput(e.target.value);
        }}
      >
      </textarea>
      {/* <input type="text" value={input} onChange={e => setInput(e.target.value)}/> */}
      <div>
        <button onClick={onClick}>
          Submit
        </button>
      </div>
      {/* <pre>{code}</pre> */}
      <iframe ref={iframe} srcDoc={html} sandbox='allow-scripts' title='code preview'/>
      {/* <iframe src='/test.html'/> */}
    </div>
    // </form>
  )
}

export default App;