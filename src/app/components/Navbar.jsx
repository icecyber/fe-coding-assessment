import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-blue-600 py-6 shadow-md">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-white text-4xl font-extrabold text-center mb-1">
          Todo List
        </h1>
        <p className="text-blue-200 text-center text-lg">
          Stay organized and get things done
        </p>
      </div>
    </header>
  );
};

export default Navbar;
