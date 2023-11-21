// api/policies/managePolicy.js
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  try {
    const { userId } = await request.json();
    
    const client = await pool.connect();
    const selectQuery = `
      SELECT * FROM policies
      ORDER BY policies.policy_id ASC;
    `;
    const result = await client.query(selectQuery);
    const policies = result.rows;
    client.release();

    return NextResponse.json(policies);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
