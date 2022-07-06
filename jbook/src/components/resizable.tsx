import React from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import './resizable.css';

interface ResizableProps {
  direction: 'hor' | 'ver';
  children: React.ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
  let resizableProps: ResizableBoxProps;

  if(direction === 'hor') {
    resizableProps = {
      className: 'resize-hor',
      minConstraints: [window.innerWidth * .2, Infinity],
      maxConstraints: [window.innerHeight * .75, Infinity],
      height: Infinity,
      width: window.innerWidth * .75,
      resizeHandles: ['e']
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * .9],
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