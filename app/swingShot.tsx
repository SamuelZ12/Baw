// CircleSwingShot.tsx
import React, { useState, useRef } from 'react';

const CircleSwingShot: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 150, y: 300 });
  const circleRef = useRef<HTMLDivElement>(null);

  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const drag = (e: React.MouseEvent) => {
    if (isDragging && circleRef.current) {
      const rect = circleRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      setPosition((prevPosition) => ({
        x: prevPosition.x + offsetX,
        y: prevPosition.y + offsetY,
      }));
    }
  };

  const release = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={circleRef}
      style={{
        backgroundColor: 'purple',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        position: 'absolute',
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={startDragging}
      onMouseMove={drag}
      onMouseUp={release}
    ></div>
  );
};

export default CircleSwingShot;
