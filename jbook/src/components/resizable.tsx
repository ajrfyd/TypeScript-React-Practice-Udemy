import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import './resizable.css';

interface ResizableProps {
  direction: 'hor' | 'ver';
  children: React.ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * .75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        if(window.innerWidth * .75 < width) {
          setWidth(window.innerWidth * .75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    
    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [width]);

  if(direction === 'hor') {
    resizableProps = {
      className: 'resize-hor',
      minConstraints: [innerWidth * .2, Infinity],
      maxConstraints: [innerHeight * .75, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * .9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s']
    };
  }

  return (
    <ResizableBox 
      // width={Infinity} 
      // height={300}
      // resizeHandles={['s']}
      // maxConstraints={[Infinity, window.innerHeight * .9]}
      // minConstraints={[Infinity, 24]}
      {...resizableProps}
    >
      {children}
    </ResizableBox>
  )
}

export default Resizable;