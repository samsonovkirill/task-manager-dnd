import React from 'react';
import cn from 'classnames';
import './styles.css';

export const Container = ({ children, innerRef, snapshot, ...props }) => (
  <div 
    className={cn('wrapper', {
      'wrapper-drag-over': snapshot.isDraggingOver
    })}
    ref={innerRef} 
    {...props}
  >
    {children}
  </div>
);

export const Item = ({ children, innerRef, snapshot, ...props }) => (
  <div 
    className={cn('item', {
      'item-dragging': snapshot.isDragging
    })} 
    ref={innerRef} 
    {...props}
  >
    {children}
  </div>
);

export const Handle = (props) => (
  <div className="handle" {...props}/>
);