// components/SubmitClaim.js
"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';

const SubmitClaim = () => {
  const [datetime, setDatetime] = useState('');
  const [causeOfLoss, setCauseOfLoss] = useState('');
  const [estimatedDamageAmount, setEstimatedDamageAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add logic to submit claim data to the server
    try {
      setSubmitting(true);

      const response = await fetch('/api/claims/submitClaim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          datetime,
          causeOfLoss,
          estimatedDamageAmount,
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
          Date and Time of Incident:
          <input
            type="datetime-local"
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
