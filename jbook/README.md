### esbuild-wasm

> node-modules > esbuild-wasm > esbuild.wasm파일을 public 폴더에 복사
esbuild.startService는 이제 쓰이지 않는다.
대신 esbuild.initialize({ worker: true, wasmURL: '/esbuild.wasm' })으로 초기화 한다. 
리턴값은 없다. 