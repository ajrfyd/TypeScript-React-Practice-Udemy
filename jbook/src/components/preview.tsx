import { useRef, useEffect } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  err: string;
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
        const handleError = (e) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red" ><h4>Runtime Error</h4>' + e + '</div>'
        };

        window.addEventListener('error', (e) => {
          e.preventDefault();
          handleError(e.error);
        });

        window.addEventListener('message', (e) => {
          try {
            eval(e.data);
          } catch(e) {
            handleError(e);
          }
        }, false);
      </script>
    </body>
  </html>
  `

const Preview = ({ code, err }: PreviewProps) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);

  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe ref={iframe} srcDoc={html} sandbox='allow-scripts' title='code preview' />
      {
        err && <div className='preview-error'>{err}</div>
      }
    </div>
  )
};

export default Preview;
