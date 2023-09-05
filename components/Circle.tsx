import React from 'react';

const Circle = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <div style={{
          backgroundColor: 'purple',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
        }}></div>
      </div>
  )
}

export default Circle