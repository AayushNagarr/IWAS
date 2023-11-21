// components/viewClaim.js
"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const viewClaim = () => {
  const [claims, setClaims] = useState([]);
  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  useEffect(() => {
    fetchClaims();
  }, [user]);
  const fetchClaims = async () => {
      try {
        
          const fetchRoute = user.isAdmin ? '/api/claims/viewClaimAdmin' : '/api/claims/viewClaim';
      const response = await fetch(fetchRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          isAdmin : user.isAdmin,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setClaims(data);
      } else {
        console.error('Failed to fetch claims');
      }
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const handleApprove = (claimId) => {
    // Add logic to approve the claim
    console.log(`Approving claim ${claimId}`);
  };

  const handleReject = (claimId) => {
    // Add logic to reject the claim
    console.log(`Rejecting claim ${claimId}`);
  };

  return (
    <div className="container mx-auto p-4">
      {user && user.isAdmin && <h1 className="text-3xl font-bold mb-4">Approve / Reject Claims Of Your Policy</h1>}
      {user && !user.isAdmin && <h1 className="text-3xl font-bold mb-4">View Submitted Claims</h1>}
      {claims.length && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {claims.map((claim) => (
            <div key={claim.claim_id} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl text-black font-semibold mb-2">{claim.policy_name}</h2>
              <p className="text-gray-600 mb-4">{claim.cause_of_loss}</p>
              <p className="text-gray-600 mb-4">
                Estimated Damage Amount: ${claim.estimated_damage_amount}
              </p>
              <div className="flex justify-between">
                {user.isAdmin && <button
                  onClick={() => handleApprove(claim.claim_id)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Approve
                </button>}
                {user.isAdmin && <button
                  onClick={() => handleReject(claim.claim_id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Reject
                </button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {!claims.length && <p>No claims found</p>}
    </div>
  );
};

export default viewClaim;
