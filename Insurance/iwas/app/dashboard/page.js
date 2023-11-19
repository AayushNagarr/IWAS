// Dashboard.js
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // If the user is not authenticated, redirect to the login page
  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome, {session.user.username}!</h1>

      <div className="flex space-x-4">
        {/* Navigation links */}
        <Link href="/create-policy" className="px-4 py-2 bg-blue-500 text-white rounded">
          Create Policy
        </Link>
        <Link href="/manage-policy" className="px-4 py-2 bg-blue-500 text-white rounded">
          Manage Policies
        </Link>
        <Link href="/file-claim" className="px-4 py-2 bg-blue-500 text-white rounded">
          File a Claim
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
