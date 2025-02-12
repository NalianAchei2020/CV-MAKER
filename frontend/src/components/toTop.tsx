'use client';
import React from 'react';

const ToTop = () => {
  return (
    
      <div className="fixed right-8 bottom-8 z-10">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="text-xs font-bold text-black-900 rotate-90">
            SCROLL TOP
          </div>
        </button>
      </div>

  );
};

export default ToTop;
