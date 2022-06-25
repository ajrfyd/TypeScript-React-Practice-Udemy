import { useState, useEffect, useRef } from "react";
import * as esbuild from 'esbuild-wasm';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
    ref.current = true;
    console.log(ref.current);
  }

  const onClick = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!ref.current) return;

    esbuild.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    }).then(result => setCode(result.code));
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