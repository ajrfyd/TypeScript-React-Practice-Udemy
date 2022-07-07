import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugins";
import { fetchPlugin } from "../plugins/fetch-plugin";

let result: any;

const bundle = async (rawCode: string) => {
  if(!result) {
    await esbuild.initialize({
      worker: true,
      // wasmURL: '/esbuild.wasm'
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.47/esbuild.wasm'
    });
  };

  try {
    result = await esbuild.build({
      entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [
          unpkgPathPlugin(),
          fetchPlugin(rawCode)
        ],
        define: {
          "process.env.NODE_ENV": '"production"',
          global: 'window'
        }
    })

    return {
      code: result.outputFiles[0].text,
      err: ''
    }
  } catch(e: any) {
    return {
      code: '',
      err: e.message
    }
  }

};

export default bundle;