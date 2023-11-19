import React from 'react';
import { useSession } from 'next-auth/react';
import Logout from '../logout';
import {useEffect, useState} from "react"
import Link from "next/link";

const Navbar = ({ children }) => {
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(session);
    if(session){
      setUser(session.user)
    }
  }, [session]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'blue', padding: '10px', top: 0, left: 0, right: 0, zIndex: 1000, width: '100%' }}>
      {/* Your navbar content here */}
      <nav>
        <h1>{user?.username}</h1>
        <h1>IWAS</h1>
      </nav>

      {/* Wrap children within the navbar */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        
         {user && <div style={{ marginLeft: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <Link className="px-10" href="/dashboard">
              DASHBOARD
              </Link>
          </div>}
          {!user && <div style={{ marginLeft: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <Link className="px-10" href="/register">
              REGISTER
            </Link>
          </div>}
          {!user && <div style={{ marginLeft: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <Link className="px-10" href="/login">
              LOGIN
            </Link>
          </div>}
          {user && <div style={{ marginLeft: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <Logout />
          </div>}
      </div>
    </div>
  );
};

export default Navbar;
