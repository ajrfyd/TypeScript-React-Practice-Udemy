import * as esbuild from 'esbuild-wasm';


export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // handle root entry file if index.js
      build.onResolve({ filter: /(^index\.js$)/}, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // handle relative path in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return { namespace: 'a', path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href }
      })

      // handle main file of a module;
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // console.log('%conResolve', 'color:red', args);
        // if(args.path === 'index.js') {
        //   return { path: args.path, namespace: 'a' };
        // } 

        // if(args.path.includes('./') || args.path.includes('../')) {
        //   return {
        //     namespace: 'a',
        //     path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        //   };
        // }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };

        // else if(args.path === 'tiny-test-pkg') {
        //   return { path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js', namespace: 'a' }
        // }
      });
    },
  };
};
