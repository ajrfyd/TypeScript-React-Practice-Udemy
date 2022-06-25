import { useState, useEffect, useRef } from "react";
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugins";


const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }

  const onClick = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if(!ref.current) return;

    // esbuild.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // }).then(result => setCode(result.code));

    esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: 'window'
      }
    }).then(result => {
      setCode(result.outputFiles[0].text);
      ref.current = result;
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

  console.log(ref.current)
  return (
    <form onSubmit={onClick}>
      <textarea value={input} id="" cols={30} rows={30} onChange={e => setInput(e.target.value)}>
      </textarea>
      {/* <input type="text" value={input} onChange={e => setInput(e.target.value)}/> */}
      <div>
        <button>
          Submit
        </button>
      </div>
      <pre>{code}</pre>
    </form>
  )
}

export default App;