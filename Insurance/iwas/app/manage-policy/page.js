// components/ManagePolicies.js
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const ManagePolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [editedPolicyName, setEditedPolicyName] = useState('');
  const [editedPolicyType, setEditedPolicyType] = useState('');
  const [editedPolicyHolder, setEditedPolicyHolder] = useState('');
  const [editedCoverageDetails, setEditedCoverageDetails] = useState('');
  const [deleteFail, setDeleteFail] = useState(false);
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  let pathname = usePathname();
  pathname = pathname.substring(1, pathname.length);
  useEffect(() => {
    console.log(session);
    if(session){
      setUser(session.user)
    }
  }, [session]);

  useEffect(() => {
    console.log("Fetching on change of state");
    fetchPolicies();
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setDeleteFail(false);
    }, 5000);
  }, [deleteFail]);


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

  const handleEditClick = (policy) => {
    setSelectedPolicy(policy);
    setEditedPolicyName(policy.policy_name);
    setEditedPolicyType(policy.policy_type || '');
    setEditedPolicyHolder(policy.policy_holder_name || '');
    setEditedCoverageDetails(policy.coverage_details || '');
  };

  const handleUpdate = async () => {
    const response = await fetch(`/api/policies/editPolicy`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        policyId: selectedPolicy.policy_id,
        policyName: editedPolicyName,
        policyType: editedPolicyType,
        policyHolderName: editedPolicyHolder,
        coverageDetails: editedCoverageDetails,
      }),
    });

    if (response.ok) {
      console.log('Policy updated successfully');
      fetchPolicies();
    } else {
      console.error('Failed to update policy');
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/policies/deletePolicy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        policyId: selectedPolicy.policy_id,
      }),
    });

    if (response.ok) {
      console.log('Policy updated successfully');
      fetchPolicies();
    } else {
      console.error('Failed to update policy');
      setDeleteFail(true);
    }
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-3 gap-4">
      {policies.map((policy) => (
        <div key={policy.policy_id} className="bg-white text-black p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">{policy.policy_name}</h3>
          <p><strong>Type:</strong> {policy.policy_type || 'N/A'}</p>
          <p><strong>Holder:</strong> {policy.policy_holder_name || 'N/A'}</p>
          <p><strong>Coverage:</strong> {policy.coverage_details || 'N/A'}</p>
          <div className="mt-2 space-x-2">
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={() => handleEditClick(policy)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      {selectedPolicy && (
        <div className="col-span-3 mt-4">
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
          <label className="block mb-2">
            Policy Type:
            <input
              className="border border-gray-300 text-black rounded py-1 px-2 w-full"
              type="text"
              value={editedPolicyType}
              onChange={(e) => setEditedPolicyType(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Policy Holder Name:
            <input
              className="border border-gray-300 text-black rounded py-1 px-2 w-full"
              type="text"
              value={editedPolicyHolder}
              onChange={(e) => setEditedPolicyHolder(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Coverage Details:
            <textarea
              className="border border-gray-300 text-black rounded py-1 px-2 w-full"
              value={editedCoverageDetails}
              onChange={(e) => setEditedCoverageDetails(e.target.value)}
            ></textarea>
          </label>
          <button
            className="bg-green-500 hover:bg-green-700 mx-10 text-white font-bold py-1 px-2 rounded"
            onClick={handleUpdate}
          >
            Update Policy
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 mx-10 text-white font-bold py-1 px-2 rounded"
            onClick={handleDelete}
          >
            Delete Policy
          </button>
          {deleteFail && <p className="text-lg text-red-500 mt-2">
            Failed to delete : Claims are associated with this policy
          </p>}
        </div>
      )}
    </div>
  );
};

export default ManagePolicies;
