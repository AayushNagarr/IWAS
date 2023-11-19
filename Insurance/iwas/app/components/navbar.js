import React from 'react';

const Navbar = ({ children }) => {
  return (
    <div>
      {/* Your navbar content here */}
      <nav style={{ background: 'lightblue', padding: '10px' }}>
        <h1>My Navbar</h1>
      </nav>

      {/* Wrap children within the navbar */}
      <div style={{ padding: '20px' }}>
        {React.Children.map(children, child => (
          <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
