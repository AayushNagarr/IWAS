import React from 'react';
import { useSession } from 'next-auth/react';
import Logout from '../logout';

const Navbar = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'blue', padding: '10px', top: 0, left: 0, right: 0, zIndex: 1000, width: '100%' }}>
      {/* Your navbar content here */}
      <nav>
        <h1>IWAS</h1>
      </nav>

      {/* Wrap children within the navbar */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {React.Children.map(children, child => (
          <div style={{ marginLeft: '20px', border: '1px solid #ccc', padding: '10px' }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
