// components/CreatePolicy.js
'use client'
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

const CreatePolicy = () => {
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(session);
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  const [policyName, setPolicyName] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [policyHolderName, setPolicyHolderName] = useState('');
  const [coverageDetails, setCoverageDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/policies/createPolicy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        policyName,
        policyType,
        policyHolderName,
        coverageDetails,
      }),
    });

    if (response.ok) {
      console.log('Policy created successfully');
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else {
      console.error('Failed to create policy');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Create Policy</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Policy Name:</label>
          <input
            type="text"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            className="mt-1 p-2 text-black border rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Policy Type:</label>
          <input
            type="text"
            value={policyType}
            onChange={(e) => setPolicyType(e.target.value)}
            className="mt-1 p-2 text-black border rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Policy Holder Name:</label>
          <input
            type="text"
            value={policyHolderName}
            onChange={(e) => setPolicyHolderName(e.target.value)}
            className="mt-1 p-2 text-black border rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Coverage Details:</label>
          <textarea
            value={coverageDetails}
            onChange={(e) => setCoverageDetails(e.target.value)}
            className="mt-1 p-2 text-black border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Policy
        </button>
        {success && (
          <p className="text-green-500">Policy created successfully</p>
        )}
      </form>
    </div>
  );
};

export default CreatePolicy;
