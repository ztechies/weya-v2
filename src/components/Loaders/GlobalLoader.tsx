import React from 'react';

const GlobalLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
    <svg aria-hidden="true" role="status" className="animate-spin h-12 w-12 text-green-500" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 2.5A9.5 9.5 0 1 0 21.5 12a9.5 9.5 0 0 0-9.5-9.5zm0 17a7.5 7.5 0 1 1 7.5-7.5h-2a5.5 5.5 0 1 0-5.5 5.5V20z" />
    </svg>
  </div>
);

export default GlobalLoader;
