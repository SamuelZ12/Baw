import React, { useState } from 'react';
import Circle from '../components/circle'; // Import the Circle component from circle.tsx

const SwingShotCircle: React.FC = () => {
  const [position, setPosition] = useState({ x: 150, y: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [initialClick, setInitialClick] = useState({ x: 0, y: 0 });

  // ...

const circleStyle: React.CSSProperties = {
  backgroundColor: 'purple',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  position: 'absolute',
  transform: `translate(${position.x}px, ${position.y}px)`,
  cursor: isDragging ? 'grabbing' : 'grab',
};

  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
    setInitialClick({ x: e.clientX, y: e.clientY });
  };

  const endDragging = () => {
    if (isDragging) {
      setIsDragging(false);

      // Calculate the velocity based on the drag distance
      const dx = initialClick.x - position.x;
      const dy = initialClick.y - position.y;
      setVelocity({ x: -dx / 10, y: -dy / 10 }); // Adjust the divisor for velocity control
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      // Move the circle along with the mouse while dragging
      const dx = e.clientX - initialClick.x;
      const dy = e.clientY - initialClick.y;
      setPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
      setInitialClick({ x: e.clientX, y: e.clientY });
    }
  };

  const updatePosition = () => {
    if (!isDragging) {
      setPosition((prevPosition) => ({
        x: prevPosition.x + velocity.x,
        y: prevPosition.y + velocity.y,
      }));

      // Apply friction (deceleration) gradually
      setVelocity((prevVelocity) => ({
        x: prevVelocity.x * 0.98, // Adjust the friction coefficient as needed
        y: prevVelocity.y * 0.98,
      }));
    }
    requestAnimationFrame(updatePosition);
  };

  // Start the animation loop
  updatePosition();

  return (
    <div>
      <Circle /> {/* Use the Circle component */}
      <div
        style={circleStyle}
        onMouseDown={startDragging}
        onMouseUp={endDragging}
        onMouseMove={handleMouseMove}
      ></div>
    </div>
  );

export default SwingShotCircle;
