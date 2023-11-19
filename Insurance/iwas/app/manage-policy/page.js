// components/ManagePolicies.js
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';


const ManagePolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [editedPolicyName, setEditedPolicyName] = useState('');
  const [fetching, setFetching] = useState(false);
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(session);
    if(session){
      setUser(session.user)
      setFetching(true);
    }
  }, [session]);

  const fetchPolicies = async () => {
    try {
      console.log("in api call ", user.id)
      const response = await fetch('/api/policies/managePolicy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: user.id,
      // Add other policy details here
    }),
  }); // Adjust the API route accordingly

      if (response.ok) {
        const data = await response.json();
        console.log("This is the data result",data);
        setPolicies(data);
      } else {
        console.error('Failed to fetch policies');
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  };

  // Fetch policies when the component loads
  useEffect(() => {
    console.log("FETCHING ON MANAGE");
    fetchPolicies();
  }, [fetching]);


useEffect(() => {
    console.log("Fetching on change of state");
    fetchPolicies();
    }, [policies]);

  const handleEditClick = (policy) => {
    setSelectedPolicy(policy);
    setEditedPolicyName(policy.policy_name);
    // Set other edited policy details as needed
  };

  const handleUpdate = async () => {
    // Add logic to update the policy on the server
    const response = await fetch(`/api/policies/editPolicy`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        policyId: selectedPolicy.policy_id,
        policyName: editedPolicyName,
        // Add other edited policy details here
      }),
    });

    if (response.ok) {
      // Policy updated successfully
      console.log('Policy updated successfully');
      // You may want to refetch policies or update the state accordingly
    } else {
      // Handle error, display error message, etc.
      console.error('Failed to update policy');
    }
  };

  const handleDelete = async () => {
    // Add logic to update the policy on the server
    const response = await fetch(`/api/policies/deletePolicy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        policyId: selectedPolicy.policy_id,
        
        // Add other edited policy details here
      }),
    });

    if (response.ok) {
      // Policy updated successfully
      console.log('Policy deleted successfully');
      // You may want to refetch policies or update the state accordingly
    } else {
      // Handle error, display error message, etc.
      console.error('Failed to delete policy');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Policies</h1>
      <ul className="list-disc pl-4">
        {policies.map((policy) => (
          <li key={policy.policy_id} className="mb-2">
            {policy.policy_name}
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleEditClick(policy)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      {selectedPolicy && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Edit Policy</h2>
          <label className="block mb-2">
            Policy Name:
            <input
              className="border border-gray-300 text-black rounded py-1 px-2 w-full"
              type="text"
              value={editedPolicyName}
              onChange={(e) => setEditedPolicyName(e.target.value)}
            />
          </label>
          {/* Add other form fields for edited policy details */}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleUpdate}
          >
            Update Policy
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleDelete}
          >
            Delete Policy
          </button>
        </div>
      )}
    </div>
  );
};

export default ManagePolicies;
