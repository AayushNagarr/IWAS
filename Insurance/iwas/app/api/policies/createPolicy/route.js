// api/policies/createPolicy.js
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  try {
    const { userId, policyName, policyType, policyHolderName, coverageDetails } = await request.json();
    console.log({ userId, policyName, policyType, policyHolderName, coverageDetails });

    const client = await pool.connect();
    const insertQuery = `
      INSERT INTO policies (user_id, policy_name, policy_type, policy_holder_name, coverage_details)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [userId, policyName, policyType, policyHolderName, coverageDetails];
    const result = await client.query(insertQuery, values);
    const items = result.rows;
    client.release();

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
