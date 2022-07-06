import { useRef, useEffect } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
};

const html = `
  <html>
    <head>
      <style>
        html { background-color: white; }
      </style>
    </head>
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

const Preview = ({ code }: PreviewProps) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    iframe.current.contentWindow.postMessage(code, '*');

  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe ref={iframe} srcDoc={html} sandbox='allow-scripts' title='code preview' />
    </div>
  )
};

export default Preview;
