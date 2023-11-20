// components/SubmitClaim.js
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const SubmitClaim = () => {
  const [datetime, setDatetime] = useState('');
  const [causeOfLoss, setCauseOfLoss] = useState('');
  const [estimatedDamageAmount, setEstimatedDamageAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const { data: session } = useSession();
  const stateArray = ['Pending', 'Approved', 'Rejected'];

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  useEffect(() => {
    console.log("Fetching on change of state of USER", user);
    fetchPolicies();
  }, [user]);

  const fetchPolicies = async () => {
    try {
      console.log("in api call ", user.id);
      const response = await fetch('/api/policies/managePolicy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPolicies(data);
      } else {
        console.error('Failed to fetch policies');
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add logic to submit claim data to the server
    try {
      setSubmitting(true);

      const response = await fetch('/api/submitClaim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          policyId: selectedPolicy,
          datetime,
          causeOfLoss,
          estimatedDamageAmount,
          status: selectedState,
        }),
      });

      if (response.ok) {
        console.log('Claim submitted successfully');
        // Optionally, you can redirect to a success page or display a success message
      } else {
        console.error('Failed to submit claim');
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Submit Claim</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <label className="block">
          Select Policy:
          <select
            value={selectedPolicy}
            onChange={(e) => setSelectedPolicy(e.target.value)}
            className="mt-1 p-2 text-black border rounded-md w-full"
          >
            <option value="" disabled>
              Select a Policy
            </option>
            {policies.map((policy) => (
              <option key={policy.policy_id} value={policy.policy_id}>
                {policy.policy_name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          Date and Time of Incident:
          <input
            type="date"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="mt-1 p-2 text-black border rounded-md w-full"
          />
        </label>
        <label className="block">
          Cause of Loss:
          <input
            type="text"
            value={causeOfLoss}
            onChange={(e) => setCauseOfLoss(e.target.value)}
            className="mt-1 p-2 text-black border rounded-md w-full"
          />
        </label>
        <label className="block">
          Estimated Damage Amount:
          <input
            type="number"
            value={estimatedDamageAmount}
            onChange={(e) => setEstimatedDamageAmount(e.target.value)}
            className="mt-1 p-2 text-black border rounded-md w-full"
          />
        </label>
        <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="mt-1 p-2 text-black border required rounded-md w-full"
          >
            <option value="" disabled>
              Set status
            </option>
            {stateArray.map((i, state) => (
              <option key={state} value={i}>
                {i}
              </option>
            ))}
          </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Claim'}
        </button>
      </form>
    </div>
  );
};

export default SubmitClaim;
