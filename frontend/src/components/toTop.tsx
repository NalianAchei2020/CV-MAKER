import React from 'react';

const ToTop = () => {
    return (
        <div>
            <div className="fixed right-8 bottom-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-xs font-medium text-gray-600 rotate-90">
              SCROLL TOP
            </div>
          </button>
        </div>
        </div>
    );
}

export default ToTop;
