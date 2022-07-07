import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import { useSelector } from 'react-redux';
import { RootState } from './state/reducers';

const App = () => {
  const { cells } = useSelector((state: RootState) => state);
  console.log(cells);

  return (
    <>
      {/* <CodeCell /> */}
      <TextEditor />
    </>
    )
};

export default App;



// import { useState, useEffect, useRef } from "react";
// import * as esbuild from 'esbuild-wasm';
// import { unpkgPathPlugin } from "./plugins/unpkg-path-plugins";
// import { fetchPlugin } from "./plugins/fetch-plugin";
// import CodeEditor from './components/code-editor';
// import 'bulmaswatch/superhero/bulmaswatch.min.css';
// import Preview from './components/preview';

// const App = () => {
//   const [input, setInput] = useState('');
//   const [code, setCode] = useState('');

//   const startService = async () => {
//     await esbuild.initialize({
//       worker: true,
//       // wasmURL: '/esbuild.wasm'
//       wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.47/esbuild.wasm'
//     })
//   }

  

//   const onClick = async () => {
//     // const onClick = async () => {
//     // e.preventDefault();
//     // if(!ref.current) return;

//     // esbuild.transform(input, {
//     //   loader: 'jsx',
//     //   target: 'es2015',
//     // }).then(result => setCode(result.code));


//     esbuild.build({
//       entryPoints: ['index.js'],
//       bundle: true,
//       write: false,
//       plugins: [
//         unpkgPathPlugin(),
//         fetchPlugin(input)
//       ],
//       define: {
//         "process.env.NODE_ENV": '"production"',
//         global: 'window'
//       }
//     }).then(result => {
//       setCode(result.outputFiles[0].text);
//       // ref.current = result.outputFiles[0].text;

//       // try {
//       //   eval(result.outputFiles[0].text);
//       // } catch(e) {
//       //   alert(e);
//       // }
//     });
//   }

//   useEffect(() => {
//     let mounted = true;
//     if(mounted) {
//       startService()
//     }

//     return () => {
//       mounted = false;
//     }
//   }, [])

  
  
//   // console.log(input);
//   return (
//     // <form onSubmit={onClick}>
//     <div>
//       <CodeEditor 
//         initialValue="const a = 1;"
//         onChange={(value) => setInput(value)}
//       />
//       {/* <textarea 
//         value={input} 
//         id="" 
//         cols={50} 
//         rows={10} 
//         onChange={e => {
//           // onClick(e.target.value);
//           setInput(e.target.value);
//         }}
//       >
//       </textarea> */}
//       {/* <input type="text" value={input} onChange={e => setInput(e.target.value)}/> */}
//       <div>
//         <button onClick={onClick}>
//           Submit
//         </button>
//       </div>
//       {/* <pre>{code}</pre> */}
//       {/* <iframe /> */}
//       {/* <iframe src='/test.html'/> */}
//       <Preview code={code}/>
//     </div>
//     // </form>
//   )
// }

// export default App;